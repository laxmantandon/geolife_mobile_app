import { View, Text, FlatList, Pressable, TextInput, Linking } from 'react-native'
import React, { useState } from 'react'
import Card from './components/Card'
import FabButton from './components/FabButton'
import mstyle from './mstyle'
import { Colors } from './contants'
import { useEffect } from 'react'
import { AuthenicationService } from './services'
import Icon from 'react-native-vector-icons/Ionicons';

const CustomerScreen = ({navigation, props,
  route: {
    params: { item },
  }, }) => {

  const [data, setdata] = useState([])
  const [serachingData, setserachingData] = useState(true)

 
  const searchFilterFunction = (text) => {
    setserachingData(true)
    let req = {
      "text": text
    }
    if(item){
      if(item.name){
        console.log(item.name,'Child name')
        req.child_geo_mitra=item.name

      }
    }
    // // console.log(text)
    AuthenicationService.searchdealerData(req)
      .then(x => {
        setserachingData(false)
        console.log(x)
        if (x.status == true) {
          let mapped_array = []
          x.data.forEach(a => {
            console.log(a.activity)
            
            mapped_array.push({"icon_size":22,"icon":a.activity[0].count==0?"close-circle-outline":"checkmark-done-circle-outline",
            "icon_color":a.activity[0].count==0?"red":"green", "title": `${a.dealer_name}`, "subtitle": `${a.sales_person_name}`, 
            "mobile_number":a.mobile_number,  "whatsapp": a.mobile_number, "call": a.mobile_number, "data":a })
          })
          setdata(mapped_array)
        } else {
        }
      })
  }


  useEffect(() => {
    // getData()
    if(item){
      console.log(item,'router item')
    }
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
            <Pressable onPress={() => {
                navigation.navigate('CustomerDetails',{item})
              }}
              style={{flex:1,  flexDirection:'row'}}>
              <Card item={item} />
            </Pressable>           
            
            </View>
          )
        }} />
      {/* <Pressable onPress={() => { navigation.navigate('AddCustomer') }}>
        <FabButton />
      </Pressable> */}


    </View>
  )
}

export default CustomerScreen