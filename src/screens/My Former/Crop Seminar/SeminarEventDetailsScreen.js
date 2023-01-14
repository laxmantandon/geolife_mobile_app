import { View, Text, FlatList, Pressable } from 'react-native'
import React, { useState } from 'react'
import Card from '../../../components/Card'

const SeminarEventDetailsScreen = () => {
    const [data, setdata] = useState([
        {title:'Pre Activities', route:'Customer'},
        {title:'Post Activities', route:'Expense'},
        {title:'Upload Photos', route:'Customer'},
        {title:'Free Sample Distribution List', route:'Dayplan'},
        {title:'Free Sample Distribution WhatsApp', route:'Dayplan'},
        {title:'Free Sample Distribution Calling', route:'Dayplan'},
        {title:'Free Sample Distribution Update Status', route:'Dayplan'},
        {title:'Raise Crop Alert', route:'Dayplan'},
      ])
    const [event, setevent] = useState([{title:'Event name', subtitle:'Event Activity', image:'smndbmns'}])

    
      return (
        <View>
          <FlatList
          data={event}
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

export default SeminarEventDetailsScreen