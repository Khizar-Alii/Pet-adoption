import { Image, ScrollView, StyleSheet, Text, View,TouchableOpacity } from "react-native";
import React from "react";
import { commonStyles } from "../../../styles/commonStyles";
import Header from "../../../components/home/Header";
import Slider from "../../../components/home/Slider";
import PetListByCategory from "../../../components/home/PetListByCategory";
import { Colors } from "../../../constants/Colors";
import { router } from "expo-router";

const Home = () => {
  return (
    <View
      style={[
        commonStyles.container,
        { paddingTop: 30, paddingHorizontal: 20 },
      ]}
    >
      {/* Header */}
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Slider */}
        <Slider />
        {/* Petlist + Category */}
        <PetListByCategory />
        <TouchableOpacity style={styles.addNewPetContainer} onPress={()=>router.push("/add-new-pet")}>
          <Text style={styles.text}>Add New Pet</Text>
          <Image source={{uri : "https://cdn-icons-png.flaticon.com/128/3729/3729100.png" }} style={styles.img}  />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  addNewPetContainer :{
    marginBottom : 20,
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'center',
    gap : 10,
    borderWidth : 1,
    borderColor : Colors.iconBackground,
    paddingVertical : 5,
    borderRadius  : 12,
    marginTop : 15,
  },
  text: {
    fontSize : 20,
    fontFamily: "ralewayBold",
  },
  img: {
    width : 40,
    height : 40
  },
});
