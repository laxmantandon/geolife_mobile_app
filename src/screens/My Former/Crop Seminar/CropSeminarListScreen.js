import { View, Text, FlatList, Pressable, Button } from 'react-native'
import React, { useState } from 'react'
import Card from '../../../components/Card'
import mstyle from '../../../mstyle'
import FabButton from '../../../components/FabButton'

const CropSeminarScreen = ({navigation}) => {

  const [data, setdata] = useState([
    {title:'Event name', subtitle:'Event Activity', image:'smndbmns'},
  ])

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