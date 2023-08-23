import { View, Text, FlatList, Pressable, TextInput, Linking, BackHandler } from 'react-native'
import React, { useState } from 'react'
import Card from '../../components/Card'
import FabButton from '../../components/FabButton'
import mstyle from '../../mstyle'
import { Colors } from '../../contants'
import { useEffect } from 'react'
import { AuthenicationService } from '../../services'
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import MYinputs from '../../components/MYinputs'
import DateInput from '../../components/DateInput'
import moment from 'moment'
import submitReqData from '../../services/FormData'

const FarmerOrdersScreen = ({ navigation }) => {

  const [data, setdata] = useState([])
  const [serachingData, setserachingData] = useState(true)
  const [muser_info, setmuser_info] = useState([])
  const [from_date, setfrom_date] = useState({ label: 'From Date', value: new Date(), type: 'date', key: 'from_date'  })
  const [to_date, setto_date] = useState({ label: 'To Date', value:moment().add(7,'d').toDate(), type: 'date', key: 'to_date'  })


  const searchFilterFunction = (text) => {
    setserachingData(true)
    mj=submitReqData([from_date, to_date])
    let req = {
      "text": text,
      "from_date":moment(mj.from_date).format('yyyy-MM-DD'),
      "to_date":moment(mj.to_date).format('yyyy-MM-DD')
    }
    // console.log(req)
    AsyncStorage.getItem("user_info").then((value) => {
      const user_info =JSON.parse(value)
      setmuser_info(user_info)
      if(user_info.user_role =='Dealer'){
        AuthenicationService.searchdealerfarmerOrdersData(req)
        .then(x => {
          // console.log(x)

          setserachingData(false)
          // console.log(x.data)
          if (x.status == true) {
            let mapped_array = []
            x.data.forEach(a => {
              mapped_array.push({ "title": `${a.name}`, "subtitle":` Product kit for (${a?.crop_bundle})`, 
              "status": `(${a.docstatus==1?'Completed':a.payment_method})`, "percent":`Rs. ${a.amount}`, "date": a.posting_date,"data":a })
            })
            setdata(mapped_array)
          } else {
            setdata([])
          }
        })


      }else{
        AuthenicationService.searchfarmerOrdersData(req)
        .then(x => {
          // console.log(x)

          setserachingData(false)
          // console.log(x.data[1].image)
          if (x.status == true) {
            let mapped_array = []
            x.data.forEach(a => {
              // console.log(a.image)
              mapped_array.push({ "title": `${a.name}`, "subtitle":` Product kit for (${a?.crop_bundle})`, 
              "status": `(${a.docstatus==1?'Completed':a.payment_method})`, "percent":`Rs. ${a.amount}`, "date": a.posting_date,"data":a })
            })
            setdata(mapped_array)
          } else {
            setdata([])
          }
        })
      }


    })
   
  }


  useEffect(() => {
    // getData()
    searchFilterFunction("")    

    const interval = setInterval(() => {
      
      searchFilterFunction("")

    }, 1000);


    

    const backAction = () => {
      navigation.goBack()
      return true;

    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    

    setTimeout(() => {
      clearTimeout(interval);
    
    }, 1000);
    
        return () => {
          clearTimeout(interval);
          backHandler.remove();
          
        };

    
  }, [])
 


  return (
    <View style={mstyle.container1}>
<View style={{flexDirection:'row', paddingBottom:4}}>
  <View style={{flex:1}}>
  <DateInput item={from_date} />
  </View>
  <Text style={{color:'green', fontSize:14, fontWeight:'bold', paddingVertical:7}}>TO</Text>
  <View style={{flex:1}}>
  <DateInput item={to_date} />
  </View>
  <Pressable onPress={()=>{ searchFilterFunction('') }}>
          <Text style={{color:'white',fontWeight:'bold',fontSize: 15, borderRadius:8,backgroundColor:Colors.DEFAULT_GREEN,
          padding:9,paddingHorizontal:10,marginRight:10}}>GO</Text>
        </Pressable>
</View>

      <View style={mstyle.inputContainer}>
        <View style={mstyle.inputSubContainer}>
          <TextInput
            placeholder={'Type something'}
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            style={mstyle.inputText}
            onChangeText={text => {
              searchFilterFunction(text)
            }}
          />
        </View>
      </View>


      <FlatList
       refreshing={serachingData}
       onRefresh={()=>{
         searchFilterFunction("")
       }}
        data={data}
        renderItem={(item) => {
          return (
            <View style={{flex:1,  flexDirection:'row'}}>
            <Pressable onPress={() => { navigation.navigate('OrderDetails',{"mdata":item}) }}
              style={{flex:1,  flexDirection:'row'}}>
              <Card item={item} />
              </Pressable>
            </View>
          )
        }} />

        {muser_info.user_role==='Dealer'?(null):(
 <Pressable onPressIn={() => { navigation.navigate('FarmerProductKit', item=false) }}>
 <FabButton />
</Pressable>
        )}
     
    </View>
  )
}

export default FarmerOrdersScreen