import { View, Text, FlatList, Pressable,Linking } from 'react-native'
import React, { useState } from 'react'
import Card from '../../../components/Card'
import Icon from 'react-native-vector-icons/Ionicons';


const SeminarEventDetailsScreen = ({navigation , props,
  route: {
    params: { item },
  },}) => {
    const [data, setdata] = useState([
        {title:'Pre Activities', route:'PreActivityScreen', value:item},
        {title:'Post Activities', route:'PostActivityScreen',value:item},
        {title:'Upload Photos', route:'UploadPhotosScreen', value:item},
        {title:'Free Sample Distribution List', route:'FreeSampleBeneficiaries',  value:item},
        {title:'Seminar attendance', route:'AttendanceScreen', value:item},
        // {title:'Free Sample Distribution Calling', route:'FreeSampleBeneficiaries', value:item},
        // {title:'Free Sample Distribution Update Status', route:'FreeSampleBeneficiaries', value:item},
        // {title:'Raise Crop Alert', route:'RaiseCropAlertScreen', value:item},
      ])
    const [event, setevent] = useState([{title:'Event name', subtitle:'Event Activity', image:'smndbmns'}])

    console.log(item.item.crop.details)
   if(item){
    event[0].title= item.item.title
    event[0].subtitle=item.item.subtitle
    event[0].image=item.item.image
    event[0].name=item.item.name

    event[0].date= item.item.date
    event[0].large_image=item.item.large_image
    event[0].status=item.item.status
    event[0].percent=item.item.percent

    data[0].value = item
    data[1].value = item
   
   }
    
      return (
        <View style={{flex:1, backgroundColor:'white'}}>
          <FlatList
          data={event}
          renderItem={(item) =>{
            return (
              <Pressable onPress={() => { Linking.openURL(`tel:${event[0].subtitle}`) }} style={{ flexDirection:'row'}} >
              <Card item={item} />
              {/* <Icon onPress={() => { Linking.openURL(`tel:${event[0].subtitle}`) }}
              name={'ios-call'} size={22} color='black' style={{paddingTop:15,paddingRight:20,color:'black'}}/> */}
              
    
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
                       navigation.navigate(item.item.route, item)
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