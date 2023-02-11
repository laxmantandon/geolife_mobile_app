import { View, Text, FlatList, Pressable, Button } from 'react-native'
import React, { useState } from 'react'
import Card from '../../../components/Card'
import mstyle from '../../../mstyle'
import FabButton from '../../../components/FabButton'
import { AuthenicationService } from '../../../services'
import { useEffect } from 'react'

const CropSeminarScreen = ({navigation}) => {

  const [data, setdata] = useState([
    // {title:'Event name', subtitle:'Event Activity', image:'smndbmns'},
  ])

  useEffect(() => {
    getData()    
  }, [])
 
  const getData = ()=>{
    req=null
    AuthenicationService.crop_seminar(req).then(r => {
      console.log(r)
      if (r?.status== true) {
        let mapped_array=[]
        r.data.forEach(a=> {
          let m ={
            title:`At ${a.village}, ${a.venue}`,
            subtitle:`${a.seminar_date} - ${a.seminar_time}`,
            image:a?.image,
          }
          mapped_array.push(m)
        })
        setdata(mapped_array)
      }else{
      }
    })
  }

  return (
    <View style={mstyle.container1}>
       <FlatList
      data={data}
      renderItem={(item) =>{
        return (
          <Pressable onPress={() => { navigation.navigate('SeminarEventDetailsScreen') }} >
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