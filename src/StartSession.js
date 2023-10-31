import { View, Text, Pressable, ToastAndroid, Image, Alert } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Buttons from './components/Buttons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import SplashScreen from 'react-native-splash-screen'
import { AuthenicationService } from './services'
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native'
import mstyle from './mstyle'
import { StatusBar } from 'react-native';
import  MydealersScreen from './../src/screens/My Dealers/DealerPaymentScreen'
// import { PermissionsAndroid } from 'react-native';
// import CallLogs from 'react-native-call-log';
import Geolocation from '@react-native-community/geolocation';
import LocationPermission from './services/LocationPermission'
import submitReqData from './services/FormData'


const StartSession = ({props, navigation }) => {
  SplashScreen.hide();
  LocationPermission()


  const [user, setuser] = useState([])
  const [session, setsession] = useState(Date)
  const [session_started, setsession_started] = useState(false)
  const [loading, setloading] = useState(false)
  const [validsession, setvalidsession] = useState(false)

  useEffect(() => {
    // getcall_Logs()
    Checkuser()
    AuthenicationService.get_users_task(null).then(r => {
    }).catch(e => {
    })

    AsyncStorage.getItem("user_info").then((value) => {
      // console.log(value)
      const usrd = JSON.parse(value)
      if (usrd) {
        if(usrd.user_role==="Dealer"){
          // console.log('dealer')
          navigation.navigate('MydealerHome')
        }
        setuser(usrd)
      } else {
        navigation.navigate('Login')
      }
    }).catch(e=>{
      
    })
    AsyncStorage.getItem("user_session").then((value) => {
      // console.log('session', value)
      const a_session = JSON.parse(value)
      if (a_session) {
        setsession_started(true)
        setsession(a_session)
      } else {
        setsession_started(false)

      }
    })
    getcurrentTime()

  }, [props, useIsFocused])

  const [sessionTime, setsessionTimes] = useState(0)

  const Checkuser=()=>{
    if (session){
          let req = {
            activity_type: ['End Day'],
            activity_name: 'End Day',
            session:session,
            image: '',
            notes: '',
            calllogs:''
          }
          let req1=submitReqData()
          req.longitude=req1.longitude
          req.latitude=req1.latitude
          AuthenicationService.Checkuser(req).then(r => {
            console.log(r)
            setloading(false)

            if (r.status){
              setvalidsession(true)
              // navigation.navigate('Home')
              return true

            }
            if (r.status ==false){
              endSession()
              setvalidsession(false)

              return false
            }

          }).catch(e=>{
            setloading(false)
            setvalidsession(false)

            return false
          })

  }else{
    setvalidsession(false)
    return false
  }

  }
 
  const getcurrentTime=()=>{
   setTimeout(() => {
    AsyncStorage.getItem("user_session").then((value) => {
      // setsession(JSON.parse(value))
      let duration = moment.duration(moment(new Date()).diff(moment(JSON.parse(value)).add(1, 'second')))
      if (duration){
        if (duration.asHours() >15){
          endSession()
        }else{
          setsessionTimes(duration.asHours())
        }
      }
      

      // console.log(sessionTime)
    })
    getcurrentTime()
  
   }, 10000);
  }

  const startMYSession = () => {
    if (!loading) {
      setloading(true)
      AsyncStorage.removeItem('user_session')
      let current_time = new Date()
      // // console.log(current_time.toISOString().split('T')[0])
      // // console.log(current_time.toTimeString().slice(0, 5))

      let stime = `${current_time.toISOString().split('T')[0]} ${current_time.toTimeString().slice(0, 5)}`

      let req = {
        activity_type: ['Start Day'],
        activity_name: 'Start Day',
        image: '',
        notes: ''
      }
      let req1=submitReqData()
          req.longitude=req1.longitude
          req.latitude=req1.latitude

      Geolocation.getCurrentPosition(info =>{
        // // console.log('Location hai', info.coords.longitude,info.coords.latitude)
          req.mylocation = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"point_type":"circlemarker","radius":10},
          "geometry":{"type":"Point","coordinates":[info.coords.longitude,info.coords.latitude]}}]}
      })
      console.log(req)
      setloading(false)

      AuthenicationService.create_activity(req).then(r => {
        console.log(r)
        setloading(false)

        if (r.status == true) {
          AsyncStorage.setItem('user_session', JSON.stringify(stime)).then(s => {
            // console.log(JSON.parse(s))
            setsession_started(true)
            setsession(stime)
          })
          if(r.video){
            navigation.navigate('VideoScreen', {item:r.video})

          }else{
            navigation.navigate('Home')

          }
          ToastAndroid.showWithGravityAndOffset(
            'Your session started',
            ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50)
        }
      }).catch(e=>{
        setloading(false)

      })

    }

  }


  // const getcall_Logs =()=>{
  //   try {
  //     const granted = PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
  //       {
  //         title: 'Call Log Example',
  //         message:
  //           'Access your call logs',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       }
  //     )
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       // // console.log(CallLogs);
  //       // let filter = {
  //       //   minTimestamp: 1571835032,
  //       //   maxTimestamp: 1571835033
  //       // }
  //       // let call_logs =[]
  //       // CallLogs.load(1).then(c=>{         
  //       //   for (let i in c) {
  //       //     if (session < c[i].dateTime){
  //       //       // console.log('call logs ',c[i].dateTime)
  //       //       call_logs=c[i]
  //       //     }
  //       //   }
  //       // })
  //       // return call_logs
  //       // CallLogs.load(5).then(c => // console.log(c));
  //     } else {
  //       // let filter = {
  //       //   minTimestamp: 6000,
  //       //   maxTimestamp: 1681103006147,
  //       //   phoneNumbers : '+91992600041'

  //       // }
  //       // // console.log('Call Log permission denied');
  //       // let call_logs =[]
  //       // CallLogs.load(2).then(c=>{
  //         // console.log(c[0])
  //         // call_logs.push(c)

  //       //   for (let i in c) {
  //       //     if (session < c[i].dateTime){
  //       //       // console.log('call logs ',c[i].dateTime)
  //       //       call_logs=c[i]
  //       //     }
  //       //   }
  //       // }).catch(e=>{

  //       // })
  //       // return call_logs

  //     }
  //   }
  //   catch (e) {
  //     console.log(e);
  //   }
   
  // }

  const endSession = () => {
  if (session_started){
    if (!loading) {
      setloading(true)
      let call_logs =[]
      // CallLogs.load(1).then(c=>{         
      //   for (let i in c) {
      //     if (session < c[i].dateTime){
      //       // console.log('call logs ',c[i].dateTime)
      //       call_logs=c[i]
      //     }
      //   }
      // })
      AsyncStorage.removeItem('user_session')
      let req = {
        activity_type: ['End Day'],
        activity_name: 'End Day',
        session:session,
        image: '',
        notes: '',
        calllogs:call_logs
      }
      let req1=submitReqData()
          req.longitude=req1.longitude
          req.latitude=req1.latitude
      Geolocation.getCurrentPosition(info =>{
        // // console.log('Location hai', info.coords.longitude,info.coords.latitude)
          req.mylocation = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"point_type":"circlemarker","radius":10},
          "geometry":{"type":"Point","coordinates":[info.coords.longitude,info.coords.latitude]}}]}
      })
      console.log(req)
      AuthenicationService.create_activity(req).then(r => {
        // console.log(r)
        setloading(false)
        if (r.status == true) {
          setsession_started(false)
          ToastAndroid.showWithGravityAndOffset(
            'Your session end',
            ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50)

            navigation.goBack()

        }
      }).catch(e=>{
        setloading(false)

        ToastAndroid.showWithGravityAndOffset(
          'No Internet Connection',
        ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50)
      })
    }
  }

  }
const end =moment().format('LT');

const logOut=()=>{
  endSession()
  setTimeout(() => {
    AsyncStorage.clear()
    navigation.navigate('Login')

  }, 1000);
}
  return (
    <View style={mstyle.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'white'}
        translucent
      />
      {user?.user_role=='Dealer'?(<View>
        <MydealersScreen/>
      </View>) :(
     <View>
       {user?.user_role == "Geo Mitra"?(
        <View>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center', marginTop: 100
        }}>
  
          <Image source={require('../src/assets/images/logo.png')}
            style={{ width: 170, }}
            resizeMode="contain" />
        </View>
        <Text onPress={()=>{
          // getcall_Logs()
        }} style={{ fontSize: 18, color: 'black', fontWeight: 'bold', textAlign: 'center' }}>Hello {`${user?.first_name} ${user?.last_name?user?.last_name:''}`}</Text>
        <Text style={{ fontSize: 14, color: 'gray', fontWeight: '600', textAlign: 'center' }}>
          {session_started ? (`Session started from ${moment(session).format('MMMM Do YYYY, h:mm:ss a')}`) : 'Start Your Session'}
          {/* {moment(session).format('LTS')} */}
        </Text>
  
        <Text style={{ fontSize: 14, color: 'gray', fontWeight: '600', textAlign: 'center' }}>
          {session_started ? `Working Time ${sessionTime.toString().substring(0, sessionTime>=10?3:2)}${(((sessionTime.toString().substring(2, 4))*.60).toFixed(2)).toString().substring(0, 2)} hours` : ''}
          {/* {moment(session).format('LTS')} */}
        </Text>
        
        <Pressable onPress={() => {
          if (session_started == true) {
            Alert.alert('Please Confirm!', 'Are you sure you want to END Day?', [
              {
                text: 'Cancel',
                onPress: () => null,
                style: 'cancel',
              },
              { text: 'YES', onPress: () => endSession() },
            ]);
            
          } else {
            startMYSession()
          }
        }}>
          <Buttons title={session_started == false ? 'Start Day' : 'End Day'} loading={loading} />
        </Pressable>
        {session_started == true ? (
          <Pressable onPress={() => {
            Checkuser()

            if (session_started == true) {
              if(validsession){
                navigation.navigate('Home')
              }
            }
          }}>
            <Buttons title={"Go To Home"}  bgcolor={'green'}/>
          </Pressable>
        ) : null}
  
  
        <Pressable onPress={()=>{
          
          logOut()
        }}>
          <Buttons title={'Logout'} loading={loading} bgcolor={'red'}/>
        </Pressable>
        </View>
      ):('')}
      </View>
     )}
      
    </View>
  )
}

export default StartSession