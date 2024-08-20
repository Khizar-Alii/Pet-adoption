import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../constants/Colors'
import { commonStyles } from '../../styles/commonStyles'

const AboutPet = ({item}) => {
    const[readMore,setReadMore] = useState(true)
  return (
    <View style= {styles.container}>
      <Text style={styles.name}>About {item?.name}</Text>
      <Text style={styles.about} numberOfLines={readMore ? 2 : 20} >{item?.about}</Text>
      {readMore && <TouchableOpacity style={styles.btnContainer} onPress={()=>setReadMore(!readMore)}>
        <Text style={[commonStyles.btnText,{color :"black",fontSize : 16}]}>Read More</Text>
      </TouchableOpacity>}
    </View>
  )
}

export default AboutPet

const styles = StyleSheet.create({
    container : {
        paddingHorizontal : 15,
        paddingVertical : 10,
    },
    name : {
        fontSize  : 20,
        fontFamily: "ralewayBold",
    },
    about :{
        lineHeight : 20,
        fontFamily: "ralewayMedium",
        color : Colors.icon,
        fontSize : 14,
        paddingVertical : 6
    },
    btnContainer : {
        
    }
})