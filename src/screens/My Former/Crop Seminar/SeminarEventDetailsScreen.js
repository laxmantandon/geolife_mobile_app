import { View, Text, FlatList, Pressable } from 'react-native'
import React, { useState } from 'react'
import Card from '../../../components/Card'

const SeminarEventDetailsScreen = ({navigation}) => {
    const [data, setdata] = useState([
        {title:'Pre Activities', route:'PreActivityScreen'},
        {title:'Post Activities', route:'PostActivityScreen'},
        {title:'Upload Photos', route:'UploadPhotosScreen'},
        {title:'Free Sample Distribution List', route:'FreeSampleBeneficiaries'},
        {title:'Free Sample Distribution WhatsApp', route:'FreeSampleBeneficiaries'},
        {title:'Free Sample Distribution Calling', route:'FreeSampleBeneficiaries'},
        {title:'Free Sample Distribution Update Status', route:'FreeSampleBeneficiaries'},
        {title:'Raise Crop Alert', route:'RaiseCropAlertScreen'},
      ])
    const [event, setevent] = useState([{title:'Event name', subtitle:'Event Activity', image:'smndbmns'}])

    
      return (
        <View style={{flex:1, backgroundColor:'white'}}>
          <FlatList
          data={event}
          renderItem={(item) =>{
            return (
              <Pressable style={{padding:10,}}
                 onPress={() => {
                   navigation.navigate(item.item.route)
                 }} 
                 >
              <Card item={item} />
    
              </Pressable>
              )
          }} 
          

          ListFooterComponent={()=>{
            return(
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
            )
          }}
          
          
          />
         
        </View>
      )
    }

export default SeminarEventDetailsScreen