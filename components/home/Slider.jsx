import {
  ActivityIndicator,
  FlatList,
  View,
} from "react-native";
import React from "react";
import useSliderData from "../../hooks/useSliderData";
import SliderItem from "./SliderItem";
import { Colors } from "../../constants/Colors";
import { commonStyles } from "../../styles/commonStyles";

const Slider = () => {
  const { slides, loading } = useSliderData();

  return (
    <View style={{paddingTop : 20}}>
      {loading ? (
        <ActivityIndicator size={"large"} color={Colors.button} style={commonStyles.activity}  />
      ) : (
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={slides}
          renderItem={({ item, index }) => {
            return <SliderItem item={item} loading={loading} />;
          }}
        />
      )}
    </View>
  );
};

export default Slider;