import {  Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const SliderItem = ({ item }) => {
  return (
    <View style={styles.sliderContainer}>
      <Image style={styles.img} source={{ uri: item?.imageUrl }} />
    </View>
  );
};

export default SliderItem;

const styles = StyleSheet.create({
  sliderContainer: {
    paddingTop: 15,
    width: 300,
    marginRight: 15,
  },
  img: {
    width: "100%",
    height: 200,
    borderRadius: 20,
  },
});
