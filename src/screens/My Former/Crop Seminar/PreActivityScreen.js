import { View, Text, FlatList, Pressable, Alert, ToastAndroid } from 'react-native'
import React from 'react'
import mstyle from '../../../mstyle'
import { useState } from 'react'
import Card from '../../../components/Card'
import Icon from 'react-native-vector-icons/Ionicons';
import { useEffect } from 'react'
import { AuthenicationService } from '../../../services'
import submitReqData from '../../../services/FormData'
import Buttons from '../../../components/Buttons'
import activitysubmitReqData from '../../../services/activityFromData'

const PreActivityScreen = ({navigation ,  route: {
  params: { item },
},})  => {
  const [data, setdata] = useState([
    { title: 'Auto ivr tts trigger', value:false,"checkbox": true , key: "auto_ivr_tts_trigger"},
    { title: 'Auto whatsapp message tr', value:false,"checkbox": true , key: "auto_whatsapp_message_tr"},
    { title: 'Bannerscnp hanging product wise', value:false,"checkbox": true , key: "bannerscnp_hanging_product_wise" },
    { title: 'Crop leaflet', value:false,"checkbox": true , key: "crop_leaflet" },
    { title: 'Coordination with bk didi  ', value:false,"checkbox": true , key: "coordination_with_bk_didi" },
    { title: 'Coordination with bk didi  ', value:false,"checkbox": true , key: "pol_stickers" },
    { title: 'Pol stickers  ', value:false,"checkbox": true , key: "pop_material" },
    { title: 'Product leaflet  ', value:false,"checkbox": true , key: "product_leaflet" },
    { title: 'Seminar event script', value:false,"checkbox": true , key: "seminar_event_script" },
    { title: 'Stickers', value:false,"checkbox": true , key: "stickers" },
    { title: 'Demo Board', value:false, "checkbox": true ,key: "demo_board" },
    { title: 'Book Dholvala', value:false,"checkbox": true , key: "book_dholvala" },
  ])
  const [loading, setloading] = useState(false)
  const [IsLoading, setIsLoading] = useState(false)

// console.log('IIIIIIIIIII', item.value.item.crop.name)


  useEffect(() => {
    if(item) {
      // console.log(item.value.item.crop.details.pre_activities)
      let mapped_array = []
      for (let f in data){
        item.value.item.crop.details.pre_activities.forEach(i => {
        // console.log('iiiiiiii', i.activity_status)
        if(data[f].title == i.activity_name){
          data[f].value = i.activity_status==0?false:true
          console.log(i.activity_status, data[f].value)
        }
      })
    }
      // setdata(mapped_array)
    }
    setloading(true)
    getData()
}, [])

const getData =()=>{
  setTimeout(()=> {
    setloading(false)
    clearTimeout();
  }, 500)
  
}

const checkActivity = (activity)=>{
// console.log(data[activity.index].value)
    if(activity.item.value===true){
  }else{

  Alert.alert(`Change status ${activity.item.title} `, `Are you sure you Update ${activity.item.title}?`, [
    {
      text: 'Cancel',
      onPress: () => null,
      style: 'cancel',
    },
    { text: 'YES', onPress: () => {data[activity.index].value = true}},
  ]);
}
}

const updateActivity=()=>{
  req = {
    name: item.value.item.crop.name,
    is_pre_activity: "Yes",
    pre_activities:activitysubmitReqData(data),
  }
  console.log(req)

  setIsLoading(true);
      // console.log(req)
    AuthenicationService.update_crop_seminar(req).then(r => {
      // console.log('EEEEE', r)
      setIsLoading(false);
      if (r?.status== true) {
      navigation.goBack()
      ToastAndroid.showWithGravityAndOffset(
        'Pre Activity Successfully Updated',
        ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
      );
      }else{
        ToastAndroid.showWithGravityAndOffset(
      'Oops! Something went wrong check internet connection',
      ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    );
       
      }
    }).catch(e => {
      setIsLoading(false);
      console.log(e)
    })
}




  return (
    <View style={mstyle.container1}>
      <FlatList
         refreshing={loading}
         onRefresh={()=>{
           getData()
         }}
      
        data={data}
        keyExtractor={(item, index) => item.key}
        renderItem={(item,index) => {
          return (
            <Pressable style={{ flex: 1, flexDirection: 'row' }}
            onPress={()=>{ item.item.value===true?item.item.value=false:item.item.value=true 
               setloading(true)
               getData()
                }}
           >
              {/* <Icon  name={item.item.value===true ?'ios-checkmark-circle':'ellipse-outline'}
               size={22} style={{ paddingTop: 18, paddingLeft: 20, color: item.item.value===true ? 'green' : 'silver' }} /> */}
              <Card item={item} />
            </Pressable>

          )
        }} />
        <Pressable onPress={()=>{updateActivity()}}>
        <Buttons title={'Submit Pre Activity'}  loading={IsLoading}/>


        </Pressable>
    </View>
  )
}

export default PreActivityScreen