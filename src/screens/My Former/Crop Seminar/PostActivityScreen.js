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

const PostActivityScreen = ({navigation ,  route: {
  params: { item },
},})  => {
  const [data, setdata] = useState([
    { title: 'Adding crop to app',"checkbox": true , value: false, key: "adding_crop_to_app"},
    { title: 'Auto ivr tts trig',"checkbox": true , value: false, key: "auto_ivr_tts_trig"},
    { title: 'Auto whatsapp message trigger',"checkbox": true , value: false, key: "auto_whatsapp_message_trigger" },
    { title: 'CNP notifications whatssapp',"checkbox": true , value: false, key: "cnp_notifications_whatssapp" },
    { title: 'CNP  videos whatssapp',"checkbox": true , value: false, key: "cnp_videos_whatssapp" },
  ])
  const [loading, setloading] = useState(false)
  const [IsLoading, setIsLoading] = useState(false)

// // console.log('IIIIIIIIIII', item.value.item.crop.name)


  useEffect(() => {
    if(item) {
      // // console.log(item.value.item.crop.details.post_activities)
      let mapped_array = []
      for (let f in data){
        item.value.item.crop.details.post_activities.forEach(i => {
        // // console.log('iiiiiiii', i.activity_status)
        if(data[f].title == i.activity_name){
          data[f].value = i.activity_status==0?false:true
          // console.log(i.activity_status, data[f].value)
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
// // console.log(data[activity.index].value)
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
    is_post_activity: "Yes",
    post_activities:activitysubmitReqData(data),
  }
  // console.log(req)

  setIsLoading(true);
      // // console.log(req)
    AuthenicationService.update_crop_seminar(req).then(r => {
      // // console.log('EEEEE', r)
      setIsLoading(false);
      if (r?.status== true) {
      navigation.goBack()
      ToastAndroid.showWithGravityAndOffset(
        'Post Activity Successfully Updated',
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
      // console.log(e)
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
        <Buttons title={'Submit Post Activity'}  loading={IsLoading}/>


        </Pressable>
    </View>
  )
}

export default PostActivityScreen