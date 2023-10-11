import { View, StyleSheet, Pressable, FlatList, ScrollView, ToastAndroid, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import MYinputs from './components/MYinputs';
import mstyle from './mstyle';
import Buttons from './components/Buttons';
import { AuthenicationService } from './services';
import submitReqData from './services/FormData';


const DayplanDetailsScreen = ({ navigation, props,
  route: {
    params: { item },
  },
}) => {
 
  const [formdata, setformdata] = useState([
    { label: 'Sales in Lakhs', placeholder: '....................', key: 'sales_in_lakhs', value: '', keyboard: 'numeric' },
    { label: 'Collections in Lakhs', placeholder: '....................', key: 'collections_n_lakhs', value: '', keyboard: 'numeric' },
    { label: 'Number of Dealer Appointment', placeholder: '....................', key: 'num_dealer', value: '', keyboard: 'numeric' },
  ])
  const [isLoading, setisLoading] = useState(false)
 

  const submit = () => {
    // // console.log(formdata)
    let req = submitReqData(formdata);
    setisLoading(true);
    req.activity_type='Day Plan'
    req.activity_name='Day Plan'
    if(!req.sales_in_lakhs){
      alert('Please enter Sales in Sales (in Lakhs)')
      setisLoading(false);

      return
    }
    if(!req.collections_n_lakhs){
      alert('Please enter Collections in Lakhs')
      setisLoading(false);

      return
    }

    if(!req.num_dealer){
      alert('Please enter Number of Dealer Appointment')
      setisLoading(false);

      return
    }

    AuthenicationService.dayplan_post_list(req).then(response => {
      setisLoading(false);
      // console.log(response)
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
      // console.log(e)
    })

  }

  const update = () => {
    // console.log(formdata)
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
        <Buttons title={'Update'} loading={isLoading} />
      </Pressable>) : (<Pressable style={{paddingVertical:20}} onPress={() => { submit() }}>
        <Buttons title={'Submit'} loading={isLoading} />
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
export default DayplanDetailsScreen