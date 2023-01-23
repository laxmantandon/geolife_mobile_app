import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { PermissionsAndroid } from 'react-native';
import CallLogs from 'react-native-call-log'
import Card from '../../components/Card';
import mstyle from '../../mstyle';
import { Fonts } from '../../contants';



const CallFarmerScreen = () => {
const [data, setdata] = useState(null)
// CallLogs.load(5).then(c => {console.log(c)
// setdata(c)});
const abc =async()=>{
  try {
    const granted = await PermissionsAndroid.request(
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
      // console.log('permission hai',CallLogs);
      CallLogs.load(25).then(c => {
        setdata(c)
        console.log(c)});
    } else {
    
      console.log('Call Log permission denied');
    }
  }
  catch (e) {
    console.log(e);
  }
 
 
}
useEffect(() => {
  abc()
  // const filter = {
  //   minTimestamp: 1571835032, 
  //   maxTimestamp: 1571835033,  
  //   phoneNumbers: '+917737351725', 
  // }
  
  // const callLogs = CallLogs.load(-1, filter) 
  // console.log('77728',callLogs)
  // setdata(callLogs)
  
}, [])


  return (
    <View style={mstyle.container1}>
      <FlatList 
      data={data}
      renderItem={({item})=>{
        return(
          <View
          style={mstyle.ListContainer} >
         
          {/* <Image style={{ margin: "auto", backgroundColor: 'silver', height: 60, width: 60, borderRadius: 50 }} 
          source={{ uri: '' }} /> */}

          <View style={mstyle.detailContainer}>
            <View style={mstyle.titleContainer}>
              <Text style={mstyle.listListTitle} numberOfLines={1}>
                {item?.name ?item?.name:'No name'}
              </Text>
              <Text style={{ color: 'green',fontSize:12,fontWeight:'600', fontFamily: Fonts.POPPINS_MEDIUM,
    }} numberOfLines={2}>{item.phoneNumber}</Text>

<Text style={{ color: 'green',fontSize:12,fontWeight:'600', fontFamily: Fonts.POPPINS_MEDIUM,
    }} numberOfLines={2}>{item.dateTime}</Text>
    
    <Text style={{ color: 'green',fontSize:12,fontWeight:'600', fontFamily: Fonts.POPPINS_MEDIUM,
  }} numberOfLines={2}>{item.type}</Text>
  
  <Text style={{ color: 'green',fontSize:12,fontWeight:'600', fontFamily: Fonts.POPPINS_MEDIUM,
}} numberOfLines={2}>{item.duration}</Text>
            </View>
            
          </View>
        </View>
        )
      }} />
    </View>
  )
}

export default CallFarmerScreen