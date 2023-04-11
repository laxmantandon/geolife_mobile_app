import { View, Text, Pressable, ToastAndroid, Image } from 'react-native'
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
import { PermissionsAndroid } from 'react-native';
import CallLogs from 'react-native-call-log';

const StartSession = ({props, navigation }) => {
  SplashScreen.hide();

  const [user, setuser] = useState([])
  const [session, setsession] = useState(Date)
  const [session_started, setsession_started] = useState(false)
  const [loading, setloading] = useState(false)

  useEffect(() => {
    getcall_Logs()
    AuthenicationService.get_users_task(null).then(r => {
    }).catch(e => {
    })

    AsyncStorage.getItem("user_info").then((value) => {
      console.log(value)
      const usrd = JSON.parse(value)
      if (usrd) {
        setuser(usrd)
      } else {
        navigation.navigate('Login')
      }
    })
    getcurrentTime()
    AsyncStorage.getItem("user_session").then((value) => {
      console.log('session', value)
      const a_session = JSON.parse(value)
      if (a_session) {
        setsession_started(true)
        setsession(a_session)
      } else {
        setsession_started(false)

      }
    })
  }, [props, useIsFocused])

  const [sessionTime, setsessionTime] = useState(0)
 
  const getcurrentTime=()=>{
   setTimeout(() => {
    let duration = moment.duration(moment(new Date()).diff(moment(session).add(1, 'second')))
    setsessionTime(duration.asHours())
    getcurrentTime()
   }, 10000);
  }

  const startMYSession = () => {
    if (!loading) {
      setloading(true)
      AsyncStorage.removeItem('user_session')
      let current_time = new Date()
      // console.log(current_time.toISOString().split('T')[0])
      // console.log(current_time.toTimeString().slice(0, 5))

      let stime = `${current_time.toISOString().split('T')[0]} ${current_time.toTimeString().slice(0, 5)}`

      let req = {
        activity_type: 'Start Day',
        activity_name: 'Start Day',
        image: '',
        notes: ''
      }

      AuthenicationService.create_activity(req).then(r => {
        console.log(r)
        setloading(false)

        if (r.status == true) {
          AsyncStorage.setItem('user_session', JSON.stringify(stime)).then(s => {
            console.log(JSON.parse(s))
            setsession_started(true)
            setsession(stime)
          })
          if(r.video){
            navigation.navigate('VideoScreen', {item:r.video})

          }else{
            navigation.navigate('Home',)

          }
          ToastAndroid.showWithGravityAndOffset(
            'Your session started',
            ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50)
        }
      })

    }

  }


  const getcall_Logs =()=>{
    try {
      const granted = PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
        {
          title: 'Call Log Example',
          message:
            'Access your call logs',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log(CallLogs);
        // let filter = {
        //   minTimestamp: 1571835032,
        //   maxTimestamp: 1571835033
        // }
        let call_logs =[]
        CallLogs.load(1).then(c=>{         
          for (let i in c) {
            if (session < c[i].dateTime){
              console.log('call logs ',c[i].dateTime)
              call_logs=c[i]
            }
          }
        })
        return call_logs
        // CallLogs.load(5).then(c => console.log(c));
      } else {
        // let filter = {
        //   minTimestamp: 6000,
        //   maxTimestamp: 1681103006147,
        //   phoneNumbers : '+91992600041'

        // }
        // console.log('Call Log permission denied');
        let call_logs =[]
        CallLogs.load(2).then(c=>{
          console.log(c[0])
          // call_logs.push(c)

          for (let i in c) {
            if (session < c[i].dateTime){
              console.log('call logs ',c[i].dateTime)
              call_logs=c[i]
            }
          }
        })
        // return call_logs

      }
    }
    catch (e) {
      // console.log(e);
    }
   
  }

  const endSession = () => {
  if (session_started){
    if (!loading) {
      setloading(true)
      AsyncStorage.removeItem('user_session')
      let req = {
        activity_type: 'End Day',
        activity_name: 'End Day',
        image: '',
        notes: '',
        calllogs:getcall_Logs()
      }
      console.log(req)
      AuthenicationService.create_activity(req).then(r => {
        console.log(r)
        setloading(false)
        if (r.status == true) {
          setsession_started(false)
          ToastAndroid.showWithGravityAndOffset(
            'Your session end',
            ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50)
        }
      }).catch(e=>{
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
      <View style={{
        justifyContent: 'center',
        alignItems: 'center', marginTop: 100
      }}>

        <Image source={require('../src/assets/images/logo.png')}
          style={{ width: 170, }}
          resizeMode="contain" />
      </View>
      <Text onPress={()=>{
        getcall_Logs()
      }} style={{ fontSize: 18, color: 'black', fontWeight: 'bold', textAlign: 'center' }}>Hello {`${user?.first_name} ${user?.last_name}`}</Text>
      <Text style={{ fontSize: 14, color: 'gray', fontWeight: '600', textAlign: 'center' }}>
        {session_started ? (`Session started from ${moment(session).format('MMMM Do YYYY, h:mm:ss a')}`) : 'Start Your Session'}
        {/* {moment(session).format('LTS')} */}
      </Text>

      <Text style={{ fontSize: 14, color: 'gray', fontWeight: '600', textAlign: 'center' }}>
        {session_started ? `Working Time ${(Math.round(sessionTime * 100) / 100).toFixed(2)} hours` : ''}
        {/* {moment(session).format('LTS')} */}
      </Text>
      
      <Pressable onPress={() => {
        if (session_started == true) {
          endSession()
        } else {
          startMYSession()
        }
      }}>
        <Buttons title={session_started == false ? 'Start Session' : 'End Session'} loading={loading} />
      </Pressable>
      {session_started == true ? (
        <Pressable onPress={() => {
          if (session_started == true) {
            navigation.navigate('Home')
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
  )
}

export default StartSession