import { Image, StyleSheet, Text, View ,TouchableOpacity} from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { Link } from "expo-router";

const UserItem = ({ userinfo }) => {
  return (
    <Link href={"/chat?id="+userinfo?.docId} style={styles.container}>
      <View style={styles.content}>
        <Image source={{ uri: userinfo?.imageUrl }} style={styles.img} />
        <Text style={styles.info}>{userinfo?.name}</Text>
      </View>
    </Link>
  );
};

export default UserItem;

const styles = StyleSheet.create({
  container: {
    marginHorizontal : 20,
    borderBottomColor : Colors.icon,
    borderBottomWidth : 0.3,
    paddingVertical : 10
  },
  content : {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 10,
    gap: 7,
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 99,
  },
  info: {
    fontSize: 20,
    fontFamily: "ralewayBold",
  }
});
