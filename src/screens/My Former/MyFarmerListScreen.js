import { View, Text, FlatList, Pressable, TextInput, Linking } from 'react-native'
import React, { useState } from 'react'
import Card from '../../components/Card'
import FabButton from '../../components/FabButton'
import mstyle from '../../mstyle'
import { Colors } from '../../contants'
import { useEffect } from 'react'
import { AuthenicationService } from '../../services'
import Icon from 'react-native-vector-icons/Ionicons';
import { Modal } from 'react-native'
import MYinputs from '../../components/MYinputs'
import Buttons from '../../components/Buttons'
import submitReqData from '../../services/FormData'
import { ToastAndroid } from 'react-native'

const MyFarmerListScreen = ({ navigation }) => {

  const [data, setdata] = useState([])
  const [serachingData, setserachingData] = useState(true)

  const searchFilterFunction = (text) => {
    setserachingData(true)
    let req = {
      "text": text
    }
    // // console.log(text)
    AuthenicationService.searchfarmerData(req)
      .then(x => {
        setserachingData(false)

        if (x.status == true) {
          let mapped_array = []
          x.data.forEach(a => {
            mapped_array.push({ "title": `${a.first_name} ${a.last_name}`, "second_subtitle": `TFT app:${a.app_installed?a.app_installed:'Installed'}, Crop added : ${a.crop_added?'Yes':'No'} `,"subtitle": a.mobile_number, "call": a.mobile_number, "whatsapp": a.mobile_number })
          })
          setdata(mapped_array)
        } else {
        }
      })
  }


  useEffect(() => {
    // getData()
    searchFilterFunction("")    
  }, [])
 
  // const getData = ()=>{
  //   req=null
  //   AuthenicationService.farmerData(req).then(x => {
  //     x.text().then(m => {
  //       let y = JSON.parse(m)
  //       if (y.success == true) {
  //           let mapped_array = []
  //           y.data.forEach(a=> {
  //             mapped_array.push({"title": a.fullName, "subtitle": a.mobileNumber})
  //           })
  //           setdata(mapped_array)
  //       } else {
  //       }
  //     })
  //   })
  // }
const [FarmerShowModal, setFarmerShowModal] = useState(false)
const [newForm, setnewForm] = useState([
  { label: 'Farmer First Name', placeholder:'Ex. - Rama', key: 'first_name', value:'', keyboard:'text' },
  { label: 'Farmer Last Name', placeholder:'Ex. - Dash', key: 'last_name', value:'', keyboard:'text' },
  { label: 'Pincode', placeholder:'Ex. - 492001', key: 'pincode', value:'', keyboard:'numeric', len:6 },
  { label: 'City', placeholder:'Ex. - Pune', key: 'city', value:'', keyboard:'text' },
  { label: 'Mobile Number', placeholder:'Ex. - 9876543210', key: 'mobile_no', value:'', keyboard:'numeric', len:10 },
  { label: 'Farm In Acres', placeholder:'Ex. - 15', key: 'acre', value:'', keyboard:'numeric' },
  
])
const [IsLoading, setIsLoading] = useState(false)

const Create_Farmer = () => {
  if(IsLoading==false){
    req = submitReqData(newForm)
   if (!req.first_name) {
     alert('Please  enter farmer name')
     return
   }
   if (!req.pincode) {
     alert('Please  enter farmer pincode')
     return
   }
   if (!req.mobile_no) {
    alert('Please  enter farmer mobile number')
    return
  }
  //  console.log(req)
   setIsLoading(true)
   AuthenicationService.create_farmer(req).then(x => {
     setIsLoading(false)
     console.log(x)
     if (x.status) {
       setFarmerShowModal(false)
       ToastAndroid.showWithGravityAndOffset(
         x.message,
         ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
       );
     } else {
       ToastAndroid.showWithGravityAndOffset(
         'Farmer Not Submited Please Try Again',
         ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
       );

     }

   }).catch(e=>{
     setIsLoading(false)
     ToastAndroid.showWithGravityAndOffset(
       'No internet connection',
       ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
     );
   })
  }
 }




  return (
    <View style={mstyle.container1}>


      
<Modal
        animationType="slide"
        // transparent={true}
        visible={FarmerShowModal}
        onRequestClose={() => {
          setFarmerShowModal(!FarmerShowModal);
        }}>
        <View style={{ padding: 10,  backgroundColor: 'white' }}>
          <Text style={{ textAlign: 'right', fontSize: 15, color: 'red', fontWeight: '700' }} 
          onPress={() => { setFarmerShowModal(false) }}>X</Text>
          <Text style={{ fontSize: 20,textAlign:'center', fontWeight: '600', color: 'black' }}>Create New Farmer</Text>
          <FlatList 
          data={newForm}
          renderItem={({item})=>{
            return(
              <View>
                <MYinputs item={item} />
                </View>
            )
          }}
          ListFooterComponent={()=>{
            return(
              <Pressable onPress={() => { Create_Farmer() }}>
              <Buttons title={'Submit Farmer'} loading={IsLoading} />
            </Pressable>
            )
          }}
          />
          
         

        </View>
      </Modal>


      
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

                    <Pressable onPress={()=>{
                      setFarmerShowModal(true)
                    }} >
                      <Text style={{color:Colors.GOOGLE_BLUE,fontSize:15, fontWeight:'bold',textAlign:'center'}}>
                      <Icon name={'add-circle-outline'} size={20}  
                      style={{paddingTop:15,paddingRight:10,color:Colors.GOOGLE_BLUE,
                        fontWeight:'bold',}}/>
                        Add New Farmer</Text>
                    </Pressable>


      <FlatList
       refreshing={serachingData}
       onRefresh={()=>{
         searchFilterFunction("")
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

              {/* <Icon  onPress={() => {
                Linking.openURL(`whatsapp://send?phone=91${item.item.subtitle}`)
              }} 
              name={'logo-whatsapp'} size={25} color='green' style={{paddingTop:15,paddingRight:10,color:'green'}}/>

              <Icon onPress={() => {
                Linking.openURL(`tel:${item.item.subtitle}`)
              }}
              name={'ios-call'} size={22} color='black' style={{paddingTop:15,paddingRight:20,color:'black'}}/> */}
              
            
            </View>
          )
        }} />
      {/* <Pressable onPress={() => { navigation.navigate('AddFarmer') }}>
        <FabButton />

      </Pressable> */}


    </View>
  )
}

export default MyFarmerListScreen