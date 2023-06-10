import { View, Text, FlatList, Pressable, BackHandler } from 'react-native'
import React, { useState } from 'react'
import Card from '../../components/Card'
import mstyle from '../../mstyle'
import { useEffect } from 'react'

const CropProjectScreen = ({navigation}) => {
  const item={
    item:0
  }
    const [data, setdata] = useState([
        {title:'Crop Seminar', route:'CropSeminar',icon:'layers-outline',icon_color:'black'},
        {title:'Sticker Pasting', route:'StickerPastingScreen',icon:'clipboard-outline',icon_color:'black'},
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
    

export default CropProjectScreen