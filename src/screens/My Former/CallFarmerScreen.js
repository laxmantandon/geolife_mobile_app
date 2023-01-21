import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import { PermissionsAndroid } from 'react-native';
import CallLogs from 'react-native-call-log'



const CallFarmerScreen = () => {
  
  try {
    const granted =  PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
      {
        title: 'Call Log Example',
        message:
          'Access your call logs',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('permission hai',CallLogs);
      CallLogs.load(5).then(c => console.log(c));
    } else {
      const granted =  PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
        {
          title: 'Call Log Example',
          message:
            'Access your call logs',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      )
      console.log('Call Log permission denied');
    }
  }
  catch (e) {
    console.log(e);
  }

const [data, setdata] = useState(null)
CallLogs.load(5).then(c => {console.log(c)
setdata(c)});


  return (
    <View>
      <Text>CallFarmerScreen</Text>
      <FlatList 
      data={data}
      renderItem={({item})=>{
        return(
          <View>
            <Text>{item.name} </Text>
            <Text>{item.phoneNumber} </Text>
          </View>
        )
      }} />
    </View>
  )
}

export default CallFarmerScreen