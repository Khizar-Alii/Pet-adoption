import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

export const GetFavList = async (user) => {
  const email = user?.primaryEmailAddress?.emailAddress;
  const docRef = doc(db, "UserFavPet", email);
  const docSnap = await getDoc(docRef);
  if (docSnap?.exists()) {
    return docSnap?.data();
  } else {
    const docRef = doc(db, "UserFavPet", email);
    await setDoc(docRef, {
      email: email,
      favorites: [],
    });
  }
};
export const UpdateFav = async (user, favorites) => {
    const email = user?.primaryEmailAddress?.emailAddress;
    const docRef = doc(db, "UserFavPet", email);
  try {
    await updateDoc(docRef, {
      favorites: favorites,
    });
  } catch (error) {
    console.log(error.message);
  }
};
