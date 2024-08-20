import { Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import { commonStyles } from "../../styles/commonStyles";
import { Colors } from "../../constants/Colors";
export const CategoryItem = ({ item, activeCategory, setActiveCategory }) => {
  const { name, imageUrl } = item;
  return (
    <TouchableOpacity
      style={[
        styles.categoryContainer,
        activeCategory === name ? { backgroundColor: "lightgrey" } : null,
      ]}
      onPress={() => setActiveCategory(name)}
    >
      <Image source={{ uri: imageUrl }} style={styles.categoryImg} />
      <Text style={[commonStyles.desc,styles.name]}>{name}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  categoryContainer: {
    marginRight: 15,
    backgroundColor: Colors.iconBackground,
    borderRadius: 99,
    width: 70,
    height: 70,
    alignItems: "center",
  },
  categoryImg: {
    width: "50%",
    height: "50%",
    marginTop: 10,
  },
  name : {
    fontSize : 12,
    paddingVertical : 0,
    paddingTop : 2
  }
});
