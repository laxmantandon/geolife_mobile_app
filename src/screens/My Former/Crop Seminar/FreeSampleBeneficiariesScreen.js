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
            mapped_array.push({ "title": `${a.first_name} ${a.last_name}`, "name": a.free_sample_name,"subtitle": a.mobile_number,"free_sample":a.free_sample })
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
    console.log(farmer)
    let msg = `Are you sure you add ${farmer.title} for free sample ?`
    let msg1 = ` ${farmer.title} Alredy have a free sample product `


    Alert.alert('Confirmation!', `${farmer.free_sample?msg1:msg}`, [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      { text: 'YES', onPress: () => submit(farmer) },
    ]);
  }


  const OpenDropDown = (farmer)=>{
    console.log(farmer)
    if(farmer.free_sample=="Purchased"){
      Alert.alert("Farmer Already updated")
    }else{

    Alert.alert(`Change status ${farmer.free_sample} to ${farmer.free_sample=="Used"?"Results":"Purchased"}`, `Are you sure you Update ${farmer.title} for free sample ?`, [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      { text: 'YES', onPress: () => update(farmer) },
      // { text: 'Update', onPress: () => update(farmer) },
    ]);
  }
  }


  const update = (farmer)=>{
    if(farmer.free_sample==="Used"){
      farmer.status = "Results"
    }
    if(farmer.free_sample==="" || farmer.free_sample===false){
      farmer.status = "Used"
    }
    if(farmer.free_sample==="Results"){
      farmer.status = "Purchased"
    }
    req={
      farmer:farmer.subtitle,
      status :farmer.status,
      crop_seminar_name:item.value.item.crop.name,
      fsd_name : farmer.name
    }
    console.log(req)
    AuthenicationService.update_status_free_sample(req).then(x => {
      console.log(x)
      if(x.status){
        searchFilterFunction("") 
        ToastAndroid.showWithGravityAndOffset(
          'Farmer status successfully updated',
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
        searchFilterFunction("") 
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
            <View>
              <Icon onPress={()=>{
              OpenDropDown(item.item)

            }} name={'chevron-down-outline'} 
                size={22} 
                style={{paddingTop:15,paddingRight:20,color:'gray'}}
            />
            <Text style={{paddingTop:15,paddingRight:20,color:'green',fontWeight:'bold', fontSize:12}}>
              {item.item.free_sample}
            </Text>
              </View>
            
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