import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

const useCategoryData = () => {
  const [category, setCategory] = useState([]);
  const[loading,setLoading] = useState(false)
  const getBusinessList = async () => {
    setLoading(true)
    setCategory([]);
    const q = query(collection(db, "Category")
  )
    const snapShot = await getDocs(q);
    const userList = [];
    snapShot.forEach((doc) => {
      userList.push({ id: doc.id, ...doc.data() });
    });
    setCategory(userList);
    setLoading(false)
  };

  useEffect(() => {
    getBusinessList();
  }, []);

  return {category,loading};
};

export default useCategoryData;
