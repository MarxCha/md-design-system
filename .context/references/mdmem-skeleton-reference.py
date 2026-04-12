#!/usr/bin/env python3
"""
mdmem — memory auto-capture and retrieval for md-research.

SKELETON ONLY (2026-04-11 urgentes sprint #3 pre-authorization draft).

Scope: md-research repo only. Enforced by filesystem path check.
Storage: .context/memory/sessions/{YYYY-MM-DD}-{session_id}.jsonl (gitignored).
Integration: optional sync to ~/obsidian-md/research/memory/ for Smart Connections.

Subcommands
-----------
  capture   append a single event from stdin (JSON) to today's jsonl
  query     grep-based search over captured events, ranked by recency + keyword
  compress  generate a semantic summary of a session via `claude -p`
  sync-to-vault  export a session as markdown note to the Obsidian vault

Activation
----------
Hooked into .claude/settings.json of the md-research repo as a PostToolUse
command:

    {
      "hooks": {
        "PostToolUse": [{
          "matcher": "Edit|Write|Bash|Read",
          "hooks": [{
            "type": "command",
            "command": "python3 scripts/mdmem.py capture"
          }]
        }]
      }
    }

Intentionally NOT installed globally. A filesystem path check at the top of
each invocation aborts with a clear error if cwd is not inside md-research.
This is the `feedback_plugin_hooks_must_be_scopable` lesson applied.

Status: SKELETON — stubs only, no production logic yet. Pending CEO sign-off
on the design in analysis/20260411-claude-mem-piloto-fase1.md §5.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import uuid
from datetime import datetime
from pathlib import Path
from typing import Optional

# ---------------------------------------------------------------------------
# Scope enforcement — the single most important design decision.
# ---------------------------------------------------------------------------

_ALLOWED_ROOT_PREFIXES = (
    "/Users/marxchavez/Projects/md-research",
    "/Users/marxchavez/Projects/md-research-",  # catches worktrees
)


def _assert_scoped_to_md_research() -> Path:
    """Return repo root if inside md-research, otherwise abort.

    This is the enforcement boundary that makes mdmem safe for a workstation
    that also hosts products with PII (MediVista, CFDI, VIGÍA, HIDROS). Failing
    closed is intentional — any ambiguity about scope aborts the capture.
    """
    cwd = Path.cwd().resolve()
    cwd_str = str(cwd)
    if not any(cwd_str.startswith(p) for p in _ALLOWED_ROOT_PREFIXES):
        print(
            f"[mdmem] ABORT: cwd {cwd} is outside the md-research scope. "
            f"mdmem is intentionally scoped — see .context/PROJECT.md and "
            f"analysis/20260411-claude-mem-piloto-fase1.md §5.",
            file=sys.stderr,
        )
        sys.exit(2)

    # Walk up to find the .git dir (handles worktree file-pointer too)
    for candidate in [cwd, *cwd.parents]:
        if (candidate / ".git").exists():
            return candidate

    print(f"[mdmem] ABORT: could not locate repo root from {cwd}", file=sys.stderr)
    sys.exit(2)


# ---------------------------------------------------------------------------
# Storage layout
# ---------------------------------------------------------------------------

MEMORY_SUBPATH = Path(".context") / "memory"
SESSIONS_SUBPATH = MEMORY_SUBPATH / "sessions"
SUMMARIES_SUBPATH = MEMORY_SUBPATH / "summaries"
VAULT_EXPORT_SUBPATH = Path.home() / "obsidian-md" / "research" / "memory"


def _session_id() -> str:
    """Derive a session id from env or generate a short one."""
    env_sid = os.environ.get("CLAUDE_SESSION_ID") or os.environ.get("MDMEM_SESSION_ID")
    if env_sid:
        return env_sid[:16]
    return uuid.uuid4().hex[:8]


def _today_session_path(repo_root: Path, session_id: Optional[str] = None) -> Path:
    sid = session_id or _session_id()
    day = datetime.now().strftime("%Y-%m-%d")
    folder = repo_root / SESSIONS_SUBPATH
    folder.mkdir(parents=True, exist_ok=True)
    return folder / f"{day}-{sid}.jsonl"


# ---------------------------------------------------------------------------
# Event schema — the contract for captured events.
# ---------------------------------------------------------------------------

# Each event in the jsonl file has the following shape:
#
# {
#   "ts": "2026-04-11T20:14:55.123456",   # ISO timestamp
#   "session_id": "8f2a1c3b",             # session grouping key
#   "tool": "Edit",                       # Claude Code tool name
#   "input": { ... },                     # tool input, truncated if >2KB
#   "output_excerpt": "...",              # first 500 chars of the tool output
#   "cwd": "/Users/marxchavez/...",       # working directory at call time
#   "files_touched": ["path/to/file"],    # derived, best-effort
#   "private": false,                     # if true, capture is skipped
# }
#
# The <private> tag convention inspired by claude-mem lets the user mark a
# section of a session as sensitive. A PostToolUse hook can read an env var
# or a file flag to skip captures. TODO: implement in capture().

EVENT_SCHEMA_VERSION = "mdmem.event@v0.1"


# ---------------------------------------------------------------------------
# Subcommands — all stubs. Real logic pending CEO sign-off.
# ---------------------------------------------------------------------------


def cmd_capture(args: argparse.Namespace) -> int:
    """Read a tool event from stdin (JSON) and append to today's session jsonl."""
    repo_root = _assert_scoped_to_md_research()

    raw = sys.stdin.read()
    if not raw.strip():
        # PostToolUse hook may pipe empty; no-op silently
        return 0

    try:
        payload = json.loads(raw)
    except json.JSONDecodeError as e:
        print(f"[mdmem] stdin is not valid JSON: {e}", file=sys.stderr)
        return 1

    # Check for <private> marker in the tool input/output
    haystack = json.dumps(payload, default=str).lower()
    if "<private>" in haystack:
        if args.verbose:
            print("[mdmem] skipped — <private> tag present", file=sys.stderr)
        return 0

    event = {
        "ts": datetime.now().isoformat(),
        "session_id": _session_id(),
        "schema": EVENT_SCHEMA_VERSION,
        "tool": payload.get("tool_name") or payload.get("tool") or "unknown",
        "input": payload.get("tool_input") or payload.get("input"),
        "output_excerpt": (payload.get("tool_response") or "")[:500],
        "cwd": str(Path.cwd()),
        "files_touched": payload.get("files_touched", []),
        "private": False,
    }

    path = _today_session_path(repo_root)
    with path.open("a") as f:
        f.write(json.dumps(event, default=str) + "\n")

    if args.verbose:
        print(f"[mdmem] appended event to {path.relative_to(repo_root)}", file=sys.stderr)
    return 0


def cmd_query(args: argparse.Namespace) -> int:
    """Search captured events by keyword. Grep-based for now, ranked by recency."""
    repo_root = _assert_scoped_to_md_research()
    sessions_dir = repo_root / SESSIONS_SUBPATH
    if not sessions_dir.exists():
        print(f"[mdmem] no sessions yet at {sessions_dir}", file=sys.stderr)
        return 0

    keyword = args.keyword.lower()
    hits: list[tuple[str, str, dict]] = []  # (session_file, ts, event)

    for session_file in sorted(sessions_dir.glob("*.jsonl"), reverse=True):
        with session_file.open() as f:
            for line in f:
                if keyword in line.lower():
                    try:
                        event = json.loads(line)
                    except json.JSONDecodeError:
                        continue
                    hits.append((session_file.name, event.get("ts", ""), event))
                    if len(hits) >= args.limit:
                        break
        if len(hits) >= args.limit:
            break

    for session_name, ts, event in hits:
        tool = event.get("tool", "?")
        cwd = event.get("cwd", "")
        input_str = json.dumps(event.get("input"), default=str)[:100]
        print(f"[{ts}] {session_name} {tool:8} cwd={Path(cwd).name:20} {input_str}")

    if args.verbose:
        print(f"[mdmem] {len(hits)} hits for {keyword!r}", file=sys.stderr)
    return 0


def cmd_compress(args: argparse.Namespace) -> int:
    """Generate a semantic summary of a session via `claude -p`.

    TODO: call out to `claude -p "summarize this session for handoff"` with the
    raw jsonl piped in, write result to .context/memory/summaries/{session}.md.
    For now this is a stub that prints the command that would run.
    """
    repo_root = _assert_scoped_to_md_research()
    session_file = repo_root / SESSIONS_SUBPATH / f"{args.session}.jsonl"
    if not session_file.exists():
        print(f"[mdmem] no session file at {session_file}", file=sys.stderr)
        return 1

    summary_file = repo_root / SUMMARIES_SUBPATH / f"{args.session}.md"
    summary_file.parent.mkdir(parents=True, exist_ok=True)

    print(f"[mdmem] STUB: would run `claude -p \"Summarize this md-research session \"` "
          f"with {session_file.relative_to(repo_root)} piped in, "
          f"and write to {summary_file.relative_to(repo_root)}.",
          file=sys.stderr)
    return 0


def cmd_sync_to_vault(args: argparse.Namespace) -> int:
    """Export a session (or today's) as a markdown note to ~/obsidian-md/research/memory/.

    The exported note is indexable by Smart Connections MCP (already installed
    in user-scope ~/.claude.json), giving inter-session semantic search for free.
    TODO: implement real export with frontmatter + wikilinks to analysis/ files
    referenced in the session.
    """
    repo_root = _assert_scoped_to_md_research()
    session_file = _today_session_path(repo_root) if not args.session else (
        repo_root / SESSIONS_SUBPATH / f"{args.session}.jsonl"
    )
    if not session_file.exists():
        print(f"[mdmem] nothing to export at {session_file}", file=sys.stderr)
        return 1

    if not VAULT_EXPORT_SUBPATH.exists():
        print(
            f"[mdmem] vault export dir {VAULT_EXPORT_SUBPATH} does not exist. "
            f"Create it first, or skip sync.",
            file=sys.stderr,
        )
        return 1

    export_path = VAULT_EXPORT_SUBPATH / f"{session_file.stem}.md"
    print(f"[mdmem] STUB: would export {session_file.name} to "
          f"{export_path.relative_to(Path.home())} with YAML frontmatter + "
          f"wikilinks to touched analysis/ files.",
          file=sys.stderr)
    return 0


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="mdmem",
        description="Scoped memory auto-capture and retrieval for md-research.",
    )
    parser.add_argument("-v", "--verbose", action="store_true")
    sub = parser.add_subparsers(dest="cmd", required=True)

    p_capture = sub.add_parser("capture", help="Read a tool event from stdin and append")
    p_capture.set_defaults(func=cmd_capture)

    p_query = sub.add_parser("query", help="Search captured events by keyword")
    p_query.add_argument("keyword")
    p_query.add_argument("--limit", type=int, default=20)
    p_query.set_defaults(func=cmd_query)

    p_compress = sub.add_parser("compress", help="Generate a semantic summary of a session")
    p_compress.add_argument("session", help="session filename without .jsonl, e.g. 2026-04-11-abc12345")
    p_compress.set_defaults(func=cmd_compress)

    p_sync = sub.add_parser("sync-to-vault", help="Export session(s) as markdown to Obsidian vault")
    p_sync.add_argument("--session", default="", help="specific session file stem; default=today")
    p_sync.set_defaults(func=cmd_sync_to_vault)

    return parser


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()
    return args.func(args)


if __name__ == "__main__":
    sys.exit(main())
