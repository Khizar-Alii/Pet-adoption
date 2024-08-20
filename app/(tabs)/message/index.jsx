import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { commonStyles } from "../../../styles/commonStyles";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../config/firebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import { Colors } from "../../../constants/Colors";
import UserItem from "../../../components/Inbox/UserItem";

const Message = () => {
  const { user } = useUser();
  const [userList, setUserList] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    user && GetUserList();
  }, [user]);
  // fetch data of users
  const GetUserList = async () => {
    setLoader(true);
    setUserList([]);
    const q = query(
      collection(db, "Chat"),
      where("userIds", "array-contains", user.primaryEmailAddress.emailAddress)
    );
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      // console.log(doc.data());
      setUserList((prev) => [...prev, doc.data()]);
    });
    setLoader(false);
  };
  const MapOtherUser = () => {
    const list = [];
    userList?.forEach((record) => {
      const otherUser = record?.users?.filter(
        (item) => item.email != user?.primaryEmailAddress?.emailAddress
      );
      const result = {
        docId: record.id,
        ...otherUser[0],
      };
      list.push(result);
    });
    return list;
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Inbox</Text>
      <FlatList
        data={MapOtherUser()}
        renderItem={({ item, index }) => (
           <UserItem userinfo={item} key={index} />
        )}
        refreshing={loader}
        onRefresh={GetUserList}
      />
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    flex: 1,
    padding: 20,
    marginTop: 20,
  },
  text: {
    fontSize: 25,
    paddingHorizontal: 20,
    fontFamily: "ralewayBold",
    marginBottom : 10
  },
});
