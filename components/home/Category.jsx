import { FlatList, View, ActivityIndicator, Text } from "react-native";
import React from "react";
import useCategoryData from "../../hooks/useCategoryData";
import { commonStyles } from "../../styles/commonStyles";
import { CategoryItem } from "./CategoryItem";

const Category = ({ activeCategory, setActiveCategory }) => {
  const { category } = useCategoryData();
  return (
    <View>
      <Text
        style={[
          commonStyles.heading,
          { textAlign: "left", paddingVertical: 20 },
        ]}
      >
        Category
      </Text>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={category}
        renderItem={({ item }) => {
          return (
            <CategoryItem
              item={item}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          );
        }}
      />
    </View>
  );
};
export default Category;
