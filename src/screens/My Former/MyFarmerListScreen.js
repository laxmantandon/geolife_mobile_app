import { View, Text, FlatList, Pressable } from 'react-native'
import React, { useState } from 'react'
import Card from '../../components/Card'
import FabButton from '../../components/FabButton'
import mstyle from '../../mstyle'

const MyFarmerListScreen = ({navigation}) => {

  const [data, setdata] = useState([
    {title:'Farmer Name', subtitle:'9685062116', avatar:'Activity'} ,
    {title:'Farmer Name1', subtitle:'9685062115', avatar:'Activity'}  ])

  return (
    <View style={mstyle.container1}>
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
<Pressable onPress={()=>{navigation.navigate('AddFarmer')}}>
<FabButton/>

</Pressable>

    
    </View>
  )
}

export default MyFarmerListScreen