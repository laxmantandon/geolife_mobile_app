import { View, Text, FlatList, Pressable, Alert, BackHandler, Image, ToastAndroid, Touchable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import mstyle from '../../mstyle'
import Card from '../../components/Card'
import Icon from 'react-native-vector-icons/Ionicons';
import { useEffect } from 'react';
import { AuthenicationService } from '../../services';
import { Button } from 'react-native-paper';
import { Colors, Fonts } from '../../contants';
import { colors } from 'react-native-gifted-charts/src/PieChart/colors';
import { ScrollView } from 'react-native-gesture-handler';
import CameraPermission from '../../services/permissionservices'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Modal } from 'react-native';
import { TextInput } from 'react-native';
import Buttons from '../../components/Buttons';
import Geolocation from '@react-native-community/geolocation';

const MyDealersScreen = ({ navigation }) => {
  const [data, setdata] = useState([
    { title: 'Orders', value: '0', route: 'FarmerOrdersScreen', icon: 'cart-outline', color: 'red' },
    { title: 'Payments', value: geoMitradata, route: 'DealerPaymentScreen', icon: 'wallet-outline', color: 'green' },
    // {title:'Geo Mitra', value:'0',route:'FarmerOrdersScreen'},
  ])
  const [IsLoadingData, setIsLoadingData] = useState(false)
  const [geoMitradata, setgeoMitradata] = useState([])
  const [receiveable_amount, setreceiveable_amount] = useState(0)
  const [captureimage, setcaptureimage] = useState("")
  const [loggedIn, setloggedIn] = React.useState(false)
  const [user, setuser] = React.useState([])
  const [qrcode, setqrcode] = useState('')
  const [userData, setuserData] = useState()
  const [modaldealerVisible, setmodaldealerVisible] = useState(false)
  const [notes, setnotes] = useState('')
  const [paid_captureimage, setpaid_captureimage] = useState('')
  const [IsLoading, setIsLoading] = useState(false)
  const [amount, setamount] = useState(0)

  




  const startCamera = (cap_type) => {
    CameraPermission()
    let options = {
      includeBase64: true,
      mediaType: 'photo',
      saveToPhotos: true,
      quality: 0.3
    };

    if (cap_type=='paid'){
      launchCamera(options, (response) => {
        if (response.didCancel) {
        } else if (response.error) {
        } else if (response.customButton) {
          alert(response.customButton);
        } else {
          const basse64image = 'data:image/jpeg;base64,' + JSON.stringify(response?.assets[0].base64)
          setpaid_captureimage("")
          setpaid_captureimage(basse64image)
        }
      });
    }else{
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
        alert(response.customButton);
      } else {
        const basse64image = 'data:image/jpeg;base64,' + JSON.stringify(response?.assets[0].base64)
        setcaptureimage("")
        setcaptureimage(basse64image)
      }

  
    });
  }

  }

  const backButtonPressd = () => {
    Alert.alert('Hold on!', 'Are you sure you want to exit?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      { text: 'YES', onPress: () => BackHandler.exitApp() },
    ]);
  }

const [geomitra, setgeomitra] = useState({})
  const collect_Amount = (item) => {
setgeomitra(item)
if (item?.percent >0){
    Alert.alert('Collect Amount', `Are you sure you want to collect amount from ${item.title}`, [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      { text: 'YES', onPress: () => {setmodaldealerVisible(true)} },
    ]);
  }else{
    Alert.alert('Error !','No receiveable amount find found dgo')
  }


  }

  const LogoutDealer = () => {
    Alert.alert('Hold on!', 'Are you sure you want to logout this account?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'Logout', onPress: () => {
          AsyncStorage.clear()
          navigation.navigate('Login')
        }
      },
    ]);
  }

  useEffect(() => {
    getGeomitraData()
    navigation.getState().routes[0].name
    const backAction = () => {
      backButtonPressd()
      return true;
    };


    AsyncStorage.getItem("user_info").then((value) => {
      setloggedIn(true)
      const usrd = JSON.parse(value)
      // console.log('user data', usrd)
      if (usrd) {
        setuser(usrd)
        setqrcode(usrd["dealer_data"][0].qr_code)
      } else {
        navigation.navigate('Login')
      }
    })


    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [])

  const getGeomitraData = () => {
    setIsLoadingData(true)
    let req = ''
    AuthenicationService.searchgeomitraData(req)
      .then(x => {
        setIsLoadingData(false)
        // console.log(x)
        if (x.status == true) {
          let mapped_array = []
          let total_amount = 0
          setqrcode(x.qr_code)
          let geo_mitra = []
          x.data.forEach(a => {
            total_amount = total_amount + a.geo_mitra_cash
            // console.log(total_amount)
            geo_mitra.push(a.geo_mitra_name)
            mapped_array.push({ "title": `${a.geo_mitra_name}`, "subtitle": `Geo Mitra :- ${a.geo_mitra}`, "name": a.geo_mitra, "status": 'Amount in rs', "percent": a.geo_mitra_cash })
          })

          setreceiveable_amount(total_amount)
          mapped_array.sort((a, b) => { return b.percent - a.percent; })
          setgeoMitradata(mapped_array)
          // setgeoMitradata([])

        } else {
          setgeoMitradata([])
        }
      })
  }

  const UploadImage = () => {
    setIsLoadingData(true)
    if (!captureimage) {
      Alert.alert("Upload Your Qr Code")
      return
    }
    let req = {
      "doctype": "Dealer",
      "name": user?.name,
      "image": captureimage
    }
    // console.log(req)
    AuthenicationService.uploadImage(req)
      .then(x => {
        setIsLoadingData(false)
        if (x.status == true) {
          setqrcode(x.qr_code)
          ToastAndroid.showWithGravityAndOffset(
            'Qr Code Submited Successfully',
            ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
          );

        } else {
        }
      })
  }


  const Add_payment = () => {
    if (IsLoading == false) {
      
      req = {
        geo_mitra: geomitra.name,
        amount: geomitra?.percent,
        image : paid_captureimage,
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
          getGeomitraData()
          setgeomitra('') 
          setpaid_captureimage('')
          setnotes('')
          setmodaldealerVisible(false)
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
        console.log(e)
        setIsLoading(false)
        ToastAndroid.showWithGravityAndOffset(
          'No internet connection',
          ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
        );
      })
    }
  }




  return (
    <ScrollView style={[mstyle.container1]}>


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
                                  <Text style={{ color: 'black', fontSize: 15, paddingHorizontal: 5 }}>
                                     {geomitra?.percent} </Text>
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
                              paid_captureimage ? (
                              <Image style={{ width: 80, height: 100, marginTop: 10, backgroundColor: 'silver' }} 
                              source={{ uri: paid_captureimage }} />
                              ) : ('')
                            }
                            <Pressable onPress={() => startCamera('paid')} style={{ width: '100%', height: 40, marginTop: 15, backgroundColor: Colors.LIGHT_GREEN, borderRadius: 50 }} >
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


      {/* <View style={{paddingBottom:10}}>
        <Text style={{textAlign:'center',color:'green', fontSize:28, fontWeight:'bold'}}>Rs. {receiveable_amount}</Text>
        <Text style={{textAlign:'center', color:'black',fontSize:14}}>Total Receiveable Amount</Text>
      </View> */}

      <FlatList
        ListHeaderComponent={() => {
          return (

            <View >
              <View style={[mstyle.detailContainer, { backgroundColor: Colors.LIGHT_GREEN, paddingHorizontal: 15, paddingVertical: 25, borderRadius: 10 }]}>
                <Pressable onPress={() => { navigation.navigate("DealerProfile"),{item:qrcode} }} style={[mstyle.titleContainer, { width: '85%' }]}>
                  <Text style={mstyle.listListTitle} numberOfLines={1}>
                    {user.first_name} {user.last_name}
                  </Text>
                  <Text style={{
                    color: 'gray', fontSize: 12, fontWeight: '600', fontFamily: Fonts.POPPINS_MEDIUM,
                  }} numberOfLines={2}>{user.mobile_no}</Text>

                  <View style={{flexDirection:'row'}}>
                  <Pressable onPress={() => {
                    getGeomitraData()
                  }} >

                    <Icon name='refresh' size={25}
                      style={{
                        textAlign: 'center', color: 'green', backgroundColor: Colors.SECONDARY_WHITE,
                        paddingHorizontal: 2, paddingVertical: 2, borderRadius: 50, margin:5
                      }}
                       />
                   
                  </Pressable>
 
                  <Text onPress={() => {  }} style={{
                    color: 'navy', fontSize: 13, fontWeight: '700', fontFamily: Fonts.POPPINS_MEDIUM,
                  }} numberOfLines={1}>Receiveable Amount <Text style={{ fontSize: 25, color: 'green', fontWeight: 'bold' }}> 
                  {receiveable_amount} </Text> Rs.

                  </Text>
                  </View>
                  
                </Pressable>
                <View style={{ width: '15%' }}>
                  <Pressable title='Check Out' onPress={() => {
                    LogoutDealer()
                  }} >

                    <Icon name='power' size={25}

                      style={{
                        textAlign: 'center', color: 'red', backgroundColor: Colors.LIGHT_RED,
                        paddingHorizontal: 10, paddingVertical: 10, borderRadius: 50
                      }} />
                    {/* <Text>Check out user</Text> */}
                  </Pressable>


                </View>



              </View>
              {qrcode ? (
                <TouchableOpacity onPress={()=>{
                  navigation.navigate('ViewImageScreen',{"large_image":`https://crop.erpgeolife.com${qrcode?.replace('/private','')}`})

                }}>
                  <Image style={{
                    alignSelf: 'center', borderRadius: 5,
                    width: '100%',
                    height: 350,
                    marginTop: 1,
                    backgroundColor: 'silver'
                  }} source={{ uri: `https://crop.erpgeolife.com${qrcode?.replace('/private','')}` }} />

                </TouchableOpacity>
              ) : (
                <View style={{ marginHorizontal: 10, backgroundColor: Colors.LIGHT_RED, borderRadius: 10 }} >
                  {/* <Image source={require('../../assets/images/qrscan.gif')} style={{width:'100%',height:250}}/> */}
                  {
                    captureimage ? (
                      <View>
                        <TouchableOpacity  onPress={()=>{
                          navigation.navigate('ViewImageScreen',{"large_image":captureimage})
                        }}>

                        
                          <Image style={{
                            alignSelf: 'center', borderRadius: 5,
                            width: '100%',
                            height: 300,
                            marginTop: 1,
                            backgroundColor: 'silver'
                          }} source={{ uri: captureimage }} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                          <Pressable style={{
                            flexDirection: 'row', padding: 10, backgroundColor: 'red',
                            borderRadius: 10, marginTop: 10, marginHorizontal: 5
                          }}

                            onPress={() => {
                              setcaptureimage('')
                            }}

                          >
                            <Icon name='trash-outline' size={18} style={{ color: 'white' }} />
                            <Text style={{ color: 'white', textAlign: 'center' }}>Remove Image</Text>
                          </Pressable>
                          <Pressable
                            onPress={() => {
                              UploadImage()
                            }}
                            style={{
                              flexDirection: 'row', padding: 10, backgroundColor: 'green', borderRadius: 10,
                              marginTop: 10, marginHorizontal: 5
                            }}>
                            <Icon name='cloud-upload-outline' size={18} style={{ color: 'white', paddingRight: 5 }} />

                            <Text style={{ color: 'white', textAlign: 'center' }}>Upload Image</Text>
                          </Pressable>
                        </View>
                      </View>
                    ) : (

                      <View>
                        <Image source={require('../../assets/images/qrscan.gif')} style={{ width: '100%', height: 250, borderRadius: 10 }} />
                        <Pressable
                          onPress={() => startCamera()} style={{
                            alignSelf: 'center', flexDirection: 'row', width: 40, height: 40, marginVertical: 10,
                            backgroundColor: 'white', borderRadius: 50
                          }} >
                          <Icon name='camera' size={30} style={{
                            alignSelf: 'center', backgroundColor: Colors.LIGHT_GREEN,
                            color: 'green', borderRadius: 50, padding: 5
                          }} />
                        </Pressable>
                      </View>

                    )
                  }

                  {/* {
            captureimage ? (
              <View>
                <Image style={{
                  alignSelf: 'center', borderRadius: 5,
                  width: 80,
                  height: 100,
                  marginTop: 1,
                  backgroundColor: 'silver'
                }} source={{ uri: captureimage }} />

                <Pressable style={{ padding: 10, backgroundColor: 'gray', borderRadius: 10, marginTop: 10, marginHorizontal: 45 }}>
                  <Text style={{ color: 'white', textAlign: 'center' }}>Submit</Text>
                </Pressable>
              </View>
            ) : ('')
          } */}
                  <View style={{ paddingVertical: 5 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black', textAlign: 'center', paddingVertical: 1, paddingHorizontal: 10 }}>
                      Please upload your UPI QR CODE</Text>
                    <Text style={{ fontSize: 14, color: 'black', textAlign: 'center', paddingVertical: 1, paddingHorizontal: 10 }}>
                      For Receive Online Payment We Need Your UPI QRCode</Text>
                  </View>


                </View>
              )}
            </View>

          )
        }}
        refreshing={IsLoadingData}
        onRefresh={() => {
          getGeomitraData()
        }}
        numColumns={2}
        style={{ flex: 1, marginTop: 5, marginBottom: 50 }}
        data={data}
        contentContainerStyle={{ flex: 1 }}
        renderItem={(item) => {
          return (
            <Pressable style={{ flex: 1, paddingTop:5}} onPress={() => { navigation.navigate(item.item.route), { "item": geoMitradata } }}>
              <View
                style={mstyle.ListContainer} >
                <Icon name={item.item.icon} size={25} style={{ paddingTop: 5, paddingLeft: 20, color: item.item.color }} />
                <View style={mstyle.detailContainer}>
                  <View style={mstyle.titleContainer}>
                    <Text style={mstyle.listListTitle} numberOfLines={1}>
                      {item.item.title}
                    </Text>
                  </View>

                </View>
              </View>
            </Pressable>
          )
        }}

        ListFooterComponent={() => {
          return (
            <View>
              <Text style={mstyle.title}>Geo Mitra List</Text>
              <FlatList
                data={geoMitradata}
                contentContainerStyle={{ flex: 1 }}
                renderItem={(item) => {
                  return (
                    <View style={[mstyle.ListContainer]} >
                      <View style={mstyle.detailContainer}>
                        <View style={mstyle.titleContainer}>
                          <Text style={mstyle.listListTitle} numberOfLines={1}>
                            {item.item.title}
                          </Text>
                          <Text style={mstyle.content} numberOfLines={1}>{item.item.subtitle}
                          </Text>
                        </View>

                      </View>
                      <Pressable 
                      onPressIn={()=>{
                        collect_Amount(item.item)
                      }}
                      style={{ backgroundColor: '#f0f8fe', borderTopRightRadius: 8, borderBottomRightRadius: 8, marginLeft: 'auto' }} >
                        <View style={{ padding: 10 }}>
                          <Text style={{ color: 'green', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>{item.item.percent}</Text>
                          <Text style={{ color: 'green', fontWeight: '600', fontSize: 12, textAlign: 'center' }}>Receiveable Amount</Text>
                        </View>
                      </Pressable>

                      
                    </View>
                  )
                }}

                ListEmptyComponent={() => {
                  return (
                    <View style={{ paddingVertical: 40 }}>
                      <Text style={{ textAlign: 'center' }}>
                        <Icon size={100} name='refresh-circle-outline' color={colors.LIGHT_GREEN} style={{ color: colors.LIGHT_GREEN }} />

                      </Text>
                      <Text style={{ textAlign: 'center', color: 'gray', fontSize: 15 }}>
                        No Data Please Refresh
                      </Text>
                      {/* <Image source={require('../../assets/images/nodata.jpg')} style={{width:'100%'}}/> */}
                      <Button onPress={() => { getGeomitraData() }}
                        labelStyle={{ color: 'green', fontWeight: 'bold', fontSize: 15 }}
                        contentStyle={{ backgroundColor: Colors.LIGHT_GREEN, }}>Refresh</Button>
                    </View>
                  )
                }}


              />

            </View>
          )
        }}
      />

    </ScrollView>
  )
}

export default MyDealersScreen