import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { commonStyles } from "../../styles/commonStyles";
import { Colors } from "../../constants/Colors";

const PetSubInfo = ({ item }) => {
    const data = {
        label : "Age",
        value : item?.age < 10 && item?.age > 0 ? "0" + item?.age : item?.age,
        image : "https://cdn-icons-png.flaticon.com/128/9473/9473235.png",
        label2 : "Breed",
        value2 : item?.breed,
        image2 : "https://cdn-icons-png.flaticon.com/128/10551/10551080.png"
    }
    const data2 = {
        label : "Sex",
        value : item?.sex,
        image : "https://cdn-icons-png.flaticon.com/128/10109/10109492.png",
        label2 : "Weight",
        value2 : item?.weight < 10 && item?.weight > 0 ? "0" + item?.weight : item?.weight,
        image2 : "https://cdn-icons-png.flaticon.com/128/11656/11656502.png"
    }
  return (
    <View>
      <PetSubInfoCard item={data} />
      <PetSubInfoCard item={data2} />
    </View>
  );
};

export default PetSubInfo;

const PetSubInfoCard = ({ item }) => {
  return (
    <View style={{flexDirection : 'row',alignItems : 'center',justifyContent: 'center',}}>
    <View style={styles.container}>
      <Image style = {styles.icon} source={{uri : item?.image}} />
      <View style={styles.content}>
        <Text style={styles.label}>{item?.label}</Text>
        <Text style={styles.value}>{item?.value}</Text>
      </View>
    </View>
    <View style={styles.container}>
      <Image style = {styles.icon} source={{uri : item?.image2}} />
      <View style={styles.content}>
        <Text style={styles.label}>{item?.label2}</Text>
        <Text style={styles.value}>{item?.value2}</Text>
      </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection :'row',
        padding : 20,
        alignItems : 'center',
        backgroundColor : "lightgrey",
        flex : 1,
        marginHorizontal : 8,
        borderRadius : 10,
        marginTop : 10
    },
    icon :{
        width : 30,
        height : 30,
    },
    content : {
        paddingHorizontal : 6,
    },
    label :{
        fontSize : 16,
        fontFamily: "ralewayBold",

    },
    value : {
        fontSize : 12,
        color : Colors.icon
    }
});
