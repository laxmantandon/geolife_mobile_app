import { View, Text } from 'react-native'
import React from 'react'
import { Image,Dimensions  } from 'react-native'
import { useEffect } from 'react';
import { BackHandler } from 'react-native';

const ViewImageScreen = ({navigation,route: {
    params: {large_image },
  },}) => {
    const screenWidth = Dimensions.get('window').width;
    const screenheight= Dimensions.get('window').height;
    const imageWidth = screenWidth * 0.8; // Adjust the percentage as per your requirement
  

    console.log('large image',large_image)


    useEffect(() => {
      const backAction = () => {
        navigation.goBack()
        return true;
  
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
  
      return () => backHandler.remove();
    }, [])
    
  return (

<View>
<Image
        source={{uri: large_image}}
        style={{ width: "100%", height: screenheight }}
      />
        {/* <Image resizeMode = 'cover' style={{width:'100%', height:500,
        overflow: 'visible'
        }} source={{ uri: large_image }} /> */}
    </View>
  )
}

export default ViewImageScreen