import { View, StyleSheet,  Pressable,  FlatList, ScrollView, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import MYinputs from '../..//components/MYinputs';
import mstyle from '../../mstyle';
import Buttons from '../../components/Buttons';
import submitReqData from '../../services/FormData';
import { AuthenicationService } from '../../services';


const RaiseCropAlertScreen = ({navigation}) => {
  const [activity_type, setactivity_type] = useState(["Option 01", "Option 02", "Option 03", "Option 04"])
  const [formdata, setformdata] = useState([
    { label: 'Alert msg', placeholder:'Note : About Alert', key: 'notes', value:'',
     type: 'textarea', },
      { label: 'My Image', value: [], type: 'image', key: 'image', },
  ])
  const [isloading, setisloading] = useState(false)
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


  const submit =()=>{
    let req = submitReqData(formdata);
if (!req.notes){
  alert('Please add notes or image')
}
    if(!isloading){
      setisloading(true)
    console.log(formdata)
    let req = submitReqData(formdata);
    AuthenicationService.crop_alert(req).then(response => {
      setisloading(false);
      console.log(response)
      if (response?.status== true) {
      navigation.goBack()
      }else{
        ToastAndroid.showWithGravityAndOffset(
      'Oops! Something went wrong check internet connection',
      ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    );
       
      }
    })
  }

  }

  const update =()=>{
    console.log(formdata)
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

        ListFooterComponent={()=>{
          return(
            <Pressable onPress={()=>{submit()}}>
            <Buttons title={'Submit'}  loading={isloading}/>
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
export default RaiseCropAlertScreen