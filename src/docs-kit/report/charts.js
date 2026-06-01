/* MD docs-kit · charts.js — genera SVG de barras/línea/apiladas DESDE DATOS.
 *
 * Por qué: los ejemplos dibujaban coords y hex a mano; al re-skinear una instancia
 * había que reeditar cada número. Aquí la geometría se calcula y los colores salen
 * de los tokens CSS (--brand-*), así el re-skin por marca es 100% automático.
 *
 * Uso (HTML estático, se ejecuta antes del print de Chrome headless):
 *   <figure data-chart='{"type":"bar","values":[31,24,18,12,9,6],
 *                         "labels":["A","B","C","D","E","F"],"ramp":true}'></figure>
 *   <figure data-chart='{"type":"line","series":[{"points":[45,12,24],"label":"Ranking","invert":true}],
 *                         "labels":["2019","2021","2022"]}'></figure>
 *   <figure data-chart='{"type":"stacked","groups":[[35,18,12],[45,18,14]],
 *                         "seriesLabels":["Composición","Auditoría","Sanación"],
 *                         "labels":["T1","T2"]}'></figure>
 *   <script src="../../charts.js"></script>
 *
 * Colores: paleta = [--brand-accent, --brand-gold, --brand-primary, --brand-accent-lime].
 * Para barras de una sola serie con ramp:true, degrada el acento con color-mix (claro→oscuro).
 */
(function () {
  "use strict";
  var NS = "http://www.w3.org/2000/svg";
  // tokens de marca; se resuelven contra el CSS cargado (re-skineable)
  var PALETTE = ["--brand-accent", "--brand-gold", "--brand-primary", "--brand-accent-lime"];

  function el(name, attrs) {
    var e = document.createElementNS(NS, name);
    for (var k in attrs) if (attrs[k] != null) e.setAttribute(k, attrs[k]);
    return e;
  }
  function cssvar(v) { return "var(" + v + ")"; }
  // degradado de una sola serie: claro (pos 0) → oscuro (última), vía color-mix sobre el acento
  function rampColor(i, n) {
    if (n <= 1) return cssvar("--brand-accent");
    var pct = Math.round(28 + (72 * i) / (n - 1)); // 28%..100% de acento sobre blanco
    return pct >= 100 ? cssvar("--brand-accent-dk")
                      : "color-mix(in srgb, var(--brand-accent) " + pct + "%, #fff)";
  }
  function seriesColor(i) { return cssvar(PALETTE[i % PALETTE.length]); }

  function svg(vb) {
    var s = el("svg", { viewBox: "0 0 " + vb[0] + " " + vb[1], xmlns: NS });
    s.setAttribute("class", "chart");
    return s;
  }
  function axis(s, x1, y, x2) {
    s.appendChild(el("line", { x1: x1, y1: y, x2: x2, y2: y, stroke: "#e6e9ee" }));
  }
  function label(s, x, y, txt) {
    var t = el("text", { x: x, y: y, "text-anchor": "middle", "font-size": 8, fill: "#7a8590" });
    t.setAttribute("class", "svg-label");
    t.textContent = txt;
    s.appendChild(t);
  }
  function value(s, x, y, txt, color) {
    var t = el("text", { x: x, y: y, "text-anchor": "middle", "font-size": 10, fill: color || "#191919" });
    t.setAttribute("font-family", "Instrument Sans, sans-serif");
    t.setAttribute("font-weight", "700");
    t.textContent = txt;
    s.appendChild(t);
  }

  // ---- BAR (barras verticales rankeadas, una serie) ----
  function bar(cfg) {
    var W = 360, H = 175, padB = 30, padT = 20, n = cfg.values.length;
    var max = Math.max.apply(null, cfg.values) || 1;
    var s = svg([W, H]);
    axis(s, 22, H - padB, W - 10);
    var slot = (W - 32) / n, bw = slot * 0.6;
    cfg.values.forEach(function (v, i) {
      var h = (v / max) * (H - padB - padT);
      var x = 22 + i * slot + (slot - bw) / 2, y = (H - padB) - h;
      var fill = cfg.ramp ? rampColor(n - 1 - i, n) : seriesColor(0); // ramp: el mayor más oscuro
      s.appendChild(el("rect", { x: x, y: y, width: bw, height: h, rx: 2, fill: fill }));
      value(s, x + bw / 2, y - 5, v);
      if (cfg.labels) label(s, x + bw / 2, H - padB + 15, cfg.labels[i]);
    });
    return s;
  }

  // ---- LINE (una o varias series; invert para "menor es mejor", ej. rankings) ----
  function line(cfg) {
    var W = 360, H = 150, padB = 26, padT = 20, padL = 40, padR = 20;
    var s = svg([W, H]);
    axis(s, padL, H - padB, W - padR);
    var allPts = cfg.series.reduce(function (a, se) { return a.concat(se.points); }, []);
    var max = Math.max.apply(null, allPts), min = Math.min.apply(null, allPts);
    var span = (max - min) || 1, n = cfg.labels.length;
    var stepX = (W - padL - padR) / (n - 1 || 1);
    function yOf(v, invert) {
      var t = (v - min) / span;            // 0..1
      if (invert) t = 1 - t;               // menor valor → arriba
      return padT + (1 - t) * (H - padB - padT);
    }
    cfg.series.forEach(function (se, si) {
      var col = se.color ? cssvar(se.color) : seriesColor(si);
      var pts = se.points.map(function (v, i) { return (padL + i * stepX) + "," + yOf(v, se.invert); });
      s.appendChild(el("polyline", { points: pts.join(" "), fill: "none", stroke: col, "stroke-width": 2.5 }));
      se.points.forEach(function (v, i) {
        var x = padL + i * stepX, y = yOf(v, se.invert);
        s.appendChild(el("circle", { cx: x, cy: y, r: 4, fill: col }));
        if (se.showValues !== false) value(s, x, y - 9, (se.prefix || "") + v, "#1e3a5f");
      });
    });
    cfg.labels.forEach(function (lb, i) { label(s, padL + i * stepX, H - padB + 16, lb); });
    return s;
  }

  // ---- STACKED (barras apiladas multi-serie) ----
  function stacked(cfg) {
    var W = 360, H = 175, padB = 30, padT = 16, n = cfg.groups.length;
    var totals = cfg.groups.map(function (g) { return g.reduce(function (a, b) { return a + b; }, 0); });
    var max = Math.max.apply(null, totals) || 1;
    var s = svg([W, H]);
    axis(s, 22, H - padB, W - 10);
    var slot = (W - 32) / n, bw = slot * 0.6;
    cfg.groups.forEach(function (g, i) {
      var x = 22 + i * slot + (slot - bw) / 2, yTop = H - padB;
      g.forEach(function (v, si) {
        var h = (v / max) * (H - padB - padT);
        yTop -= h;
        s.appendChild(el("rect", { x: x, y: yTop, width: bw, height: h, fill: seriesColor(si) }));
      });
      if (cfg.labels) label(s, x + bw / 2, H - padB + 15, cfg.labels[i]);
    });
    return s;
  }

  var BUILDERS = { bar: bar, line: line, stacked: stacked };

  function render(root) {
    var nodes = (root || document).querySelectorAll("[data-chart]");
    nodes.forEach(function (node) {
      if (node.dataset.chartDone) return;
      var cfg;
      try { cfg = JSON.parse(node.getAttribute("data-chart")); }
      catch (e) { node.textContent = "⚠ data-chart inválido"; return; }
      var build = BUILDERS[cfg.type];
      if (!build) { node.textContent = "⚠ tipo no soportado: " + cfg.type; return; }
      node.appendChild(build(cfg));
      node.dataset.chartDone = "1";
    });
  }

  window.MDCharts = { render: render };
  if (document.readyState !== "loading") render();
  else document.addEventListener("DOMContentLoaded", function () { render(); });
})();
