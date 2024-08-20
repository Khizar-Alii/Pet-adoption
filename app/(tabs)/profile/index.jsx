import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Colors } from "../../../constants/Colors";
import { router } from "expo-router";

const Profile = () => {
  const { signOut } = useAuth();
  const { user } = useUser();
  const Menu = [
    {
      id: 1,
      name: "Add New Pet",
      icon: "https://cdn-icons-png.flaticon.com/128/3729/3729100.png",
      path: "/add-new-pet",
    },
    {
      id: 2,
      name: "Favourites",
      icon: "https://cdn-icons-png.flaticon.com/128/8294/8294893.png",
      path: "/(tabs)/favourite",
    },
    {
      id: 3,
      name: "My Posts",
      icon: "https://cdn-icons-png.flaticon.com/128/17114/17114587.png",
      path: "/my-posts",
    },
    {
      id: 4,
      name: "Inbox",
      icon: "https://cdn-icons-png.flaticon.com/128/9776/9776862.png",
      path: "/(tabs)/message",
    },
    {
      id: 5,
      name: "Logout",
      icon: "https://cdn-icons-png.flaticon.com/128/6568/6568636.png",
      path: "logout",
    },
  ];

  const handleMenuPress = (item) =>{
    if(item.path == "logout" ){
      signOut();
      return;
    }
    router.push(item.path)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.Text}>Profile</Text>
      <View style={styles.userInfo}>
        <Image source={{ uri: user?.imageUrl }} style={styles.img} />
        <Text style={styles.name}>{user?.fullName}</Text>
        <Text style={styles.email}>
          {user?.primaryEmailAddress?.emailAddress}
        </Text>
      </View>
      <FlatList
        data={Menu}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity key={item.id} style={styles.content} onPress={()=>handleMenuPress(item)}>
              <View style={styles.contentContainer}>
                <Image
                  source={{ uri: item.icon }}
                  style={{ width: 40, height: 40, borderRadius: 99 }}
                />
              </View>
              <Text style={styles.name}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
      <Text style={styles.developer}>Develop by Khizar ALi</Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 20,
    backgroundColor: Colors.light.background,
    flex: 1,
  },
  Text: {
    fontSize: 25,
    fontFamily: "ralewayBold",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    paddingVertical: 10,
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 99,
  },
  name: {
    fontSize: 18,
    fontFamily: "ralewayMedium",
    paddingVertical: 7,
  },
  email: {
    fontSize: 14,
    fontFamily: "ralewayMedium",
    color: Colors.icon,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: Colors.iconBackground,
    padding: 10,
    marginVertical: 15,
    borderRadius: 12,
  },
  contentContainer: {
    backgroundColor: "lightgrey",
    padding: 4,
    borderRadius: 10,
  },
  developer: {
    fontSize: 16,
    textAlign: "center",
    color: "lightgrey",
  },
});