import { View, Text, FlatList, Pressable } from 'react-native'
import React, { useState } from 'react'
import Card from '../../../components/Card'

const CropSeminarScreen = ({navigation}) => {

  const [data, setdata] = useState([
    {title:'Event name', subtitle:'Event Activity', image:'smndbmns'},
  ])

  return (
    <View>
       <FlatList
      data={data}
      renderItem={(item) =>{
        return (
          <Pressable
             onPress={() => {
               navigation.navigate('SeminarEventDetailsScreen')
             }} 
             >
          <Card item={item} />

          </Pressable>
          )
      }} />
    </View>
  )
}

export default CropSeminarScreen