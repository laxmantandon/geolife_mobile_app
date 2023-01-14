import { View, Text, FlatList, Pressable } from 'react-native'
import React, { useState } from 'react'
import Card from '../../components/Card'

const MyFarmerListScreen = ({navigation}) => {

  const [data, setdata] = useState([
    {title:'Activity', route:'Activity'},{title:'Expense', route:'Expense'},{title:'Customer', route:'Customer'},{title:'Day Plan', route:'Dayplan'}
  ])

  return (
    <View>
       <FlatList
      data={data}
      renderItem={(item) =>{
        return (
          <Pressable
             onPress={() => {
               navigation.navigate(item.item.route)
             }} 
             >
          <Card item={item} />

          </Pressable>
          )
      }} />
    </View>
  )
}

export default MyFarmerListScreen