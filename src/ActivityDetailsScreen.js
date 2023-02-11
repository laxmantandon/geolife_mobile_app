import { View, StyleSheet, Pressable, FlatList, ScrollView, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import MYinputs from './components/MYinputs';
import mstyle from './mstyle';
import Buttons from './components/Buttons';
import { AuthenicationService } from './services';
import submitReqData from './services/FormData';
import { back } from 'react-native/Libraries/Animated/Easing';


const ActivityDetailsScreen = ({ navigation, props,
  route: {
    params: { item },
  },
}) => {
 
  const [activity_type, setactivity_type] = useState([])
  const [formdata, setformdata] = useState([
    { label: 'Please Select Activity Type', key: 'activity_type', value: '', options: activity_type, type: 'select', },
    { label: 'Name', placeholder: 'Enter Name', key: 'activity_name', value: '', type: 'text' },
    { label: 'Notes', placeholder: 'Enter Notes', key: 'notes', value: '', type: 'textarea' },
    { label: 'My Image', value: [], type: 'image', key: 'image', },
  ])
  if (item) {
    console.log(item)

    for (let i in formdata) {
      for (let n in item.item) {
        console.log('item value', item.item[n])
        if (formdata[i].key === n) {
          formdata[i].value = item.item[n]
        }
      }
    }
  }

  if (activity_type.length===0){
    console.log(activity_type.length)
    AuthenicationService.activity_type(req).then(res => {
      // console.log(res.data)
      if (res?.status == true) {
        mapped_array=[]
        res.data.forEach(a=> {
          mapped_array.push( a.name)
        })
        formdata[0].options =mapped_array
        setactivity_type(mapped_array)
      } else {
      }
    })

  }


  const submit = () => {
    // console.log(formdata)
    let req = submitReqData(formdata);
    // setIsLoading(true);

    AuthenicationService.create_activity(req).then(response => {
      // setIsLoading(false);
      console.log(response)
      if (response?.status == true) {
        ToastAndroid.showWithGravityAndOffset(
          response?.message,
          ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50)
        navigation.goBack()
      } else {
        ToastAndroid.showWithGravityAndOffset(
          response?.message,
          ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
        );

      }
    }).catch(e=>{
      console.log(e)
    })

  }

  const update = () => {
    console.log(formdata)
  }



  return (
    <View style={mstyle.container}>
      <FlatList
        data={formdata}
        renderItem={({ item, index }) => {
          return (
            <Pressable
            >
              <MYinputs item={item} />

            </Pressable>
          )
        }} />

      {item.item ? (<Pressable onPress={() => { update() }}>
        <Buttons title={'Update'} loading={false} />
      </Pressable>) : (<Pressable onPress={() => { submit() }}>
        <Buttons title={'Submit'} loading={false} />
      </Pressable>)}



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
export default ActivityDetailsScreen