import { View, Text, Image, FlatList } from 'react-native'
import React from 'react'
import mstyle from '../../mstyle'
import Icon from 'react-native-vector-icons/Ionicons';
import { useEffect } from 'react';
import { AuthenicationService } from '../../services'


const FarmerDetails = ({route: {
    params: { item },
  } }) => {


    const [data, setdata] = useState([])
    const [loading, setloading] = useState(true)
  
    const getData = () => {
      setloading(true)
      let req = {
        "farmer": item.item.subtitle
      }
      // console.log(text)
      AuthenicationService.farmerCropData(req)
        .then(x => {
          setloading(false)
  
          if (x.status == true) {
            let mapped_array = []
            x.data.forEach(a => {
              mapped_array.push({ "title": `${a.Crop} `, "subtitle": a.schedule })
            })
            setdata(mapped_array)
          } else {
          }
        })
    }
  
  
    useEffect(() => {
      getData()
    }, [])
   


  return (
    <View style={mstyle.container1}>
      <Icon name={'person-circle-outline'} size={100} 
      style={{paddingTop:2,color:'silver', alignSelf:'center'}}/>
      <Text style={{fontSize:18, color:'black', textAlign:'center'}}>{item.item.title}</Text>
      <Text style={{fontSize:13, color:'gray', textAlign:'center'}}>{item.item.subtitle}</Text>

      <FlatList
       refreshing={loading}
       onRefresh={()=>{
         getData()
       }}
        data={data}
        renderItem={(item) => {
          return (
            <View style={{flex:1,  flexDirection:'row'}}>
            <Pressable onPress={() => {
                navigation.navigate('FarmerDetails',{item})
              }}
              style={{flex:1,  flexDirection:'row'}}>
              <Card item={item} />
            
              </Pressable>
            </View>
          )
        }} />
    </View>
  )
}

export default FarmerDetails