import { View, Text, FlatList, Pressable, ToastAndroid, Alert } from 'react-native'
import React, { useState } from 'react'
import mstyle from './mstyle'
import MYinputs from './components/MYinputs'
import Buttons from './components/Buttons'
import submitReqData from './services/FormData'
import { AuthenicationService } from './services'
import { useEffect } from 'react'

const AddPaymentScreen = ({ navigation, props,
  route: {
    params: { item },
  }, }) => {
  const [payment_type, setpayment_type] = useState(["Online Payment", "Cash", "Cheque"])
  const [formdata, setformdata] = useState([
    { label: 'Select Payment Method', key: 'type', value: '', options: payment_type, type: 'select', },
    { label: 'Refrence Number', placeholder: 'Enter Refrence Number', key: 'ref_number', value: '', type: 'text' },
    { label: 'Amount', placeholder: 'Enter amount in rupees', key: 'amount', value: '', type: 'text' },
    { label: 'Notes', placeholder: 'Enter Something', key: 'notes', value: '', type: 'textarea' },
    { label: 'My Image', value: [], type: 'image', key: 'image', },
  ])
  const [isLoading, setisLoading] = useState(false)

  useEffect(() => {
    console.log(item.item.subtitle)
  }, [])


  const submitPayment = () => {
    if (!isLoading) {


      setisLoading(true)
      let req = submitReqData(formdata)
      req.dealer_mobile = item.item.subtitle

      if (!req.dealer_mobile) {
        setisLoading(false)
        Alert.alert('Error !', 'Dealer not found please select dealer')
        return
      }

      if (!req.type) {
        setisLoading(false)
        Alert.alert('Error !', 'Select payment method')
        return
      }

      if (!req.amount) {
        setisLoading(false)
        Alert.alert('Error !', 'Enter amount')
        return
      }


      AuthenicationService.Add_payment_entry(req).then(r => {
        setisLoading(false)
        if (r.status == true) {
          ToastAndroid.showWithGravityAndOffset(
            r.message,
            ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
          );
        } else {
          ToastAndroid.showWithGravityAndOffset(
            r.message,
            ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
          );
        }
      }).catch(e => {
        setisLoading(false)
      })
      
    }

  }
  return (
    <View style={mstyle.container}>
      <FlatList
        data={formdata}
        renderItem={({ item }) => {
          return (
            <MYinputs item={item} />
          )
        }}

        ListFooterComponent={() => {
          return (
            <Pressable onPress={() => {
              submitPayment()
            }}>
              <Buttons title={'Submit Payment'} loading={isLoading} />
            </Pressable>
          )
        }}
      />
    </View>
  )
}

export default AddPaymentScreen