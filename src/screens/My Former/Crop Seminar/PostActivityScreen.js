import { View, Text, FlatList, Pressable, Alert } from 'react-native'
import React from 'react'
import mstyle from '../../../mstyle'
import { useState } from 'react'
import Card from '../../../components/Card'
import Icon from 'react-native-vector-icons/Ionicons';
import { useEffect } from 'react'
import { AuthenicationService } from '../../../services'

const PostActivityScreen = ({navigation ,  route: {
  params: { item },
},})  => {
  const [data, setdata] = useState([
    { title: 'Adding crop to app', value: '', key: "adding_crop_to_app"},
    { title: 'Auto ivr tts trig', value: '', key: "auto_ivr_tts_trig"},
    { title: 'Auto whatsapp message trigger', value: '', key: "auto_whatsapp_message_trigger" },
    { title: 'CNP notifications whatssapp', value: '', key: "cnp_notifications_whatssapp" },
    { title: 'CNP  videos whatssapp', value: '', key: "cnp_videos_whatssapp" },
  ])


  useEffect(() => {
    if(item) {
      // let mapped_array = []
      for (let f in data){
        // console.log(f)
       
          // console.log(data[f])
        
      item.value.forEach(i => {
        console.log('iiiiiiii', i.activity_name)
        if(data[f].title == i.activity_name){
          data[f].value = i.activity_status
          console.log(i.activity_status)
        }
        // mapped_array.push({"title": i.activity_name, "value": i.activity_status})
      })
    }
      // setdata(mapped_array)
    }
}, [])

const updateActivity=(index)=>{
  let req=

  AuthenicationService.update_crop_seminar().then((r)=>{
    console.log(r)
    if(r.status==true){

    }
  })
}




  return (
    <View style={mstyle.container1}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.key}
        renderItem={(item,index) => {
          return (
            <Pressable style={{ flex: 1, flexDirection: 'row' }}
            onPress={()=>{updateActivity(item.item)}}>
              <Icon name={item?.item.value===1 ?'ios-checkmark-circle':'ios-checkmark-circle'}
               size={22} style={{ paddingTop: 18, paddingLeft: 20, color: item?.item.value===1 ? 'green' : 'silver' }} />
              <Card item={item} />
            </Pressable>

          )
        }} />
    </View>
  )
}

export default PostActivityScreen