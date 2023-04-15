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

  const getData = () => {
    setloading(true)
    let req = {
      "mobile_no": item.item.subtitle
    }
    AuthenicationService.farmerCropData(req)
      .then(x => {
        console.log(x.data[0])
        setloading(false)
        if (x.mobileNumber == item.item.subtitle) {
          let mapped_array = []
          x.data.forEach(a => {
            mapped_array.push({
              "title": `${a.cropName}`, "subtitle": `Stage :- ${a.stageName}`, "date": a.endDate, "status": a.status,
              "details": { 'unit': a.cropFarmSizeUnit, 'size': a.cropFarmSize, 'startDate': a.startDate }, "footer_details": true
            })
          })
          setdata(mapped_array)
        } else {
        }
      })
  }

  useEffect(() => {
    getData()
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
              navigation.navigate('FarmerProductKit', item)
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
              <Text style={{ textAlign: 'center' }}> Former data not available</Text>

            </View>
          )
        }}
        renderItem={(item) => {
          return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Card item={item} />

              {/* <Pressable onPress={() => {
              }}
              style={{flex:1,  flexDirection:'row'}}>

                <View
                style={[mstyle.ListContainer, { width: '100%' }]} >

                <View style={[mstyle.detailContainer, { width: '90%' }]}>
                  <View style={mstyle.titleContainer}>
                    <Text style={mstyle.listListTitle} numberOfLines={1}>
                        {item.cropName}
                    </Text>
                    <Text>{`${item.startDate} To ${moment(item.endDate).format('MM/DD/YYYY')}`}</Text>
                    <Text>{item.status}</Text>
                    <Text>{item.stageName}</Text>
                    <Text>{item.cropName}</Text>




                   
                  </View>

                  <View style={{ width: '15%' }}>
                    
                    


                  </View>

                </View>
              </View>
              
            
              </Pressable> */}
            </View>
          )
        }} />
    </View>
  )
}

export default FarmerDetails