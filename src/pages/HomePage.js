import { useUserAuth } from "../store/auth-context";
import { useNavigate } from "react-router";
import classes from "./HomePage.module.css";

export default function HomePage() {
  const navigate = useNavigate();
  let { user, logOut } = useUserAuth();
  const logOutHandler = async () => {
    try {
      await logOut();
      localStorage.removeItem("isLoggedIn", false);
      navigate("/login");
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className={classes.home}>
      <div className={classes.content}>
        <h1>
          Welcome to our captivating blog! Explore insightful articles, engaging
          stories, and enrich your mind with our diverse content. Happy reading!
        </h1>
      </div>
      <div className={classes.userItem}>
        <h2>Welcome : {user && <p>{user.email}</p>}</h2>
      </div>
    </div>
  );
}
