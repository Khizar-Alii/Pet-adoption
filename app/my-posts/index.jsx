import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";
import { useUser } from "@clerk/clerk-expo";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { commonStyles } from "../../styles/commonStyles";
import MarkFav from "../../components/MarkFav";
import PetListItem from "../../components/home/PetListItem";
const MyPosts = () => {
  const navigation = useNavigation();
  const { user } = useUser();
  const [userPostList, setUserPostList] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "My Posts",
    });
    user && GetUserPosts();
  }, [user]);
  const GetUserPosts = async () => {
    setLoader(true);
    setUserPostList([]);
    const q = query(
      collection(db, "Pets"),
      where("email", "==", user.primaryEmailAddress.emailAddress)
    );
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      // console.log("data is : " ,doc.data());
      setUserPostList((prev) => [...prev, doc.data()]);
    });
    setLoader(false);
  };
  return (
    <View style={{ backgroundColor: Colors.light.background, flex: 1 }}>
      {loader ? (
        <ActivityIndicator
          size={"large"}
          style={{ marginTop: "70%" }}
          color={Colors.button}
        />
      ) : userPostList.length === 0 ? (
        <Text style={styles.noFavText}>No Pet's are added Yet</Text>
      ) : (
        <FlatList
          style={styles.listStyle}
          data={userPostList}
          onRefresh={GetUserPosts}
          refreshing={loader}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  paddingHorizontal: 10,
                }}
              >
                <PetListItem item={item} delete = {true}/>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default MyPosts;



const styles = StyleSheet.create({
  noFavText : {
    marginTop: '70%',
    textAlign: 'center',
    fontSize: 18,
    color: Colors.icon,
  }
});
