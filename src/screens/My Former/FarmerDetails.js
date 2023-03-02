import { View, Text, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
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
      <Icon name={'person-circle-outline'} size={80} 
      style={{paddingTop:2,color:'silver', alignSelf:'center'}}/>
      <Text style={{fontSize:18, color:'black', textAlign:'center'}}>{item.item.title}</Text>
      <Text style={{fontSize:13, color:'gray', textAlign:'center'}}>{item.item.subtitle}</Text>

      <View style={{flexDirection:'row', paddingVertical:10,borderBottomWidth:1, borderBottomColor:'silver'}}>
        <View style={{width:'30%', marginLeft:'5%'}}>
        <Icon name={'logo-whatsapp'} size={30} style={{paddingTop:2,color:'green', alignSelf:'center'}}/>
        </View>

        <View style={{width:'30%'}}>
        <Icon name={'ios-call'} size={30} style={{paddingTop:2,color:'silver', alignSelf:'center'}}/>
        </View>

        <View style={{width:'30%', marginRight:'5%'}}>
        <Icon name={'person-circle-outline'} size={30} style={{paddingTop:2,color:'silver', alignSelf:'center'}}/>
        </View>
      
      </View>

      <FlatList
       refreshing={loading}
       onRefresh={()=>{
         getData()
       }}
        data={data}
        ListEmptyComponent ={()=>{
          return (
            <View style={{flex:1,  flexDirection:'row'}}>
              <Text style={{textAlign:'center'}}> Former data not available</Text>
            
            </View>
          )
        }}
        renderItem={(item) => {
          return (
            <View style={{flex:1,  flexDirection:'row'}}>
            <Pressable onPress={() => {
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