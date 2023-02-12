import { View, Text, FlatList, Pressable } from 'react-native'
import React from 'react'
import mstyle from '../../../mstyle'
import { useState } from 'react'
import Card from '../../../components/Card'
import Icon from 'react-native-vector-icons/Ionicons';


const PreActivityScreen = ({navigation ,  route: {
  params: { item },
},})  => {
  const [data, setdata] = useState([
    { title: 'Auto ivr tts trigger', value: '', key: "auto_ivr_tts_trigger"},
    { title: 'Auto whatsapp message tr', value: '', key: "auto_whatsapp_message_tr"},
    { title: 'Bannerscnp hanging product wise', value: '', key: "bannerscnp_hanging_product_wise" },
    { title: 'Crop leaflet', value: '', key: "crop_leaflet" },
    { title: 'Coordination with bk didi  ', value: '', key: "coordination_with_bk_didi" },
    { title: 'Coordination with bk didi  ', value: '', key: "pol_stickers" },
    { title: 'Pol stickers  ', value: '', key: "pop_material" },
    { title: 'Product leaflet  ', value: '', key: "product_leaflet" },
    { title: 'Seminar event script', value: '', key: "seminar_event_script" },
    { title: 'Stickers', value: '', key: "stickers" },
    ])
    
  console.log(item.value[0])
if(item){
  for (let m in item.value[0]){
    console.log(item.value[0][m])
    for (let n in data){
      if (data[n].key == m){
        data[n].value = item.value[0][m]
        // console.log(item.value[0][m])
      }
    }
  }
  console.log('demo data', data)
}

  return (
    <View style={mstyle.container1}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => 'key'+index}
        renderItem={(item) => {
          return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Icon name='ios-checkmark-circle' size={22} style={{ paddingTop: 18, paddingLeft: 20, color: item?.item.value==1 ? 'green' : 'silver' }} />
              <Card item={item} />
            </View>

          )
        }}
        />
    </View>
  )
}

export default PreActivityScreen