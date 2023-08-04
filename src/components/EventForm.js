import React, { useEffect, useState } from "react";
import classes from "./EventForm.module.css";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import { addDoc } from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig";
import { useUserAuth } from "../store/auth-context";

function EventForm() {
  let { user } = useUserAuth();
  const userid = user.uid;
  const [data, setData] = useState({
    title: "",
    imageUrl: "",
    by: "",
    description: "",
  });

  const id = useParams("eventId");
  let idReq = id.eventId;

  useEffect(() => {
    const fetchBlog = async () => {
      if (idReq) {
        try {
          const blogDoc = doc(db, "Articles", idReq);
          const snapshot = await getDoc(blogDoc);
          if (snapshot.exists()) {
            setData({ id: idReq, ...snapshot.data() });
          }
        } catch (error) {
          console.error("Error fetching blog:", error);
        }
      } else {
        setData({
          title: "",
          imageUrl: "",
          by: "",
          description: "",
        });
      }
    };
    fetchBlog();
  }, []);

  const blogCollection = collection(db, "Articles");

  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }

  const titleChangehandler = (e) => {
    setData((prevState) => ({ ...prevState, title: e.target.value }));
  };

  const imageChangehandler = (e) => {
    setData((prevState) => ({ ...prevState, imageUrl: e.target.value }));
  };

  const byChangehandler = (e) => {
    setData((prevState) => ({ ...prevState, by: e.target.value }));
  };

  const descriptionChangehandler = (e) => {
    setData((prevState) => ({ ...prevState, description: e.target.value }));
  };

  const formHandler = () => {
    if (idReq) {
      const updateBlog = async () => {
        const blogDoc = doc(db, "Articles", idReq);
        const updatedNewBlog = { ...data };
        console.log(data);
        await updateDoc(blogDoc, updatedNewBlog);
      };
      updateBlog();
      navigate("/events");
    } else {
      const dataSubmit = async () => {
        try {
          await addDoc(blogCollection, { ...data, userid: userid });
        } catch (err) {
          console.error(err);
        }
      };
      dataSubmit();
      navigate("..");
    }
  };

  return (
    <form className={classes.form} onSubmit={formHandler}>
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          defaultValue={data ? data.title : ""}
          required
          onChange={titleChangehandler}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          defaultValue={data ? data.imageUrl : ""}
          required
          onChange={imageChangehandler}
        />
      </p>
      <p>
        <label htmlFor="by">By</label>
        <input
          id="by"
          type="text"
          name="by"
          required
          onChange={byChangehandler}
          defaultValue={data ? data.by : ""}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={data ? data.description : ""}
          onChange={descriptionChangehandler}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button>{isSubmitting ? "Submitting..." : "Save"}</button>
      </div>
    </form>
  );
}

export default EventForm;
