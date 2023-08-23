import { View, StyleSheet,  Pressable,  FlatList, ScrollView, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import MYinputs from '../..//components/MYinputs';
import mstyle from '../../mstyle';
import Buttons from '../../components/Buttons';
import submitReqData from '../../services/FormData';
import { AuthenicationService } from '../../services';


const FarmerMeetingScreen = ({navigation}) => {
  const [formdata, setformdata] = useState([
     { label: 'Agenda', placeholder:'Agenda', key: 'agenda', value:'',type: 'text', },
     { label: 'Location', placeholder:'Location / Address', key: 'location', value:'',type: 'text', },
     { label: 'No of Attendees', placeholder:'No of Attendees', key: 'no_attendees', value:'',type: 'text', },
     { label: 'Note', placeholder:'Note : About meeting', key: 'notes', value:'',type: 'textarea', },
     { label: 'Photo attendance', value: [], type: 'image', key: 'image', },
  ])
  const [isloading, setisloading] = useState(false)
  // if (item) {
  //   // console.log(item)

  //   for (let i in formdata) {
  //     for (let n in item.item) {
  //       // console.log('item value', item.item[n])
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
    // console.log(formdata)
    let req = submitReqData(formdata);
    AuthenicationService.farmer_meeting(req).then(response => {
      setisloading(false);
      // console.log(response)
      if (response?.status== true) {
      navigation.goBack()
      ToastAndroid.showWithGravityAndOffset(
        'Farmer meeting submited',
        ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
      );
      }else{
        ToastAndroid.showWithGravityAndOffset(
      'Oops! Something went wrong check internet connection',
      ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    );
       
      }
    }).catch((e)=>{
      ToastAndroid.showWithGravityAndOffset(
      ' Something went wrong check internet connection',
      ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
      )

    })
  }

  }

  const update =()=>{
    // console.log(formdata)
  }



  return (
    <View style={mstyle.container1}>
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
export default FarmerMeetingScreen