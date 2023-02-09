import { View, Text, FlatList, Pressable, TextInput } from 'react-native'
import React, { useState } from 'react'
import Card from '../../components/Card'
import FabButton from '../../components/FabButton'
import mstyle from '../../mstyle'
import { Colors } from '../../contants'
import { useEffect } from 'react'
import { AuthenicationService } from '../../services'

const MyFarmerListScreen = ({ navigation }) => {

  const [data, setdata] = useState([])

  const searchFilterFunction = (text) => {
    // console.log(text)
    AuthenicationService.searchfarmerData(text)
      .then(x => {
        x.text().then(m => {
          y = JSON.parse(m)
          if (y.success == true ) {
            let mapped_array = []
            y.data.forEach(a=> {
              mapped_array.push({"title": a.fullName, "subtitle": a.mobileNumber})
            })
            setdata(mapped_array)
        } else {
        }
        })
      
    })
  }


  useEffect(() => {
    getData()    
  }, [])
 
  const getData = ()=>{
    req=null
    AuthenicationService.farmerData(req).then(x => {
      x.text().then(m => {
        let y = JSON.parse(m)
        if (y.success == true) {
            let mapped_array = []
            y.data.forEach(a=> {
              mapped_array.push({"title": a.fullName, "subtitle": a.mobileNumber})
            })
            setdata(mapped_array)
        } else {
        }
      })
    })
    // console.log('kamesh', kamesh)
    
    // .then(response => {
    //   console.log('response from api', response)
    //   console.log('success', response?.success)
    //   if (response?.success== true) {
    //     console.log('inside success ', response)
    //     setdata(response?.data)
    //   }else{
    //   }
    // })
  }

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

export default MyFarmerListScreen