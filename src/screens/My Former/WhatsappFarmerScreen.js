import { View, StyleSheet, Pressable, FlatList, ScrollView,  Linking, Image, PermissionsAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import MYinputs from '../..//components/MYinputs';
import mstyle from '../../mstyle';
import Buttons from '../../components/Buttons';
import submitReqData from '../../services/FormData';
import { AuthenicationService } from '../../services';
import Share from 'react-native-share';


const WhatsappFarmerScreen = () => {
  const [activity_type, setactivity_type] = useState(["Option 01", "Option 02", "Option 03", "Option 04"])
  const [msg, setmsg] = useState('')
  const [mimage, setmimage] = useState(null)
  const [murl, setmurl] = useState(null)
  const [formdata, setformdata] = useState([
    { label: 'Daily Whatsapp Message', key: 'message', value: msg, type: 'textarea', },
    { label: 'Video Url', key: 'video', value: murl,  },
    // { label: 'My Image', value: mimage, type: 'image', key: 'image', },
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
  useEffect(() => {
    getData()    
  }, [])
 
  const getData = ()=>{
    req=null
    AuthenicationService.whatsapp_templates(req).then(r => {
      console.log(r)
      if (r?.status== true) {
        // setformdata(r?.data)
        setmimage(r?.data.image.image)
        formdata[0].value=r.data.message
        formdata[1].value=r.data.video_url
        setmsg( r.data.message)
        setmurl(r.data.video_url)
      }else{
      }
    }).catch(e => {
      console.log('eeeeee', e)
    })
  }

  const submit = () => {

    let req = submitReqData(formdata)
    // Linking.openURL(`whatsapp://send?text=${murl}%0A%0A${msg}%0A%0AImage%20Link%20:%20${mimage}`)
    const options = {
      title: req['Daily Whatsapp Message'],
      message: `${murl}  ${msg}`, // Note that according to the documentation at least one of "message" or "url" fields is required
      url: mimage,
    };
    
Share.open(options)
.then((res) => {
  console.log(res);
})
.catch((err) => {
  err && console.log(err);
});

    
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
            <View>
            <Image style={{ width: '100%',minHeight:150, maxHeight:250, backgroundColor:'silver' }} 
            source={{ uri: mimage }} />

            <Pressable onPress={() => { submit() }}>
              <Buttons title={'Share'}  loading={false} />
            </Pressable>

            </View>
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