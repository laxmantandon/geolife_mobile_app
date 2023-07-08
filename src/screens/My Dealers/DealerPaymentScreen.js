import { View, Text, FlatList, Pressable, TextInput,Image, ToastAndroid, Alert, Modal, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Card from '../../components/Card'
import mstyle from '../../mstyle'
import { Colors } from '../../contants'
import { useEffect } from 'react'
import { AuthenicationService } from '../../services'
import Icon from 'react-native-vector-icons/Ionicons';
import CameraPermission from '../../services/permissionservices'
import { launchCamera } from 'react-native-image-picker'
import MYinputs from '../../components/MYinputs'
import { Button } from 'react-native-share'
import Buttons from '../../components/Buttons'
import DateInput from '../../components/DateInput'
import moment from 'moment'
import submitReqData from '../../services/FormData'
import Geolocation from '@react-native-community/geolocation';


const DealerPaymentScreen = ({navigation,})  => {

  const [data, setdata] = useState([])
  const [captureimage, setsetcaptureimage] = useState("")
  const [modalVisible, setModalVisible] = useState(false)
  const [modaldealerVisible, setmodaldealerVisible] = useState(false)
  const [searchText, setsearchText] = useState('')
  const [dgoName, setdgoName] = useState('')
  const [amount, setamount] = useState('')
  const [notes, setnotes] = useState('')
  const [IsLoading, setIsLoading] = useState(false)

  const [from_date, setfrom_date] = useState({ label: 'From Date', value: new Date(), type: 'date', key: 'from_date'  })
  const [to_date, setto_date] = useState({ label: 'To Date', value:moment().add(7,'d').toDate(), type: 'date', key: 'to_date'})
  const [geomitra, setgeomitra] = useState({ label: 'Select Geo Mitra', value: '', type: 'select', key: 'geomitra', options:geomitraoptions })
  const [geoMitradata, setgeoMitradata] = useState([])
  const [geomitraoptions, setgeomitraoptions] = useState([])
  const [IsLoadingData, setIsLoadingData] = useState(false)
  const [upiamt, setupiamt] = useState(0.00)
  const [cashamt, setcashamt] = useState(0.00)



  const searchFilterFunction = (text) => {
    mj = submitReqData([from_date, to_date])
    setIsLoadingData(true)
    let req = {
      "text": text,
      "from_date":moment(mj.from_date).format('yyyy-MM-DD'),
      "to_date":moment(mj.to_date).format('yyyy-MM-DD')
    }
    // console.log(text)
    AuthenicationService.searchdealerPaymentData(req)
      .then(x => {
        // console.log(x)
        if (x.status == true) {
          let mapped_array = []
          let upi = 0
          let cash = 0
          x.data.forEach(a => {
            if(a.payment_method === 'Cash'){
              cash = cash + a.amount
            }else{
              upi = upi + a.amount
            }
            // console.log(a)
            mapped_array.push({ "title": `${a.payment_method} :- ${a.name}`, "name": a.free_sample_name, "subtitle": `Dealer :- ${a.dealer}`, "date": a.posting_date, "status": 'Amount in rs', "percent": a.amount })
          })
          setupiamt(upi)
          setcashamt(cash)
          setdata(mapped_array)
          setIsLoadingData(false)

        } else {
          setdata([])
          setIsLoadingData(false)

        }
      })
  }


  useEffect(() => {
    searchFilterFunction("")
    // if (item){
    //   console.log(item)
    // }
    getGeomitraData()
  }, [])

  const startCamera = () => {

    CameraPermission()
    let options = {
      includeBase64: true,
      mediaType: 'photo',
      saveToPhotos: true,
      quality: 0.3


    };

    launchCamera(options, (response) => {
      
      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        // const source = { uri: response.uri };
        // // console.log('response', JSON.stringify(response.assets[0].base64));
        const basse64image = 'data:image/jpeg;base64,' + JSON.stringify(response?.assets[0].base64)
        setsetcaptureimage("")
        setsetcaptureimage(basse64image)
      }
    });

  }

  const Add_payment = () => {
    if (IsLoading == false) {
      
      req = {
        geo_mitra: geoMitradata[geomitra?.index].geo_mitra,
        amount: geoMitradata[geomitra?.index]?.percent,
        image : captureimage,
        notes:notes,
        mylocation:""
      }
      Geolocation.getCurrentPosition(info =>{
        // // console.log('Location hai', info.coords.longitude,info.coords.latitude)
          req.mylocation = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"point_type":"circlemarker","radius":10},
          "geometry":{"type":"Point","coordinates":[info.coords.longitude,info.coords.latitude]}}]}
      })
      // console.log(req)

      if (!req.geo_mitra) {
        alert('Please enter Geomitra name')
        return
      }
      if (!req.amount) {
        alert('No receiveable amount')
        return
      }
      setIsLoading(true)
      AuthenicationService.Add_payment_cash_entry(req).then(x => {
        setIsLoading(false)
        // console.log(x)
        if (x.status) {
          setdgoName('')
          setamount('')
          setModalVisible(false)
          ToastAndroid.showWithGravityAndOffset(
            x.message,
            ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
          );
        } else {
          ToastAndroid.showWithGravityAndOffset(
            'Please Try Again',
            ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
          );

        }

      }).catch(e => {
        setIsLoading(false)
        ToastAndroid.showWithGravityAndOffset(
          'No internet connection',
          ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
        );
      })
    }
  }

  const getGeomitraData=()=>{
    let req=''
    AuthenicationService.searchgeomitraData(req)
    .then(x => {
      // console.log(x)
      if (x.status == true) {
        let mapped_array = []
        let mapped_array2 = []
        x.data.forEach(a => {
          mapped_array2.push(a.geo_mitra_name)
          // console.log(a.geo_mitra_name)
          mapped_array.push({ "title": `${a.geo_mitra_name}`, "subtitle": `Geo Mitra :- ${a.geo_mitra}`,  "geo_mitra": a.geo_mitra, "status": 'Amount in rs', "percent": a.geo_mitra_cash })
        })
        setgeoMitradata(mapped_array)
        setgeomitraoptions(mapped_array2)
        geomitra.options = mapped_array2
        // console.log('mapped array',geomitra)
        setIsLoadingData(false)

      } else {
        setgeoMitradata([])
        setIsLoadingData(false)

      }
    })
  }
  

  return (
    <View style={mstyle.container1}>

      <View style={{ flexDirection: 'row', paddingBottom: 4 }}>
        <View style={{ flex: 1 }}>
          <DateInput item={from_date} />
        </View>
        <Text style={{ color: 'green', fontSize: 14, fontWeight: 'bold', paddingVertical: 7 }}>TO</Text>
        <View style={{ flex: 1 }}>
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
              setsearchText(text)
              searchFilterFunction(text)
            }}
          />
        </View>
      </View>

      <View>
        <Pressable onPress={() => {
          setModalVisible(true)
          // getGeomitraData()
        }} >
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black', textAlign: 'center', paddingVertical: 10 }}>
            Do you wants to add new payment?
            <Text style={{ color: Colors.GOOGLE_BLUE }}> YES</Text></Text>
        </Pressable>
      </View>
      <View style={{flexDirection:'row', alignSelf:'center'}}>
      <View style={{padding:7, backgroundColor:Colors.LIGHT_GREEN, borderRadius:50,marginEnd:10}}>
        <Text style={{color:'black'}}>Cash :- <Text style={{color:Colors.DEFAULT_GREEN}}>{cashamt} </Text> </Text>
      </View>
      <View style={{padding:7, backgroundColor:Colors.LIGHT_GREEN, borderRadius:50}}>
        <Text style={{color:'black'}}>UPI :- <Text style={{color:Colors.DEFAULT_GREEN}}>{upiamt} </Text> </Text>
      </View>
      </View>

      <Modal
        animationType="slide"
        // transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={{ padding: 10, margin: 10, backgroundColor: 'white' }}>
          <Text style={{ textAlign: 'right', fontSize: 15, color: 'red', fontWeight: '700' }} onPress={() => { setModalVisible(false) }}>Close</Text>
          <Text style={{ fontSize: 25, fontWeight: '600', color: 'black' }}>Create New Payment Entry</Text>

          {/* <View style={[mstyle.inputContainer1, { marginTop: 8 }]}>
            <Text style={{ color: 'black', marginHorizontal: 8, fontSize: 15 }}>
              Geo Mitra
            </Text>
            <View style={mstyle.inputContainer}>
              <View style={mstyle.inputSubContainer}>
                <TextInput
                  placeholder={'Enter Geo Mitra Number'}
                  placeholderTextColor={Colors.DEFAULT_GREY}
                  selectionColor={Colors.DEFAULT_GREY}
                  style={mstyle.inputText}
                  onChangeText={text => {
                    setdgoName(text)
                  }}
                  value={dgoName}
                />
              </View>
            </View>

          </View> */}
          <MYinputs item={geomitra} />
          <Pressable onPress={() => { setmodaldealerVisible(true) }}>
            <Buttons title={'Receive Payment'} loading={IsLoading} />
          </Pressable>

                      <Modal animationType="slide"
                    // transparent={true}
                    visible={modaldealerVisible}
                    onRequestClose={() => {
                      setmodaldealerVisible(!modaldealerVisible);
                    }}>
                      <View style={{ padding: 10, margin: 10, backgroundColor: 'white' }}>
                          <Text style={{ textAlign: 'right', fontSize: 15, color: 'red', fontWeight: '700' }} onPress={() => { setmodaldealerVisible(false) }}>Close</Text>
                          <Text style={{ fontSize: 25, fontWeight: '600', color: 'black' }}>Create New Payment Entry</Text>

                          <View style={[mstyle.inputContainer1, { marginTop: 8 }]}>
                            <Text style={{ color: 'black', marginHorizontal: 8, fontSize: 15 }}>
                              Amount in Rupees 
                            </Text>
                            <View style={[{
                              backgroundColor: Colors.DEFAULT_WHITE,
                              // paddingHorizontal: 5,
                              marginHorizontal: 8,
                              borderRadius: 4,
                              borderWidth: 0.5,
                              borderColor: 'gray',
                              justifyContent: 'center', marginTop: 8
                            }]}>
                              <View style={[mstyle.inputSubContainer, { backgroundColor: 'silver' }]}>
                                <View
                                  style={{
                                    fontSize: 14,
                                    backgroundColor: 'silver',
                                    textAlignVertical: 'center',
                                    paddingVertical: 10,
                                    width: '100%',
                                    // height: Display.setHeight(6),
                                    color: Colors.DEFAULT_BLACK,
                                    flex: 1,
                                  }} >
                                  <Text style={{ color: 'black', fontSize: 15, paddingHorizontal: 5 }}> {geoMitradata[geomitra?.index]?.percent} </Text>
                                </View>
                              </View>
                            </View>
                          </View>

                          <View style={[mstyle.inputContainer1, { marginTop: 8 }]}>
                            <Text style={{ color: 'black', marginHorizontal: 8, fontSize: 15 }}>
                              Notes
                            </Text>
                            <View style={[mstyle.inputContainer, { marginTop: 8 }]}>
                              <View style={mstyle.inputSubContainer}>
                                <TextInput
                                  placeholder={'note about payment'}
                                  placeholderTextColor={Colors.DEFAULT_GREY}
                                  selectionColor={Colors.DEFAULT_GREY}
                                  style={mstyle.inputText}
                                  multiline={true}
                                  numberOfLines={5}
                                  onChangeText={text => {
                                    setnotes(text)
                                  }}
                                  value={notes}
                                />
                              </View>
                            </View>
                          </View>

                          <View style={{ marginHorizontal: 10 }}>
                            {
                              captureimage ? (<Image style={{ width: 80, height: 100, marginTop: 10, backgroundColor: 'silver' }} source={{ uri: captureimage }} />
                              ) : ('')
                            }
                            <Pressable onPress={() => startCamera()} style={{ width: '100%', height: 40, marginTop: 15, backgroundColor: Colors.LIGHT_GREEN, borderRadius: 50 }} >
                              <Icon name='camera' size={33} style={{ alignSelf: 'center', backgroundColor: Colors.LIGHT_GREEN, color: 'green', borderRadius: 50, padding: 5 }} />
                              {/* <Image style={{ width: 50, height: 50 }}
                              source={{ uri: 'https://www.nicepng.com/png/detail/127-1276180_photo-album-icon-png-icon-logo-png-album.png' }}
                            /> */}
                                </Pressable>
                          </View>
                          <Pressable onPress={() => { Add_payment() }}>
                            <Buttons title={'Submit Payment'} loading={IsLoading} />

                          </Pressable>
                      </View>
                    </Modal>

          

        </View>
      </Modal>

      <FlatList

      refreshing={IsLoadingData}
      onRefresh={()=>{
        searchFilterFunction()
      }}

        data={data}
        renderItem={(item) => {
          return (
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <Pressable style={{ flexDirection: 'row', flex: 1 }}
                onPress={() => { }} >
                <Card item={item} />
              </Pressable>
              {/* {item.item.free_sample?( 
            <View>
              <Icon onPress={()=>{
              OpenDropDown(item.item)

            }} name={'chevron-down-outline'} 
                size={22} 
                style={{paddingTop:15,paddingRight:20,color:'gray'}}
            />
            <Text style={{paddingTop:15,paddingRight:20,color:'green',fontWeight:'bold', fontSize:12}}>
              {item.item.free_sample}
            </Text>
              </View>
            
            ):(null)} */}

            </View>
          )
        }} />
      {/* <Pressable onPress={() => { navigation.navigate('AddFarmer') }}>
        <FabButton />

      </Pressable> */}


    </View>
  )
}

export default DealerPaymentScreen