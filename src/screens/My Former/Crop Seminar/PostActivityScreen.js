import { View, Text, FlatList, Pressable } from 'react-native'
import React from 'react'
import mstyle from '../../../mstyle'
import { useState } from 'react'
import Card from '../../../components/Card'
import Icon from 'react-native-vector-icons/Ionicons';
import { useEffect } from 'react'

const PostActivityScreen = ({navigation ,  route: {
  params: { item },
},})  => {
  const [data, setdata] = useState([])


  useEffect(() => {

    if(item) {
      let mapped_array = []
      item.value.forEach(i => {
        // console.log('iiiiiiii', data)
        mapped_array.push({"title": i.activity_name, "value": i.activity_status})
      })
      setdata(mapped_array)
    }
}, [])


  return (
    <View style={mstyle.container1}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.key}
        renderItem={(item) => {
          return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Icon name='ios-checkmark-circle' size={22} style={{ paddingTop: 18, paddingLeft: 20, color: item?.item.value===1 ? 'green' : 'silver' }} />
              <Card item={item} />
            </View>

          )
        }} />
    </View>
  )
}

export default PostActivityScreen