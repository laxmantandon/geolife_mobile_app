import { View, Text, FlatList, Pressable, Button, BackHandler } from 'react-native'
import React, { useState } from 'react'
import Card from '../../../components/Card'
import mstyle from '../../../mstyle'
import FabButton from '../../../components/FabButton'
import { AuthenicationService } from '../../../services'
import { useEffect } from 'react'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'

const CropSeminarScreen = ({navigation}) => {

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
    req=null
    AuthenicationService.crop_seminar(req).then(r => {
      setserachingData(false)
      // // console.log(r)
      if (r?.status== true) {
        let mapped_array=[]
             
        r.data.forEach(a=> {
          let v =0
          a.details.post_activities.forEach(b=>{
            if (b.activity_status){
              v += 1
              // console.log('Persent',b)
            }
          })
          a.details.pre_activities.forEach(b=>{
            if (b.activity_status){
              v += 1
              // console.log('Persent',b)
            }
          })
          let m ={
            title:`At ${a.village}, ${a.venue}`,
            subtitle:`${a.seminar_date} - ${a.seminar_time}`,
            date:`${a.seminar_date}`,
            large_image:a?.image,
            status:'Active',
            percent: `${(Math.round((v/17)*100 * 100) / 100).toFixed(2)}%`,
            crop:a
          }
          

          // search(a.details.post_activities)
          // search(a.details.pre_activities)
          // // console.log(a.details.post_activities.length + a.details.pre_activities.length)
          // // console.log(a.details.pre_activities.length)
          mapped_array.push(m)
        })
        setdata(mapped_array)
        setcrop_data(r.data)
      }else{
      }
    }).catch((e)=>{
      createIconSetFromFontello.log(e)
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
          <Pressable onPress={() => { navigation.navigate('SeminarEventDetailsScreen',{item}) }} >
          <Card item={item} />
          </Pressable>
          )
      }} 
      
    />

        <Pressable onPress={()=>{navigation.navigate('CreateSeminar')}}>
            <FabButton />
          </Pressable>
    </View>
  )
}

export default CropSeminarScreen