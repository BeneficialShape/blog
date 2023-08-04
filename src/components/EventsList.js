import { Link } from "react-router-dom";

import classes from "./EventsList.module.css";

function EventsList({ events }) {
  console.log(events);

  return (
    <div className={classes.events}>
      <h1>All Events</h1>
      <ul className={classes.list}>
        {events.map((event) => (
          <li key={event.id} className={classes.item}>
            <Link to={event.id}>
              <img src={event.imageUrl} alt={event.title} />
              <div className={classes.content}>
                <h1>{event.title}</h1>
                <h2>{event.description}</h2>
                <h2>{event.by}</h2>
              </div>
              {/* <div className={classes.content}>
                <h1>{event.by}</h1>
              </div> */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventsList;
