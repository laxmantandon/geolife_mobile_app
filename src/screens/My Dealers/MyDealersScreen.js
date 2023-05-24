import { View, Text, FlatList, Pressable,Alert, BackHandler } from 'react-native'
import React, { useState } from 'react'
import mstyle from '../../mstyle'
import Card from '../../components/Card'
import Icon from 'react-native-vector-icons/Ionicons';
import { useEffect } from 'react';


const MyDealersScreen = ({navigation}) => {
  const [data, setdata] = useState([
    {title:'Orders', value:'0', route:'FarmerOrdersScreen'},
    {title:'Payments', value:'0'},
    {title:'Geo Mitra', value:'0'},
  ])


  const backButtonPressd = () => {
    Alert.alert('Hold on!', 'Are you sure you want to exit?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      { text: 'YES', onPress: () => BackHandler.exitApp() },
    ]);
  }

  useEffect(() => {
    navigation.getState().routes[0].name
    const backAction = () => {
      backButtonPressd()
      return true;

    };


    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();

  }, [])
  


  return (
    <View style={[mstyle.container1]}>

      <FlatList
      numColumns={2}
      style={{flex:1}}
      data={data}
      contentContainerStyle={{flex:1}}
      renderItem={(item)=>{
        return(
          <Pressable style={{ flex: 1, }} onPress={() => { navigation.navigate(item.item.route) }}>
                <View
                  style={mstyle.ListContainer} >
                  <Icon name={item.item.icon} size={22} style={{ paddingTop: 5, paddingLeft: 20, color: item.item.color }} />
                  <View style={mstyle.detailContainer}>
                    <View style={mstyle.titleContainer}>
                      <Text style={mstyle.listListTitle} numberOfLines={1}>
                        {item.item.title}
                      </Text>
                    </View>

                  </View>
                </View>
              </Pressable>
        )

      }}
       />
      
    </View>
  )
}

export default MyDealersScreen