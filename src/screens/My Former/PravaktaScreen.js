import { View, Text, FlatList, Pressable, TextInput } from 'react-native'
import React, { useState } from 'react'
import Card from '../../components/Card'
import mstyle from '../../mstyle'
import { Colors } from '../../contants'
import { useEffect } from 'react'
import { AuthenicationService } from '../../services'

const PravaktaScreen = ({ navigation }) => {

  const [data, setdata] = useState([])

  const searchFilterFunction = (text) => {
    let req = {
      "text": text
    }
    // // console.log(text)
    AuthenicationService.searchfarmerData(req)
      .then(x => {
        if (x.status == true) {
          let mapped_array = []
          x.data.forEach(a => {
            mapped_array.push({ "title": `${a.first_name} ${a.last_name}`,  "second_subtitle": `TFT app:${a.app_installed?a.app_installed:'Installed'}, Crop added : ${a.crop_added?'Yes':'No'} `, "subtitle": a.mobile_number })
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
        data={data}
        renderItem={(item) => {
          return (
            <Pressable
              onPress={() => {
                // navigation.navigate(item.item.route)
              }}
            >
              <Card item={item} />

            </Pressable>
          )
        }} />
      {/* <Pressable onPress={() => { navigation.navigate('AddFarmer') }}>
        <FabButton />

      </Pressable> */}


    </View>
  )
}

export default PravaktaScreen