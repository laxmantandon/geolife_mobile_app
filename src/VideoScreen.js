import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import YoutubePlayer, {YoutubeIframeRef} from "react-native-youtube-iframe";
import { useRef } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");



const VideoScreen = ({navigation,
    route: {
      params: {video},
    },
  }) => {
    const playerRef = useRef();//yotube player ka hai
    const [loading, setloading] = useState(true)
    // const [video, setvideo]=useState([])

    useEffect(() => {
      
    }, [])
    

    const onStateChange = useCallback((state) => {
        console.log("this a state", state);
    
        if (state === "ended") {
          console.log('endedeeddd')
          navigation.navigate('Home')
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
    <View pointerEvents="none" style={[styles.child, { backgroundColor: 'silver' , height:'100%'  }]}>
           
             <YoutubePlayer
                ref={playerRef}
                play={true}
                videoId={video}
                onChangeState={onStateChange}
                height={SCREEN_HEIGHT}
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
  )
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    child: { width, justifyContent: 'center' },
    text: { fontSize: width * 0.5, textAlign: 'center' },
  });
  

export default VideoScreen