import { View, Text, FlatList, Pressable, TextInput, ToastAndroid, Alert } from 'react-native'
import React, { useState } from 'react'
import Card from '../../../components/Card'
import mstyle from '../../../mstyle'
import { Colors } from '../../../contants'
import { useEffect } from 'react'
import { AuthenicationService } from '../../../services'
import Icon from 'react-native-vector-icons/Ionicons';


const FreeSampleBeneficiariesScreen = ({ navigation, route: {
  params: { item },
}, }) => {

  const [data, setdata] = useState([])

  const searchFilterFunction = (text) => {
    let req = {
      "text": text
    }
    // console.log(text)
    AuthenicationService.searchfarmerData(req)
      .then(x => {
        if (x.status == true) {
          let mapped_array = []
          x.data.forEach(a => {
            mapped_array.push({ "title": `${a.first_name} ${a.last_name}`, "subtitle": a.mobile_number,"free_sample":a.free_sample })
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
 
  const checkfarmer = (farmer)=>{
    Alert.alert('Confirmation!', `Are you sure you add ${farmer.title} for free sample ?`, [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      { text: 'YES', onPress: () => submit(farmer) },
      { text: 'Update', onPress: () => submit(farmer) },
    ]);
  }


  const OpenDropDown = (farmer)=>{
    Alert.alert('Confirmation!', `Are you sure you Update ${farmer.title} for free sample ?`, [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      { text: 'YES', onPress: () => update(farmer) },
      { text: 'Update', onPress: () => update(farmer) },
    ]);
  }


  const update = (farmer)=>{
    req={
      farmer:farmer.subtitle,
      name:item.value.item.crop.name,
    }
    console.log(req)
    AuthenicationService.create_free_sample(req).then(x => {
      console.log(x)
      if(x.status){
        ToastAndroid.showWithGravityAndOffset(
          'Farmer Successfully Submited',
          ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
        );
      }else{
        ToastAndroid.showWithGravityAndOffset(
          'Farmer Not Submited Please Try Again',
          ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
        );

      }
   
    })
  }


  const submit = (farmer)=>{
    req={
      farmer:farmer.subtitle,
      name:item.value.item.crop.name,
    }
    console.log(req)
    AuthenicationService.create_free_sample(req).then(x => {
      console.log(x)
      if(x.status){
        ToastAndroid.showWithGravityAndOffset(
          'Farmer Successfully Submited',
          ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
        );
      }else{
        ToastAndroid.showWithGravityAndOffset(
          'Farmer Not Submited Please Try Again',
          ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
        );

      }
   
    })
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
            <View style={{ flexDirection:'row', flex:1 }}>              
              <Pressable style={{ flexDirection:'row', flex:1 }}
              onPress={() => { checkfarmer(item.item) }} >
              <Card item={item} />
            </Pressable>
            {item.item.free_sample?( 
            <Icon onPress={()=>{
              OpenDropDown()

            }} name={'chevron-down-outline'} 
                size={30} 
                style={{paddingTop:15,paddingRight:20,color:'green'}}
            />
            
            ):(null)}

              </View>
          )
        }} />
      {/* <Pressable onPress={() => { navigation.navigate('AddFarmer') }}>
        <FabButton />

      </Pressable> */}


    </View>
  )
}

export default FreeSampleBeneficiariesScreen