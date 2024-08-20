import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { commonStyles } from "../../styles/commonStyles";
import { useUser } from "@clerk/clerk-expo";

export default function Header() {
  const {user} = useUser()  
  return (
    <View style={styles.container}>
      <View>
        <Text style={[commonStyles.desc, styles.heading]}>Welcome</Text>
        <Text style={[commonStyles.heading, styles.name]}>{user?.fullName}</Text>
      </View>
        <Image style={styles.img} source={{uri : user?.imageUrl  }} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection  :'row',
    alignItems : 'center',
    justifyContent : 'space-between',
    paddingTop : 4
  },
  heading: {
    textAlign: "left",
    paddingVertical: 0,
    fontSize : 20
  },
  name: {
    textAlign: "left",
    paddingVertical: 0,
    fontSize: 20,
  },
  img : {
    width : 40,
    height : 40,
    borderRadius : 99
  }
});