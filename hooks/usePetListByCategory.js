import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

const usePetListByCategory = (activeCategory) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getBusinessList = async () => {
    try {
      setLoading(true);
      setCategories([]);
      const q = query(collection(db, "Pets"), where("category", "==", activeCategory));
      const snapShot = await getDocs(q);
      const userList = [];
      snapShot.forEach((doc) => {
        // console.log('Document Data:', doc.data());
        userList.push({ id: doc.id, ...doc.data() });
      });
      setCategories(userList);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBusinessList();
  }, [activeCategory]);

  return { categories, loading, error };
};

export default usePetListByCategory;
