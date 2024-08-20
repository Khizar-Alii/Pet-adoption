import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { GetFavList } from "../../../hooks/useGetFavList";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../config/firebaseConfig";
import PetListItem from "../../../components/home/PetListItem";
import { Colors } from "../../../constants/Colors";

const Favourite = () => {
  const [loader, setLoader] = useState(false);
  const { user } = useUser();
  const [favIds, setFavIds] = useState([]);
  const [favPetList, setFavPetList] = useState([]);

  useEffect(() => {
    user && GetFavPetIds();
  }, [user]);

  // ids
  const GetFavPetIds = async () => {
    setLoader(true);
    const result = await GetFavList(user);
    const favorites = result?.favorites || [];
    setFavIds(favorites);
    setLoader(false);
    if (favorites.length > 0) {
      GetFavPetList(favorites);
    } else {
      setFavPetList([]);
    }
  };

  const GetFavPetList = async (_id) => {
    setLoader(true);
    setFavPetList([]);
    if (_id.length > 0) {
      const q = query(collection(db, "Pets"), where("id", "in", _id));
      const querySnapShot = await getDocs(q);
      querySnapShot.forEach((doc) => {
        setFavPetList((prev) => [...prev, doc.data()]);
      });
    }
    setLoader(false);
  };

  return (
    <View style={{ backgroundColor: Colors.light.background, flex: 1 }}>
      <Text style={styles.heading}>Favourites</Text>
      {loader ? (
        <ActivityIndicator size={"large"} style={{ marginTop: '70%' }} color={Colors.button} />
      ) : favPetList.length === 0 ? (
        <Text style={styles.noFavText}>Nothing in the favorite list</Text>
      ) : (
        <FlatList
          style={styles.listStyle}
          data={favPetList}
          onRefresh={GetFavPetIds}
          refreshing={loader}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return <PetListItem item={item} />;
          }}
        />
      )}
    </View>
  );
};

export default Favourite;

const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    paddingTop: 40,
    paddingHorizontal: 20,
    fontFamily: "ralewayBold",
  },
  listStyle: {
    marginHorizontal: 20,
    marginVertical: 0,
    paddingVertical: 0,
  },
  noFavText: {
    marginTop: '70%',
    textAlign: 'center',
    fontSize: 18,
    color: Colors.icon,
  },
});