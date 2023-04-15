import { View, Text, FlatList, Pressable, BackHandler } from 'react-native'
import React, { useState } from 'react'
import Card from '../../components/Card'
import mstyle from '../../mstyle'
import { useEffect } from 'react'

const MyFarmerScreen = ({navigation}) => {
  const item={
    item:0
  }
    const [data, setdata] = useState([
        {title:'My Farmer List', route:'Myfarmerlist',icon:'people-outline',icon_color:'black'},
        {title:'Door to Door Visit for App Download ', route:'DoortoDoor',icon:'logo-google-playstore',icon_color:'skyblue'},
        {title:'Sticker Pasting', route:'StickerPastingScreen',icon:'clipboard-outline',icon_color:'black'},
        {title:'WhatsApp to Farmer', route:'WhatsappFarmerScreen',icon:'logo-whatsapp',icon_color:'green'},
        // {title:'Call to Farmer', route:'CallFarmerScreen'},
        {title:'Crop Seminar', route:'CropSeminar',icon:'layers-outline',icon_color:'black'},
        {title:'Pravakta Kisan', route:'PravaktaScreen',icon:'person-outline',icon_color:'green'},
        {title:'Free Sample Distribution List', route:'FreeSampleBeneficiaries',  value:item, icon:'list-outline',icon_color:'black'},
        {title:'Advance Booking Product kit', route:'FarmerOrdersScreen',  value:item ,icon:'cart-outline',icon_color:'navy'},
        {title:'Raise Crop Alert', route:'RaiseCropAlertScreen' ,icon:'alert-circle-outline',icon_color:'red'},
      ])

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
        <View style={mstyle.container1}>
           <FlatList
          data={data}
          renderItem={(item) =>{
            return (
              <Pressable
                 onPress={() => {
                   navigation.navigate(item.item.route, {item:''})
                 }} 
                 >
              <Card item={item} />
    
              </Pressable>
              )
          }} />
        </View>
      )
    }
    

export default MyFarmerScreen