import { View, Text, Image, FlatList, Linking, Pressable } from 'react-native'
import React, { useState } from 'react'
import mstyle from '../../mstyle'
import Icon from 'react-native-vector-icons/Ionicons';
import { useEffect } from 'react';
import { AuthenicationService } from '../../services'
import moment from 'moment';
import Card from '../../components/Card';
import { Colors } from '../../contants';

const FarmerDetails = ({ navigation, route: {
  params: { item },
} }) => {


  const [data, setdata] = useState([])
  const [loading, setloading] = useState(true)
  const [farmerData, setfarmerData] = useState(false)

  const getData = () => {
    setloading(true)
    let req = {
      "mobile_no": item.item.subtitle
    }
    AuthenicationService.farmerCropData(req)
      .then(x => {
        // console.log(x.data[0])
        setloading(false)
        if (x.mobileNumber == item.item.subtitle) {
          let mapped_array = []
          x.data.forEach(a => {
            mapped_array.push({
              "title": `${a.cropName}`, "subtitle": `${a.stageName}`, "enddate": a.endDate, "status": a.status,"image":a.cropImages[0],
              "details": { 'stage':a.stageName,'unit': a.cropFarmSizeUnit, 'size': a.cropFarmSize, 'startDate': a.startDate }, "footer_details": true
            })
          })
          setdata(mapped_array)
        } else {
        }
      })
  }

  useEffect(() => {
    getData()
    if (item){
      let m ={
        name:item.item.title,
        id:item.item.subtitle
      }
      setfarmerData(m)
    }
  }, [])


  return (
    <View style={mstyle.container1}>
      <Icon name={'person-circle-outline'} size={80}
        style={{ paddingTop: 2, color: Colors.LIGHT_GREEN, alignSelf: 'center' }} />
      <Text style={{ fontSize: 22,fontWeight:'bold', color: 'black', textAlign: 'center' }}>{item.item.title}</Text>
      {/* <Text style={{ fontSize: 14,fontWeight:'bold', color: 'gray', textAlign: 'center' }}>{item.item.subtitle}</Text> */}

      <View style={{ flexDirection: 'row', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: 'silver' }}>
        <View style={{ width: '30%', marginLeft: '5%' }}>
          <Icon name={'logo-whatsapp'}
            onPress={() => { Linking.openURL(`whatsapp://send?phone=91${item.item.subtitle}`) }}
            size={30} style={{ paddingTop: 2, color: 'green', alignSelf: 'center' }} />
        </View>

        <View style={{ width: '30%' }}>
          <Icon name={'ios-call'} onPress={() => {
            Linking.openURL(`tel:${item.item.subtitle}`)
          }}
            size={30} style={{ paddingTop: 2, color: Colors.GOOGLE_BLUE, alignSelf: 'center' }} />
        </View>

        <View style={{ width: '30%', marginRight: '5%' }}>
          <Icon name={'cart'}
            onPress={() => {
              navigation.navigate('FarmerProductKit', farmerData)
            }} size={30} style={{ paddingTop: 2, color:Colors.DEFAULT_GREEN , alignSelf: 'center' }} />
        </View>

      </View>

      <FlatList
        refreshing={loading}
        onRefresh={() => {
          getData()
        }}
        data={data}
        ListEmptyComponent={() => {
          return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={{ textAlign: 'center' }}> Farmer data not available</Text>

            </View>
          )
        }}
        renderItem={(item) => {
          return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Card item={item} />

            </View>
          )
        }} />
    </View>
  )
}

export default FarmerDetails