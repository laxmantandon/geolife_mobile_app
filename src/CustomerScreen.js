import { View, Text, VirtualizedList, FlatList, Pressable } from 'react-native'
import React, { useState } from 'react'
import EmptyScreen from './components/EmptyScreen'
import Card from './components/Card'

const CustomerDetailsScreen =({item})=>{
    return (
        <View>
            <Text>{item.image}</Text>
            <Card item={item} />
        </View>
    )
}


const CustomerScreen = ({navigation}) => {
    const [Customer, setCustomer] = useState([
            {title:'Customer name', avatar:'https://www.rallis.com/Upload/homepage/banner-lead-rallis-03.JPG',
             subtitle:'Other Details'},

    ])
    const [Loading, setLoading] = useState(false)

    const getCustomerData =()=>{
        console.log('Customer data')
    }
  return (
    <View>
      {/* <Text>CustomerScreen</Text> */}
      <FlatList
      data={Customer}
      renderItem={(item) =>{
        return (
          <Pressable
          onPress={() => {
            // navigation.navigate('CustomerDetails')
          }}
          >
          <Card item={item} />

          </Pressable>
          )
      }} />
     
    </View>
  )
}

export default CustomerScreen