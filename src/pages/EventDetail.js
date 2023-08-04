import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import EventItem from "../components/EventItem";

const EventDetail = () => {
  const id = useParams("eventId");
  const idReq = id.eventId;
  const [blog, setBlog] = useState({});

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogDoc = doc(db, "Articles", idReq);
        const snapshot = await getDoc(blogDoc);
        if (snapshot.exists()) {
          setBlog({ id: idReq, ...snapshot.data() });
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, []);
  return <EventItem event={blog} />;
};

export default EventDetail;
