import { View, StyleSheet,  Pressable,  FlatList, ScrollView, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import MYinputs from '../..//components/MYinputs';
import mstyle from '../../mstyle';
import Buttons from '../../components/Buttons';
import { AuthenicationService } from '../../services';
import submitReqData from '../../services/FormData';


const DoorToDoorScreen = ({navigation}) => {
  const [formdata, setformdata] = useState([
    { label: 'About Door  to Door visit', placeholder:'Note : About Door  to Door visit', key: 'notes', value:'',
     type: 'textarea', },
      { label: 'My Image', value: [], type: 'image', key: 'image', },
  ])
  const [loading, setloading]= useState(false)
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
    setloading(true)
    let req = submitReqData(formdata);
    // console.log(req)
    if (req.notes == "" || req.notes == undefined) {
      setloading(false)
      ToastAndroid.showWithGravityAndOffset(
        "Please enter notes",
        ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
      );
      return
    }
    AuthenicationService.door_to_door_awareness(req).then(r => {
      // console.log(r)
      if (r.status == true) {
        setloading(false)
        navigation.goBack()
      } else {
        ToastAndroid.showWithGravityAndOffset(
          e.message,
          ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
        );

      }
    }).catch(e => {
      console.log(e);
      setloading(false)
    })

  }

  const update =()=>{
    // console.log(formdata)
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
            <Buttons title={'Submit'}  loading={loading}/>
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
export default DoorToDoorScreen