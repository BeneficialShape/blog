import { NavLink } from "react-router-dom";
import classes from "./EventNavigation.module.css";

const EventNavigation = () => {
  return (
    <div className={classes.nav}>
      <div className={classes.links}>
        <ul>
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end>
              Blogs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/events/create"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end>
              Create
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EventNavigation;
