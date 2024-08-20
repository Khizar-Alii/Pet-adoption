import {
  ActivityIndicator,
  FlatList,
  View,
} from "react-native";
import React, { useState } from "react";
import Category from "./Category";
import usePetListByCategory from "../../hooks/usePetListByCategory";
import { Colors } from "../../constants/Colors";
import PetListItem from "../../components/home/PetListItem"
const PetListByCategory = () => {
  const [activeCategory, setActiveCategory] = useState("Dogs");
  const { categories, loading } = usePetListByCategory(activeCategory);
  const[loader,setLoader] = useState(false)

  return (
    <View >
      <Category
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      {loading ? (
        <ActivityIndicator size={"large"} color={Colors.button} style={{marginTop : 70}} />
      ) : (
        <FlatList
          data={categories}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          refreshing = {loader}
          onRefresh={()=>usePetListByCategory(activeCategory)}
          renderItem={({ item }) => {            
            return <PetListItem item={item} />;
          }}
        />
      )}
    </View>
  );
};

export default PetListByCategory;