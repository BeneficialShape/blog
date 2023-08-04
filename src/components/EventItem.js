import { Link, useNavigate } from "react-router-dom";

import classes from "./EventItem.module.css";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig";
import { useUserAuth } from "../store/auth-context";

function EventItem({ event }) {
  const { user } = useUserAuth();
  const navigate = useNavigate();

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      const deleteBlog = async () => {
        const blog = doc(db, "Articles", event.id);
        await deleteDoc(blog);
      };
      deleteBlog();
      navigate("/events");
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.imageUrl} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <p>{event.by}</p>
      {user && user.uid === event.userid && (
        <menu className={classes.actions}>
          <Link to={`edit/${event.id}`}>Edit</Link>
          <button onClick={startDeleteHandler}>Delete</button>
        </menu>
      )}
    </article>
  );
}

export default EventItem;
