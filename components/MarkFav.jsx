import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { Colors } from "../constants/Colors";
import { useUser } from "@clerk/clerk-expo";
import {GetFavList , UpdateFav} from "../hooks/useGetFavList";

const MarkFav = ({pet , color = "black"}) => {
  const { user } = useUser();
  const [favList, setFavList] = useState();
  const[loading,setLoading] = useState(false);
  useEffect(() => {
    user && GetFav();
  }, [user]);
  const GetFav = async () => {
    const results = await GetFavList(user);
    setFavList(results?.favorites ? results?.favorites : []);
  };
  const AddToFav = async () =>{
    setLoading(true)
    const favResult = favList;
    favResult?.push(pet?.id);
    await UpdateFav(user,favResult);
    GetFav()
    setLoading(false)
  }
  const RemoveFav = async () =>{
    setLoading(true)
    const favResult = favList?.filter(item=>item!=pet?.id);
    await UpdateFav(user,favResult);
    GetFav()
    setLoading(false)
  }
  return (
    <View>
      {loading ? (
        <ActivityIndicator size="small" color={Colors.primary} />
      ) : 
      favList?.includes(pet.id) ? (
        <TouchableOpacity onPress={RemoveFav}>
          <Entypo name="heart" size={24} color= "red" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={AddToFav}>
          <Entypo name="heart-outlined" size={24} color={color} />
        </TouchableOpacity>
      )
    }
      
    </View>
  );
};

export default MarkFav;

const styles = StyleSheet.create({});
