import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { commonStyles } from '@/styles/commonStyles'

export default function Button(props) {
    const {handlePress, title} = props
  return (
    <TouchableOpacity onPress={handlePress} style={commonStyles.btnContainer}>
        <Text style={commonStyles.btnText}>{title}</Text>
    </TouchableOpacity>
  )
}