import { View, Text, FlatList, Pressable, Alert, BackHandler, Image, ToastAndroid } from 'react-native'
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





  const startCamera = () => {
    CameraPermission()
    let options = {
      includeBase64: true,
      mediaType: 'photo',
      saveToPhotos: true,
      quality: 0.3
    };
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
            mapped_array.push({ "title": `${a.geo_mitra_name}`, "subtitle": `Geo Mitra :- ${a.geo_mitra}`, "status": 'Amount in rs', "percent": a.geo_mitra_cash })
          })

          setreceiveable_amount(total_amount)
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




  return (
    <View style={[mstyle.container1]}>


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
                  <Text onPress={() => {  }} style={{
                    color: 'navy', fontSize: 15, fontWeight: '700', fontFamily: Fonts.POPPINS_MEDIUM,
                  }} numberOfLines={1}>Receiveable Amount <Text style={{ fontSize: 25, color: 'green', fontWeight: 'bold' }}> 
                  {receiveable_amount} </Text> Rs.

                  </Text>
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
                <View>
                  <Image style={{
                    alignSelf: 'center', borderRadius: 5,
                    width: '100%',
                    height: 350,
                    marginTop: 1,
                    backgroundColor: 'silver'
                  }} source={{ uri: `https://crop.erpgeolife.com${qrcode?.replace('/private','')}` }} />

                </View>
              ) : (
                <View style={{ marginHorizontal: 10, backgroundColor: Colors.LIGHT_RED, borderRadius: 10 }}>
                  {/* <Image source={require('../../assets/images/qrscan.gif')} style={{width:'100%',height:250}}/> */}
                  {
                    captureimage ? (
                      <View>
                        <Image style={{
                          alignSelf: 'center', borderRadius: 5,
                          width: '100%',
                          height: 300,
                          marginTop: 1,
                          backgroundColor: 'silver'
                        }} source={{ uri: captureimage }} />
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
            <Pressable style={{ flex: 1, }} onPress={() => { navigation.navigate(item.item.route), { "item": geoMitradata } }}>
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
                      <View style={{ backgroundColor: '#f0f8fe', borderTopRightRadius: 8, borderBottomRightRadius: 8, marginLeft: 'auto' }} >
                        <View style={{ padding: 10 }}>
                          <Text style={{ color: 'green', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>{item.item.percent}</Text>
                          <Text style={{ color: 'green', fontWeight: '600', fontSize: 12, textAlign: 'center' }}>Receiveable Amount</Text>
                        </View>
                      </View>

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

    </View>
  )
}

export default MyDealersScreen