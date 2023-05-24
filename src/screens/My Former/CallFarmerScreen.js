import { View, Text, FlatList, Pressable, TextInput, Linking } from 'react-native'
import React, { useState } from 'react'
import Card from '../../components/Card'
import FabButton from '../../components/FabButton'
import mstyle from '../../mstyle'
import { Colors } from '../../contants'
import { useEffect } from 'react'
import { AuthenicationService } from '../../services'
import Icon from 'react-native-vector-icons/Ionicons';

const CallFarmerScreen = ({ navigation }) => {

  const [data, setdata] = useState([])
  const [serachingData, setserachingData] = useState(true)

  const searchFilterFunction = (text) => {
    setserachingData(true)
    let req = {
      "text": text
    }
    // // console.log(text)
    AuthenicationService.searchfarmerData(req)
      .then(x => {
        setserachingData(false)

        if (x.status == true) {
          let mapped_array = []
          x.data.forEach(a => {
            mapped_array.push({ "title": `${a.first_name} ${a.last_name}`, "subtitle": a.mobile_number })
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
 
  // const getData = ()=>{
  //   req=null
  //   AuthenicationService.farmerData(req).then(x => {
  //     x.text().then(m => {
  //       let y = JSON.parse(m)
  //       if (y.success == true) {
  //           let mapped_array = []
  //           y.data.forEach(a=> {
  //             mapped_array.push({"title": a.fullName, "subtitle": a.mobileNumber})
  //           })
  //           setdata(mapped_array)
  //       } else {
  //       }
  //     })
  //   })
  // }

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
            <Pressable style={{flex:1,  flexDirection:'row'}}
              onPress={() => {
                Linking.openURL(`tel:${item.item.subtitle}`)
              }}
            >

              <Card item={item} />
              <Icon name={'ios-call'} size={22} color='black' style={{paddingTop:15,paddingRight:20,color:'black'}}/>

            </Pressable>
          )
        }} />
      {/* <Pressable onPress={() => { navigation.navigate('AddFarmer') }}>
        <FabButton />

      </Pressable> */}


    </View>
  )
}

export default CallFarmerScreen