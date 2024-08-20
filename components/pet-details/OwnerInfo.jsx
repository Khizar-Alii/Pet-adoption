import { Image, StyleSheet, Text, View ,TouchableOpacity} from "react-native";
import React, { useState, useEffect } from "react";
import { Colors } from "../../constants/Colors";

const OwnerInfo = ({ item }) => {

  return (
    <View style={styles.container}>
      <View style={{flexDirection : 'row',alignItems :'center',gap : 15}}>
        <Image source={{ uri: item?.userImage }} style={styles.icon} />
        <View>
          <Text style={styles.name}>{item?.username}</Text>
          <Text style={styles.owner}>owner</Text>
        </View>
      </View>
      <TouchableOpacity >
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/2161/2161491.png",
          }}
          style={styles.share}
        />
      </TouchableOpacity>
    </View>
  );
};

export default OwnerInfo;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    backgroundColor: Colors.iconBackground,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    justifyContent : 'space-between',
    marginVertical : 20
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 99,
    objectFit : 'cover'
  },
  name: {
    fontSize: 14,
    fontFamily: "ralewayBold",
  },
  owner: {
    fontSize: 12,
    fontFamily: "ralewayMedium",
    color: Colors.icon,
  },
  share: {
    width: 30,
    height: 30,
    objectFit : 'cover'
  },
});
