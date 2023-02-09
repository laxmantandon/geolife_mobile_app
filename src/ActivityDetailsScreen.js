import { View, StyleSheet,  Pressable,  FlatList, ScrollView, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import MYinputs from './components/MYinputs';
import mstyle from './mstyle';
import Buttons from './components/Buttons';
import { AuthenicationService } from './services';
import submitReqData from './services/FormData';
import { back } from 'react-native/Libraries/Animated/Easing';


const ActivityDetailsScreen = ({navigation, props,
  route: {
    params: { item },
  },
}) => {
  const [activity_type, setactivity_type] = useState(["Option 01", "Option 02", "Option 03", "Option 04"])
  const [formdata, setformdata] = useState([
    { label: 'Please Select Activity Type', key: 'type', value: '', options: activity_type, type: 'select', },
    { label: 'Name', placeholder: 'Enter Name', key: 'title', value: '', type: 'text' },
    { label: 'Notes', placeholder: 'Enter Notes', key: 'subtitle', value: '', type: 'text', keyboard: 'numeric' },
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


  const submit =()=>{
    console.log(formdata)
    let req = submitReqData(formdata);
      // setIsLoading(true);

    AuthenicationService.create_activity(req).then(response => {
      // setIsLoading(false);
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

  const update =()=>{
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

      {item.item ? (<Pressable onPress={()=>{update()}}>
        <Buttons title={'Update'} loading={false}/>
      </Pressable>):(<Pressable onPress={()=>{submit()}}>
        <Buttons title={'Submit'}  loading={false}/>
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