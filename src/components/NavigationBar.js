import { Link, NavLink, useNavigate } from "react-router-dom";
import classes from "./NavigationBar.module.css";
import { useUserAuth } from "../store/auth-context";

const NavigationBar = () => {
  const navigate = useNavigate();
  let { user, logOut } = useUserAuth();
  const logOutHandler = async (e) => {
    e.preventDefault();
    try {
      await logOut();
      localStorage.removeItem("isLoggedIn", false);
      navigate("/login");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={classes.nav}>
      <div className={classes.logo}>
        <NavLink to="/" end>
          B
        </NavLink>
      </div>
      <div className={classes.links}>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }>
              Events
            </NavLink>
          </li>
          <li>
            {user && localStorage.getItem("isLoggedIn") ? (
              <Link onClick={logOutHandler}>LogOut</Link>
            ) : (
              <NavLink
                to="LogIn"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                end>
                Log In
              </NavLink>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavigationBar;

/*

<NavLink
  to="LogIn"
  className={({ isActive }) =>
    isActive ? classes.active : undefined
  }
  end>
  Log In
</NavLink>

*/
