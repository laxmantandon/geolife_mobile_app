import { View, Text, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../contants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRoute } from '@react-navigation/native'
import { BackHandler } from 'react-native'

const DealerProfileScreen = ({navigation,  route: {
  params: item ,
}}) => {
  const [loggedIn, setloggedIn] = useState(false)
  const [user, setuser] = useState([])
  const [qrcode, setqrcode] = useState()

  const route = useRoute();
  const currentRouteName = route.name;


  if (loggedIn == false) {
    AsyncStorage.getItem("user_info").then((value) => {
      setloggedIn(true)
      const usrd = JSON.parse(value)
      // console.log(usrd)
      if (usrd) {
        setuser(usrd)
        setqrcode()
      } else {
        navigation.navigate('Login')
      }
    })
  }

  useEffect(() => {

    
    if(item){
      // console.log(params)
      setqrcode(item?.qrcode)
    }

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
    <ScrollView style={[mstyle.container1]}>
          <View style={{ backgroundColor: 'white', width: '100%', paddingVertical: 10, paddingHorizontal: 8 }}>
          {qrcode?(
              <Image style={{
          backgroundColor: 'silver', height: 380, width: '100%',
          borderTopLeftRadius: 8, borderTopRightRadius: 8}} source={{ uri: `https://crop.erpgeolife.com${qrcode?.replace('/private','')}` }}  />
             ) :('')} 
              <Text style={{ fontSize: 15, paddingVertical: 10, color: 'black' }}> Dealer Name : - 
              <Text style={{ fontWeight: '600' }}> {user.first_name} {user.last_name}</Text> </Text>
              <Text style={{ fontSize: 15, paddingVertical: 10, color: 'black' }}> Dealer Mobile : - <Text style={{ fontWeight: '600' }}> {user.mobile_no} </Text> </Text>
              {/* <Text style={{ fontSize: 15, paddingVertical: 10, color: 'black' }}> End Date : - <Text style={{ fontWeight: '600' }}> {user.dealer_data?.name} {user.last_name}</Text> </Text> */}
              {/* <Text style={{ fontSize: 15, paddingVertical: 10, color: 'black' }}> Crop Farm Size : - <Text style={{ fontWeight: '600' }}> {user.first_name} {user.last_name} </Text> </Text> */}
              {/* <Text style={{ fontSize: 15, paddingVertical: 10, color: 'black' }}> Crop Farm Unit : - <Text style={{ fontWeight: '600' }}> </Text> </Text> */}
          </View>
    </ScrollView>
  )
}

export default DealerProfileScreen