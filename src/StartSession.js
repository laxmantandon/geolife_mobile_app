import { View, Text, Pressable, ToastAndroid, Image } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Buttons from './components/Buttons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import SplashScreen from 'react-native-splash-screen'
import { AuthenicationService } from './services'
import moment from 'moment';

const StartSession = ({ navigation }) => {
  SplashScreen.hide();

  const [user, setuser] = useState([])
  const [session, setsession] = useState(Date)
  const [session_started, setsession_started] = useState(false)
  const [loading, setloading] = useState(false)

  useEffect(() => {
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
  }, [])

  const startSession = () => {
    if (!loading) {
      setloading(true)
      AsyncStorage.removeItem('user_session')
      let current_time = new Date()
      console.log(current_time.toISOString().split('T')[0])
      console.log(current_time.toTimeString().slice(0, 5))

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
          })
          if(r.video){
            navigation.navigate('VideoScreen', {video:r.video})

          }else{
            navigation.navigate('VideoScreen', {video:'8T3unrIDfYA'})

          }
          ToastAndroid.showWithGravityAndOffset(
            'Your session started',
            ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50)
        }
      })

    }

  }

  const endSession = () => {
    if (!loading) {
      setloading(true)
      AsyncStorage.removeItem('user_session')
      let current_time = new Date()
      let req = {
        activity_type: 'End Day',
        activity_name: 'End Day',
        image: '',
        notes: ''
      }
      AuthenicationService.create_activity(req).then(r => {
        console.log(r)
        setloading(false)
        if (r.status == true) {
          setsession_started(false)
          ToastAndroid.showWithGravityAndOffset(
            'Your session end',
            ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50)
        }
      })
    }

  }
const end =moment().format('LT');
  return (
    <View>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center', marginTop: 100
      }}>

        <Image source={require('../src/assets/images/logo.png')}
          style={{ width: 170, }}
          resizeMode="contain" />
      </View>
      <Text style={{ fontSize: 18, color: 'black', fontWeight: 'bold', textAlign: 'center' }}>Hello {`${user?.first_name} ${user?.last_name}`}</Text>
      <Text style={{ fontSize: 14, color: 'gray', fontWeight: '600', textAlign: 'center' }}>
        {session_started ? `Session started from ${moment(session).format('MMMM Do YYYY, h:mm:ss a')}` : 'Start Your Session'}

        {/* {moment(session).format('LTS')} */}
      </Text>
      <Pressable onPress={() => {
        if (session_started == true) {
          endSession()
        } else {
          startSession()
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
          <Buttons title={"Go To Home"} loading={loading} bgcolor={'green'}/>
        </Pressable>
      ) : null}


      <Pressable onPress={()=>{
        AsyncStorage.clear()
        navigation.navigate('Login')
      }}>
        <Buttons title={'Logout'}  bgcolor={'red'}/>
      </Pressable>

    </View>
  )
}

export default StartSession