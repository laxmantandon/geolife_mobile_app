import { View, Text, FlatList, Pressable, TextInput, Linking } from 'react-native'
import React, { useState } from 'react'
import Card from '../../components/Card'
import FabButton from '../../components/FabButton'
import mstyle from '../../mstyle'
import { Colors } from '../../contants'
import { useEffect } from 'react'
import { AuthenicationService } from '../../services'
import Icon from 'react-native-vector-icons/Ionicons';

const FarmerOrdersScreen = ({ navigation }) => {

  const [data, setdata] = useState([])
  const [serachingData, setserachingData] = useState(true)

  const searchFilterFunction = (text) => {
    setserachingData(true)
    let req = {
      "text": text
    }
    // console.log(text)
    AuthenicationService.searchfarmerOrdersData(req)
      .then(x => {
        setserachingData(false)
        console.log(x.data[0])
        if (x.status == true) {
          let mapped_array = []
          x.data.forEach(a => {
            mapped_array.push({ "title": `${a.name}`, "subtitle":` Product kit for (${a.crop})`, 
            "status": a.payment_method, "percent":`Rs. ${a.amount}`, "date": a.posting_date,"data":a })
          })
          setdata(mapped_array)
        } else {
        }
      })
  }


  useEffect(() => {
    // getData()
    searchFilterFunction("")    
  }, [])
 


  return (
    <View style={mstyle.container1}>
      <View style={mstyle.inputContainer}>
        <View style={mstyle.inputSubContainer}>
          <TextInput
            placeholder={'Type something'}
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            style={mstyle.inputText}
            onChangeText={text => {
              searchFilterFunction(text)
            }}
          />
        </View>
      </View>


      <FlatList
       refreshing={serachingData}
       onRefresh={()=>{
         searchFilterFunction("")
       }}
        data={data}
        renderItem={(item) => {
          return (
            <View style={{flex:1,  flexDirection:'row'}}>
            <Pressable onPress={() => { navigation.navigate('OrderDetails',{"mdata":item}) }}
              style={{flex:1,  flexDirection:'row'}}>
              <Card item={item} />
              </Pressable>
            </View>
          )
        }} />
      <Pressable onPress={() => { navigation.navigate('FarmerProductKit', item=false) }}>
        <FabButton />
      </Pressable>
    </View>
  )
}

export default FarmerOrdersScreen