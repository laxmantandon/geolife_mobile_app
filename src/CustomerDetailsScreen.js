import { View, Text, Button } from 'react-native'
import React from 'react'

const CustomerDetailsScreen = ({ navigation, props,
    route: {
      params: { item },
    },
  }) => {

    console.log(item.item.title)
  return (
    <View>
      <Text>Customer name {item.item.title}</Text>
      <Text>Customer Mobile or id {item.item.subtitle}</Text>


      <Button title='New Order Button' />
      <Button title='Payment Entry button' />
      <Button title='Return button' />

    </View>
  )
}

export default CustomerDetailsScreen