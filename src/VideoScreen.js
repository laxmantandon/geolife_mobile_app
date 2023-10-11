import { View, Text, Dimensions, StyleSheet, Pressable, BackHandler, Alert } from 'react-native'
import React from 'react'
import YoutubePlayer, {YoutubeIframeRef} from "react-native-youtube-iframe";
import { useRef } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { ToastAndroid } from 'react-native';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");



const VideoScreen = ({navigation,
    route: {
      params: {item},
    },
  }) => {
    const playerRef = useRef();//yotube player ka hai
    const [loading, setloading] = useState(true)

    const backButtonPressd = () => {
      // Alert.alert('Hold on!', 'Are you sure you want to exit?', [
      //   {
      //     text: 'Cancel',
      //     onPress: () => null,
      //     style: 'cancel',
      //   },
      //   { text: 'YES', onPress: () => BackHandler.exitApp() },
      // ]);
      console.log('hjj')
    }

    useEffect(() => {
      const backAction = () => {
        backButtonPressd()
        return true;
      };
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

    }, [])
    

    const onStateChange = useCallback((state) => {
        // console.log("this a state", state);
    
        if (state === "ended") {
          navigation.navigate('QuizScreen', {item:item})
          ToastAndroid.showWithGravityAndOffset(
            'Your session started',
            ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50)
        
    
        }else if(state==="playing"){
            setloading(false)
          
        }else if(state==="paused"){
         
        }else if(state==="buffering"){
          
        }else if(state==="unstarted"){
          
        }else {
          clearInterval(timer);
      }
      },
      []);
  return (
    <View>
      <View pointerEvents="none" style={[styles.child, { backgroundColor: 'silver' , height:'100%'  }]}>
           
           <YoutubePlayer
              ref={playerRef}
              play={true}
              videoId={item.youtube_video}
              onChangeState={onStateChange}
              height={'80%'}
              initialPlayerParams={{'controls':false, 'rel':0}}
              // video width -> screen height
              // width={SCREEN_HEIGHT}
              // prevent aspect ratio auto sizing
              webViewProps={{
              injectedJavaScript: `
                  var element = document.getElementsByClassName('container')[0];
                  element.style.position = 'unset';
                  element.style.paddingBottom = 'unset';
                  true;
              `,
              }}
                />
        {/* <Text style={styles.text}>{item}</Text> */}
      </View>
      <Pressable style={{padding:10}} >
        <Text>Whatsapp Share</Text>
      </Pressable>
    </View>
  )
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    child: { width, justifyContent: 'center' },
    text: { fontSize: width * 0.5, textAlign: 'center' },
  });
  

export default VideoScreen