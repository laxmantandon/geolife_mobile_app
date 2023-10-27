import { View, Text, Modal, ActivityIndicator } from 'react-native'
import React from 'react'
import mstyle from './mstyle'
import { Colors } from './contants'

const Frappe_Model = ({loading, text}) => {
   return (
    <Modal transparent visible={loading==true?loading:false}>
    <View style={{ flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',}}>
    <View style={{}}>
        <View style={{backgroundColor:'white', padding:20, borderRadius:15}}>
         <Text style={{fontSize:15, color:'black'}}> {text?text:'Loading Please Wait'} </Text> 
         <ActivityIndicator size={'large'} color={Colors.GOOGLE_BLUE}/>

        </View>
        </View>
    </View>
  </Modal>
  )
}

export default Frappe_Model