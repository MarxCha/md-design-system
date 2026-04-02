import { activityItems } from "./constants";

export default function ActivityFeed() {
  return (
    <section className="dp-activity" aria-labelledby="dp-activity-heading">
      <div className="dp-activity__header">
        <h2 id="dp-activity-heading" className="dp-activity__title">
          Recent Activity
        </h2>
        <a href="#" className="dp-activity__view-all">
          View all
        </a>
      </div>

      <ul className="dp-activity__list" role="list">
        {activityItems.map((item, idx) => (
          <li key={item.id} className="dp-activity__item">
            {/* Timeline connector */}
            <div className="dp-activity__timeline" aria-hidden="true">
              <div className="dp-activity__avatar">
                {item.actorInitials}
              </div>
              {idx < activityItems.length - 1 && (
                <div className="dp-activity__connector" />
              )}
            </div>

            {/* Content */}
            <div className="dp-activity__content">
              <p className="dp-activity__text">
                <span className="dp-activity__actor">{item.actor}</span>
                {" "}
                <span className="dp-activity__action">{item.action}</span>
                {" "}
                <span className="dp-activity__target">{item.target}</span>
              </p>
              <time
                className="dp-activity__time"
                dateTime={item.time}
                aria-label={`${item.time}`}
              >
                {item.time}
              </time>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
