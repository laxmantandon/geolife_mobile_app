import { View, Text, FlatList, Pressable, Button, BackHandler } from 'react-native'
import React, { useState } from 'react'
import Card from '../../components/Card'
import mstyle from '../../mstyle'
import FabButton from '../../components/FabButton'
import { AuthenicationService } from '../../services'
import { useEffect } from 'react'

const FarmerMeetingListScreen = ({navigation}) => {

  const [data, setdata] = useState([
    // {title:'Event name', subtitle:'Event Activity', image:'smndbmns'},
  ])
  const [crop_data, setcrop_data] = useState([])
  const [serachingData, setserachingData] = useState(true)

  useEffect(() => {
    const backAction = () => {
      navigation.goBack()
      return true;

    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    getData() 

    return () => backHandler.remove();
     
  }, [])
 
  const getData = ()=>{
    setserachingData(true)
    req={
        'doctype':'Farmer Meeting'
    }
    AuthenicationService.GetFarmerMeeting(req).then(r => {
      setserachingData(false)
      console.log(r)
      if (r.status) {
        let mapped_array=[]
             
        r.data.forEach(a=> {
            console.log(a)
          let m ={
            title:`At ${a.agenda}`,
            subtitle:`${a.location}`,
            date:`${a.posting_date}`,
            large_image:a?.image,
            data:a
          }
          
          mapped_array.push(m)
        })
        setdata(mapped_array)
        // setcrop_data(r.data)
      }else{
      }
    }).catch((e)=>{
        console.log(e)
      setserachingData(false)
    })
  }

  const search= ( myArray)=>{
    for (let i=0; i < myArray.length; i++) {
        if (myArray[i].activity_status === 1) {
            return myArray[i];
        }
    }
}

  return (
    <View style={mstyle.container1}>
       <FlatList
        refreshing={serachingData}
        onRefresh={()=>{
          getData()
        }}
      data={data}
      renderItem={(item,index) =>{
        return (
          <Pressable onPress={() => { navigation.navigate('FarmerMeetingAttendanceScreen',item={item}) }} >
          <Card item={item} />
          </Pressable>
          )
      }} 
      
    />

        <Pressable onPress={()=>{navigation.navigate('FarmerMeetingScreen')}}>
            <FabButton />
          </Pressable>
    </View>
  )
}


export default FarmerMeetingListScreen