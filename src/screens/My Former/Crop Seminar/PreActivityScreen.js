import { View, Text, FlatList, Pressable } from 'react-native'
import React from 'react'
import mstyle from '../../../mstyle'
import { useState } from 'react'
import Card from '../../../components/Card'
import Icon from 'react-native-vector-icons/Ionicons';
import { useEffect } from 'react'

const PreActivityScreen = ({navigation ,  route: {
  params: { item },
},})  => {
  const [data1, setdata1] = useState([])
    
  // console.log(item.value[0])

  
  useEffect(() => {
    
    if(item) {
      let mapped_array = []
      item.value.forEach(i => {
        // console.log('iiiiiiii', data)
        mapped_array.push({"title": i.activity_name, "value": i.activity_status})
      })
      setdata1(mapped_array)
    }

  }, [])

// if(item){
//   for (let m in item.value[0]){
//     console.log(item.value[0][m])
//     for (let n in data){
//       if (data[n].key == m){
//         data[n].value = item.value[0][m]
//         // console.log(item.value[0][m])
//       }
//     }
//   }
//   console.log('demo data', data)
// }

  return (
    <View style={mstyle.container1}>
      <FlatList
        data={data1}
        keyExtractor={(item, index) => 'key'+index}
        renderItem={(item) => {
          return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Icon name='ios-checkmark-circle' size={22} style={{ paddingTop: 18, paddingLeft: 20, color: item?.item.value==1 ? 'green' : 'silver' }} />
              <Card item={item} />
            </View>

          )
        }}
        />
    </View>
  )
}

export default PreActivityScreen