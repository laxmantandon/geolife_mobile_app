import { View, Text, FlatList, Pressable } from 'react-native'
import React from 'react'
import mstyle from '../../../mstyle'
import { useState } from 'react'
import Card from '../../../components/Card'
import Icon from 'react-native-vector-icons/Ionicons';


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

  console.log(item.value[0])
  for (let m in item.value[0]){
    for (let n in data){
      if (data[n].key == m){
        data[n].value = item.value[0][m]
      }
    }
  }

  return (
    <View style={mstyle.container1}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.key}
        renderItem={(item) => {
          return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Icon name='ios-checkmark-circle' size={22} style={{ paddingTop: 18, paddingLeft: 20, color: item?.item.value===1 ? 'green' : 'silver' }} />
              <Card item={item} />
            </View>

          )
        }} />
    </View>
  )
}

export default PostActivityScreen