import { View, Text, FlatList, Pressable, Alert } from 'react-native'
import React from 'react'
import mstyle from '../../../mstyle'
import { useState } from 'react'
import Card from '../../../components/Card'
import Icon from 'react-native-vector-icons/Ionicons';
import { useEffect } from 'react'
import { AuthenicationService } from '../../../services'
import submitReqData from '../../../services/FormData'
import Buttons from '../../../components/Buttons'

const PreActivityScreen = ({navigation ,  route: {
  params: { item },
},})  => {
  const [data, setdata] = useState([
    { title: 'Auto ivr tts trigger', value:false, key: "auto_ivr_tts_trigger"},
    { title: 'Auto whatsapp message tr', value:false, key: "auto_whatsapp_message_tr"},
    { title: 'Bannerscnp hanging product wise', value:false, key: "bannerscnp_hanging_product_wise" },
    { title: 'Crop leaflet', value:false, key: "crop_leaflet" },
    { title: 'Coordination with bk didi  ', value:false, key: "coordination_with_bk_didi" },
    { title: 'Coordination with bk didi  ', value:false, key: "pol_stickers" },
    { title: 'Pol stickers  ', value:false, key: "pop_material" },
    { title: 'Product leaflet  ', value:false, key: "product_leaflet" },
    { title: 'Seminar event script', value:false, key: "seminar_event_script" },
    { title: 'Stickers', value:false, key: "stickers" },
    { title: 'Demo Board', value:false, key: "demo_board" },
    { title: 'Book Dholvala', value:false, key: "book_dholvala" },
  ])
  const [loading, setloading] = useState(false)



  useEffect(() => {
    if(item) {
      // let mapped_array = []
      for (let f in data){
      item.value.forEach(i => {
        console.log('iiiiiiii', i.activity_name)
        if(data[f].title == i.activity_name){
          data[f].value = i.activity_status
          console.log(i.activity_status)
        }
      })
    }
      // setdata(mapped_array)
    }
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
  let req = submitReqData(data)
  
    // req.name= item.value.item.crop.name,
    req.is_pre_activity=1,
  
  console.log(req)
  AuthenicationService.update_crop_seminar().then((r)=>{
    console.log(r)
    if(r.status==true){

    }
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
              <Icon  name={item.item.value===true ?'ios-checkmark-circle':'ellipse-outline'}
               size={22} style={{ paddingTop: 18, paddingLeft: 20, color: item.item.value===true ? 'green' : 'silver' }} />
              <Card item={item} />
            </Pressable>

          )
        }} />
        <Pressable onPress={()=>{updateActivity()}}>
        <Buttons title={'Submit Pre Activity'} />


        </Pressable>
    </View>
  )
}

export default PreActivityScreen