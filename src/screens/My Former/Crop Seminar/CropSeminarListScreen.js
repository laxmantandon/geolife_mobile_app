import { View, Text, FlatList, Pressable, Button } from 'react-native'
import React, { useState } from 'react'
import Card from '../../../components/Card'
import mstyle from '../../../mstyle'
import FabButton from '../../../components/FabButton'
import { AuthenicationService } from '../../../services'
import { useEffect } from 'react'

const CropSeminarScreen = ({navigation}) => {

  const [data, setdata] = useState([
    {title:'Event name', subtitle:'Event Activity', image:'smndbmns'},
  ])

  useEffect(() => {
    getData()    
  }, [])
 
  const getData = ()=>{
    req=null
    AuthenicationService.crop_seminar(req).then(response => {
      console.log(response)
      if (response?.status== true) {
        setdata(response?.data)
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
      
      ListFooterComponent={()=>{
        return(
          <Pressable onPress={()=>{navigation.navigate('CreateSeminar')}}>
            <FabButton />
          </Pressable>
        )

      }}/>

<Pressable onPress={()=>{navigation.navigate('CreateSeminar')}}>
            <FabButton />
          </Pressable>
    </View>
  )
}

export default CropSeminarScreen