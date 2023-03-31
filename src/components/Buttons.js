import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Images } from '../contants'
import LottieView from 'lottie-react-native';
import { Display } from '../utils';

const Buttons = ({title,loading,bgcolor}) => {
    const [isLoading, setisLoading] = useState(false)
  return (
    <View
          style={[styles.Button,{backgroundColor: bgcolor?bgcolor:Colors.DARK_ONE}]}
          activeOpacity={0.8}>
          {loading ? (
            <LottieView source={Images.LOADING} autoPlay />
          ) : (
            <Text style={styles.ButtonText}>{title}  </Text>
          )}
    </View>
  )
}

const styles = StyleSheet.create({
    Button: {
        backgroundColor: Colors.DARK_ONE,
        borderRadius: 5,
        marginHorizontal: 20,
        height: Display.setHeight(6),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
      },
      ButtonText: {
        fontSize: 14,
        lineHeight: 14 * 1.4,
        color: Colors.DEFAULT_WHITE,
        fontFamily: Fonts.POPPINS_MEDIUM,
      },
    
})

export default Buttons