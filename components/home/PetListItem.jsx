import { Image, StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { commonStyles } from "../../styles/commonStyles";
import MarkFav from "../MarkFav";
import { useRouter } from "expo-router";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

const PetListItem = ({ item , delete : deleteProp = false }) => {
  const router = useRouter();
  const handleDelete = () =>{
    Alert.alert("Confirmation","Do you really want to delete this item?",[
      {
        text : "Cancel",
        onPress: ()=>console.log("Cancel"),
        style : "cancel"
      },
      {
        text : "Delete",
        onPress: deletePost,
        style : "destructive"
      },
    ])
  }
  const deletePost = async () =>{
    await deleteDoc(doc(db , "Pets",item?.id))    
    
  }
  return (
    <TouchableOpacity
      style={styles.sliderContainer}

      onPress={() =>
        router.push({
          pathname: "/pet-details",
          params: { item: JSON.stringify(item?.id) },
          
        })
      }
    >
      {
        deleteProp ? <TouchableOpacity style={styles.favIcon} onPress={handleDelete}>
          <Image source={{uri : 'https://cdn-icons-png.flaticon.com/128/2603/2603105.png'}} style={{width : 25,height:25}} />
        </TouchableOpacity> : 
      
      <View style={styles.favIcon}>
        <MarkFav pet={item} color="grey" />
      </View>
      }
      <View style={styles.ImgContainer}>
        <Image style={styles.img} source={{ uri: item?.imageUrl }} />
      </View>
      <Text style={[commonStyles.heading, styles.name]}>{item?.name}</Text>
      <View style={styles.info}>
        <Text style={[commonStyles.desc, styles.breed]}>{item?.breed}</Text>
        <Text style={[commonStyles.desc, styles.age]}>{item?.age} yrs</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PetListItem;

const styles = StyleSheet.create({
  sliderContainer: {
    backgroundColor: Colors.iconBackground,
    borderRadius: 20,
    padding: 20,
    margin : 'auto',
    marginTop : 10,
    marginLeft: 10
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 99,
    objectFit : 'contain'
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap : 20
  },
  name: {
    textAlign: "center",
    fontSize : 20
  },
  breed: {
    textAlign: "left",
    paddingVertical: 0,
  },
  age: {
    textAlign: "left",
    backgroundColor: "lightgrey",
    paddingHorizontal: 10,
    color: "black",
    borderRadius: 15,
    paddingTop: 4,
    fontSize: 8,
  },
  favIcon : {
    position: "absolute",
    right : 5,
    top : 10,
    zIndex : 2
  }
});
