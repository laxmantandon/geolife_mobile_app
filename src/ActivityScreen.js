import { StyleSheet, StatusBar, Text, View, Alert, FlatList, Image, TouchableOpacity, Linking, Pressable, VirtualizedList } from 'react-native';
import React, { useState } from 'react'
import Card from '../src/components/Card'
import FabButton from './components/FabButton';
import { useEffect } from 'react';
import { AuthenicationService } from './services';
import moment from 'moment';
import DateInput from './components/DateInput';
import { Colors } from './contants';

const ActivityScreen = ({navigation}) => {
  const [data, setdata] = useState( [
    // {title:'kamehsn mdf df', image:'https://www.rallis.com/Upload/homepage/banner-lead-rallis-03.JPG', subtitle:'Subtitle'},
    // {title:'jkdh kjdfkjdff',image:'' ,subtitle:'subtitle'} 
  ])
  const [loading, setloading] = useState(true)
  const [from_date, setfrom_date] = useState({ label: 'From Date', value: new Date(), type: 'date', key: 'from_date'  })
  const [to_date, setto_date] = useState({ label: 'To Date', value: new Date(), type: 'date', key: 'to_date'  })


  useEffect(() => {
    getData()    
  }, [])
 
  const getData = ()=>{
    req={
      'from_date':moment(from_date.value).format('yyyy-MM-DD'),
      'to_date':moment(to_date.value).format('yyyy-MM-DD')
    }
    setloading(true)
    AuthenicationService.activity_list(req).then(response => {
      // console.log(response)
      setloading(false)
      if (response?.status== true) {
        
        mapped_array=[]
        response.data.forEach(a=> {
          // console.log(a,"icon")
          let m ={
            title:a.activity_name,
            subtitle:a.activity_type[0],
            // image:`https://crop.erpgeolife.com${a?.icon}`,
            date:a.creation,
            status: moment(a.creation).format('A'),
            percent: moment(a.creation).format('hh:mm'),
            data:a
          }
          mapped_array.push(m)
        })
        setdata(mapped_array)

      }else{
      }
    })
  }
  return (
    <View style={{flex:1, backgroundColor:'white'}}>
 
 
      <View style={{flexDirection:'row', paddingTop:6}}>
  <View style={{flex:1}}>
  <DateInput item={from_date} />
  </View>
  <Text style={{color:'green', fontSize:14, fontWeight:'bold', paddingVertical:7}}>TO</Text>
  <View style={{flex:1}}>
  <DateInput item={to_date} />
  </View>
  <Pressable onPress={()=>{ getData() }}>
          <Text style={{color:'white',fontWeight:'bold',fontSize: 15, borderRadius:8,backgroundColor:Colors.DEFAULT_GREEN,
          padding:9,paddingHorizontal:10,marginRight:10}}>GO</Text>
        </Pressable>
</View>

      <FlatList
      refreshing={loading}
      onRefresh={()=>{
        getData()
      }}
      data={data}
      renderItem={(item) =>{
        return (
          <Pressable
          onPress={() => navigation.navigate('ActivityDetails',{item})}
          >
          <Card item={item} />

          </Pressable>
          )
      }} />
      <Pressable onPressIn={()=>{navigation.navigate('ActivityDetails',{item:''})}}>
          <FabButton />
      </Pressable>

     
    </View>
  )
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 10,
    backgroundColor: 'white'
  },
 
  videoContainer: {
    backgroundColor:'white',
    borderColor: 'white',
    borderWidth: 1,
    borderBottomColor: 'silver',
    padding: 7,
    // marginRight: 100,
    borderRadius: 8,
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 4,
    // width: '95%',
    // alignItems: 'flex-start',

  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    marginHorizontal: 10,
    alignItems: 'center',
    width: '55%',
  },
 
  listVideoTitle: {
    color: '#282828',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    fontWeight:'bold',
    letterSpacing: 0.1,
    // width: '100%',
  },
  titleContainer: {
    // flexDirection: 'column',
    // width: '10%',
  }
});



export default ActivityScreen