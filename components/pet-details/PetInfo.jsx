import { StyleSheet, Image, View, Text } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import MarkFav from "../MarkFav";
const PetInfo = ({ item }) => {  
  return (
    <View>
      <Image source={{ uri: item?.imageUrl }} style={styles.img} resizeMode="cover" />
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.name}>{item?.name}</Text>
          <Text style={styles.breed}>{item?.address}</Text>
        </View>
        <MarkFav pet = {item}/>
      </View>
    </View>
  );
};

export default PetInfo;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  img: {
    width: "100%",
    height: 400,
    objectFit: "cover",
  },
  infoContainer: {
    marginTop: -20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.iconBackground,
  },
  name: {
    fontSize: 24,
    fontFamily: "ralewayBold",
  },
  breed: {
    fontSize: 16,
    fontFamily: "raleway",
    color: Colors.icon,
  },
});
