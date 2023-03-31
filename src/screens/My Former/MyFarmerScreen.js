import { View, Text, FlatList, Pressable, BackHandler } from 'react-native'
import React, { useState } from 'react'
import Card from '../../components/Card'
import mstyle from '../../mstyle'
import { useEffect } from 'react'

const MyFarmerScreen = ({navigation}) => {
    const [data, setdata] = useState([
        {title:'My Farmer List', route:'Myfarmerlist'},
        {title:'Door to Door Visit for App Download ', route:'DoortoDoor'},
        {title:'Sticker pasting', route:'StickerPastingScreen'},
        {title:'WhatsApp to Farmer', route:'WhatsappFarmerScreen'},
        // {title:'Call to Farmer', route:'CallFarmerScreen'},
        {title:'Crop Seminar', route:'CropSeminar'},
        {title:'Pravakta Kisan', route:'PravaktaScreen'},
        {title:'Raise Crop Alert', route:'RaiseCropAlertScreen'},
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
                   navigation.navigate(item.item.route)
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