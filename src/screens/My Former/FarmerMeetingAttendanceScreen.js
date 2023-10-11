import { View, Text, FlatList, Pressable, Alert, ToastAndroid } from 'react-native'
import React from 'react'
import mstyle from '../../mstyle'
import { useState } from 'react'
import Card from '../../components/Card'
import Icon from 'react-native-vector-icons/Ionicons';
import { useEffect } from 'react'
import { AuthenicationService } from '../../services'
import submitReqData from '../../services/FormData'
import Buttons from '../../components/Buttons'
import activitysubmitReqData from '../../services/activityFromData'
import SearchableDropDown from 'react-native-searchable-dropdown';
import MYinputs from '../../components/MYinputs'
import { Colors } from '../../contants'

const FarmerMeetingAttendanceScreen = ({ navigation, route }) => {
  const [data, setdata] = useState([])
  const [loading, setloading] = useState(false)
  const [IsLoading, setIsLoading] = useState(false)
  const [addimage, setaddimage] = useState(false)
  const [farmerData, setfarmerData] = useState([])
  const [attendanceData, setattendanceData] = useState([])
  const [formData, setformData] = useState([    { label: 'Attendance Image', value: [], type: 'image', key: 'image', },
])



  useEffect(() => {
      // console.log('IIIIIIIIIII', route.params.item.item.data)

    serachData('')
    setloading(true)
    getData()
  }, [])

  const checkAttendnce=(name)=>{
    attendanceData.forEach(b=>{
      if(b.farmer == name){
        value=true                
      }
    })

  }

  const serachData = (text) => {
    let req = {
      "text": text
    }
    AuthenicationService.searchfarmerData(req)
      .then(x => {
        if (x.status == true) {
          let mapped_array = []
          // // console.log(x.data[0])
          x.data.forEach(a => {
            let value= false
            let attendnce=[]
            if (route.params.item.item.data.farmer_attendance){
              attendnce = route.params.item.item.data.farmer_attendance

              attendnce.forEach(b=>{
                console.log(b)
                if(b.farmer == a.name){
                  items= farmerData
                  items.push(a.name)
                  setfarmerData(items)
                  value=true                
                }
  
              })
            }
            

            mapped_array.push({ "title": `${a.first_name} ${a.last_name}`, 
            "subtitle": a.mobile_number,"call":a.mobile_number,"whatsapp":a.mobile_number,
             "checkbox": true, "value": value?value:false })
          })

          

          setdata(mapped_array)
          // console.log(mapped_array)
        } else {
        }
      })
      .catch(error => {
        // console.log(error)
      })
  }

  const getData = () => {
    setTimeout(() => {
      setloading(false)
      clearTimeout();
    }, 500)

  }

  const updateAttendance = () => {
    if (!IsLoading) {
      req = {
        name: route.params.item.item.data.name,
        is_attendance: "Yes",
        farmer_attendance: farmerData,
      }
      // console.log(req)
      if (formData[0]?.value.length > 0){
        req.images =formData[0]?.value
        req.is_attendance_image = true
      }

      setIsLoading(true);
      console.log(req)
      AuthenicationService.update_farmer_meeting(req).then(r => {
        console.log('EEEEE', r)
        setIsLoading(false);
        if (r?.status == true) {
          navigation.goBack()
          navigation.goBack()
          ToastAndroid.showWithGravityAndOffset(
            'Farmer Attendance Successfully Updated',
            ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
          );
        } else {
          ToastAndroid.showWithGravityAndOffset(
            'Oops! Something went wrong check internet connection',
            ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
          );

        }
      }).catch(e => {
        setIsLoading(false);
        // console.log(e)
      })
    }
  }


  const selectFarmer = (sf_item) => {
    if (sf_item.item.value == true) {
      // console.log(sf_item.item)
      const items = farmerData;
      items.push(sf_item.item.subtitle)
      setfarmerData(items)
    } else {
      const items = farmerData.filter((sitem) => sitem !== sf_item.item.subtitle);
      setfarmerData(items)
    }
  }


  return (
    <View style={mstyle.container}>
 <View  style={{flexDirection:'row'}}>
    <Text style={{fontSize:15,fontWeight:'bold', color:'black',paddingLeft:14}}>Select Farmer</Text>
    <Pressable onPress={()=>{ navigation.navigate('Myfarmerlist',{item:true}) }} >

    <Text style={{fontSize:15,fontWeight:'bold', color:Colors.GOOGLE_BLUE}}> or Create New Farmer </Text>
    </Pressable>
    </View>


      <SearchableDropDown
        onItemSelect={(item) => {
          // console.log(item)
          const items = farmerData;
          items.push(item)
          setfarmerData(items)
          // this.setState({ selectedItems: items });
        }}
        containerStyle={{ backgroundColor: 'white', margin: 10, marginTop: 1 }}
        onRemoveItem={(item, index) => {
          const items = farmerData.filter((sitem) => sitem.id !== item.id);
          setfarmerData(items)
        }}
        itemStyle={{
          padding: 10,
          marginTop: 2,
          backgroundColor: 'white',
          borderColor: 'silver',
          borderWidth: 1,
          borderRadius: 5,
        }}
        itemTextStyle={{ color: '#222' }}
        itemsContainerStyle={{ maxHeight: 140 }}
        items={[]}
        defaultIndex={2}
        resetValue={false}
        textInputProps={
          {
            placeholder: "Search Farmer",
            underlineColorAndroid: "transparent",
            style: {
              padding: 12,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 5,
              color: "black"
            },
            onTextChange: text => {
              serachData(text)
            }
          }
        }
        listProps={
          {
            nestedScrollEnabled: true,
          }
        }
      />
 
  <View>
    <Pressable onPress={()=>{addimage?setaddimage(false):setaddimage(true)}} >
    <Text style={{fontSize:14,fontWeight:'bold', color:'black', textAlign:'center'}}>Do you wants to add image? 
    <Text style={{ color:Colors.GOOGLE_BLUE}}> {addimage?'NO':'YES'}</Text></Text>
    </Pressable>
    {addimage?<MYinputs item={formData[0]}/>:''}
  </View>




<FlatList
        refreshing={loading}
        onRefresh={() => {
          getData()
        }}
        data={data}
        keyExtractor={(item, index) => item.key}
        renderItem={(item, index) => {
          return (
            <Pressable style={{ flex: 1, flexDirection: 'row' }}
              onPress={() => {
                item.item.value === true ? item.item.value = false : item.item.value = true
                selectFarmer(item)
                setloading(true)
                getData()
              }} >
              {/* <Icon  name={item.item.value===true ?'ios-checkmark-circle':'ellipse-outline'}
               size={22} style={{ paddingTop: 18, paddingLeft: 20, color: item.item.value===true ? 'green' : 'silver' }} /> */}
              <Card item={item} />

            </Pressable>

          )
        }} />
      <Pressable onPress={() => { updateAttendance() }} style={{ paddingBottom: 10 }}>
        <Buttons title={'Submit Attendance'} loading={IsLoading} />
      </Pressable>
    </View>
  )
}

export default FarmerMeetingAttendanceScreen