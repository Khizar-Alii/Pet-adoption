import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { auth } from "../config/firebaseConfig";

const useSliderData = () => {
  const [slides, setSlides] = useState([]);
  const[loading,setLoading] = useState(false)
  const currentUser = auth.currentUser;
  const getBusinessList = async () => {
    setLoading(true)
    setSlides([]);
    const q = query(collection(db, "Sliders")
  )
    const snapShot = await getDocs(q);
    const userList = [];
    snapShot.forEach((doc) => {
      userList.push({ id: doc.id, ...doc.data() });
    });
    setSlides(userList);
    setLoading(false)
  };

  useEffect(() => {
    getBusinessList();
  }, []);

  return {slides,loading};
};

export default useSliderData;
