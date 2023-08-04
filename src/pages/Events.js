// import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { getDocs, collection } from "firebase/firestore";
import { useState, useEffect, useMemo } from "react";
import { db } from "../firebase/FirebaseConfig";
import EventsList from "../components/EventsList";

function Events() {
  const [data, setData] = useState([]);

  const blogCollection = useMemo(() => collection(db, "Articles"), []);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const blogs = await getDocs(blogCollection);
        const filteredBlog = blogs.docs.map((docs) => ({
          id: docs.id,
          ...docs.data(),
        }));
        setData([...filteredBlog]);
      } catch (err) {
        console.error(err);
      }
    };

    getBlogs();

    return;
  }, [blogCollection]);

  return <EventsList events={data} />;
}

export default Events;
