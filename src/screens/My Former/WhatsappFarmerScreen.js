import { View, StyleSheet, Pressable, FlatList, ScrollView, Share, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import MYinputs from '../..//components/MYinputs';
import mstyle from '../../mstyle';
import Buttons from '../../components/Buttons';
import submitReqData from '../../services/FormData';


const WhatsappFarmerScreen = () => {
  const [activity_type, setactivity_type] = useState(["Option 01", "Option 02", "Option 03", "Option 04"])
  const [formdata, setformdata] = useState([
    { label: 'Daily Whatsapp Message', key: 'message', value: '', type: 'textarea', },
    { label: 'My Image', value: [], type: 'image', key: 'image', },
  ])
  // if (item) {
  //   console.log(item)

  //   for (let i in formdata) {
  //     for (let n in item.item) {
  //       console.log('item value', item.item[n])
  //       if (formdata[i].key === n) {
  //         formdata[i].value = item.item[n]
  //       }
  //     }
  //   }
  // }


  const submit = () => {

    let req = submitReqData(formdata)
    console.log('submited', req)

    const shareOptions = {
      title: req['Daily Whatsapp Message'],
      message: req['Daily Whatsapp Message'], // Note that according to the documentation at least one of "message" or "url" fields is required
      url: req['image'],
      subject: 'Subject'
    };
    Share.share(shareOptions)

    
  }




  return (
    <View style={mstyle.container}>
      <FlatList
        data={formdata}
        renderItem={({ item, index }) => {
          return (
            <Pressable>
              <MYinputs item={item} />
            </Pressable>
          )
        }}

        ListFooterComponent={() => {
          return (
            <Pressable onPress={() => { submit() }}>
              <Buttons title={'Share'}  loading={false} />
            </Pressable>
          )
        }}

      />
    </View>
  )
}


const styles = StyleSheet.create({
  InputStyle: {
    padding: 20, shadowColor: 'rgba(0,0,0,0.4)',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 2,
  },

  inputbox: {
    paddingHorizontal: 10,
    paddingVertical: 15
  },
  images: {
    width: 100,
    height: 100,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3
  },
})
export default WhatsappFarmerScreen