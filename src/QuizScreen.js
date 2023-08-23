import { View, StyleSheet, Pressable, FlatList, ScrollView, ToastAndroid, Alert, Modal, Animated } from 'react-native'
import React, { useEffect, useState } from 'react'
import MYinputs from './components/MYinputs';
import mstyle from './mstyle';
import Buttons from './components/Buttons';
import { AuthenicationService } from './services';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors, Fonts } from './contants';
import MultiSelect from 'react-native-checkbox-selection';
import { TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import Share from 'react-native-share';




const ModalPoup = ({ visible, children }) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};




const QuizScreen = ({ navigation, props,
  route: {
    params: { item },
  },
}) => {

  const [activity_type, setactivity_type] = useState([])
  const [formdata, setformdata] = useState([])
  const [isLoading, setisLoading] = useState(false)
  const [Loading, setLoading] = useState(false)

  useEffect(() => {
    if (item) {
      // console.log(item)
      let reqw = []
      count = 0
      item.faq.forEach(e => {
        count += 1
        reqw.push({
          "label": `${count}. ${e.qua}`, "title": e.qua, "key": e.name, "options": e.qua_options.split(/\s*,\s*/)
          , value: '', type: 'checkbox', "ans": e.ans, "gived_ans":''
        })
        // console.log(reqw[0].options)
        // reqw.push(ree)
        // // console.log(e)
      });
      setformdata(reqw)
    }

  }, [])



  const submit = () => {
    setformAns(formdata)
    if (!isLoading) {
      let points = 0
      formdata.forEach(e => {
        if (e.ans == "") {
          alert(`Please choose ${e.label} `)
          return
        }
        if (e.ans == e.value) {
          points += 10/formdata.length
        }
        // console.log(e)
        //  console.log(points)
      });
      req = {
        "points": points
      }
      // console.log(req,)
      setisLoading(true);

      AuthenicationService.submit_quiz(req).then(response => {
        setisLoading(false);
        // console.log(response)
        if (response?.status == true) {
          // setvisible(true)
          navigation.navigate('Home')

          ToastAndroid.showWithGravityAndOffset(
            response.message,
            ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50)
        } else {
          ToastAndroid.showWithGravityAndOffset(
            response?.message,
            ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
          );

        }
      }).catch(e => {
        // console.log(e)
      })

    }
  }

  getRefreshData =()=>{
    setTimeout(() => {
      // console.log(formdata)
      setLoading(false)
      
    }, 1000);
  }
  const [visible, setvisible] = useState(false)
  const [formAns, setformAns] = useState([])

  const share = () => {
    let req = {}
    // Linking.openURL(`whatsapp://send?text=${murl}%0A%0A${msg}%0A%0AImage%20Link%20:%20${mimage}`)
    const options = {
      title: "Watch This Video",
      message: `Watch this awesome video https://www.youtube.com/watch?v=${item.youtube_video} `, // Note that according to the documentation at least one of "message" or "url" fields is required
      url: item.youtube_video,
    };
    Share.open(options)
      .then((res) => {

      })
      .catch((err) => {
      });

  }

  return (
    <View style={[mstyle.container, { paddingTop: 30 }]}>
      <ModalPoup visible={visible}>
        <View style={{  }}>
        <Text style={{color:'black',fontWeight:"bold", fontSize:25,textAlign:'center'}}>Quiz Answer's</Text>

          {/* <View style={styles.header}>
            <TouchableOpacity onPress={() => {
              setvisible(false)
              navigation.navigate('Home')
            }}>
              <Icon name='close-circle-outline' style={{ color: 'red', fontWeight: 'bold' }} size={25} />
            </TouchableOpacity>
          </View> */}
        </View>

        <View style={{marginVertical:20}}>
        <FlatList
      onRefresh={()=>{getRefreshData()}}
      refreshing={Loading}
        data={formAns}
        renderItem={({ item, index }) => {
          return (
            <View style={[mstyle.inputContainer1,{marginBottom:8}]}>
              <Text style={{color:'black',fontWeight:"600", fontSize:15}}>{item.label} </Text>
              {item.value==item.ans?(<Text style={{color:'green', fontSize:14, fontWeight:"600"}}> Your Answer is Right :- {item.ans} </Text>):(
              <Text style={{color:'green', fontSize:14, fontWeight:"600"}}><Text style={{color:'red'}}>*</Text> Right Answer is :- {item.ans} </Text>
              )}      
            </View>
          )
        }} />
        </View>
       
        <TouchableOpacity onPress={() => {
              setvisible(false)
              // navigation.navigate('Home')
            }}>
        <Buttons title="Go To Home" />
            </TouchableOpacity>
      </ModalPoup>


      <Text style={{
        color: 'gray',
        textAlign: "center",
        fontSize: 25,
        borderBottomColor: 'gray',
        borderBottomWidth: .5,
        fontFamily: Fonts.POPPINS_MEDIUM,
        fontWeight: "bold",
        marginTop: 10,
        color: 'black',
        marginHorizontal: 10,
        paddingBottom: 5
      }}>Daily Session Quiz</Text>

      <FlatList
      onRefresh={()=>{getRefreshData()}}
      refreshing={Loading}
        data={formdata}
        renderItem={({ item, index }) => {
          return (
            <Pressable onPress={()=>{
              // console.log(item)

            }}>
              <MYinputs item={item} />
              {/* {item.value===''?(<Text>{item.value}</Text>):(
                <View>
                  <Text>{item.ans}</Text>
                </View>
              )} */}
            </Pressable>
          )
        }} />

      <Pressable onPress={() => { submit() }} style={{paddingVertical:10}}>
        <Buttons title={'Submit'} loading={isLoading} />
      </Pressable>

      <Pressable onPress={() => { share() }} style={{flexDirection:'row', paddingVertical:10,
      backgroundColor:Colors.LIGHT_GREEN,
      alignItems:'center',justifyContent:'center'
      }}>
        <Text style={{textAlign:'center'}}>
      <Icon name='logo-whatsapp' style={{ color: 'green', fontWeight: 'bold',textAlign:'center' }} size={25} /> </Text>
        <Text style={{ color: 'green', fontWeight: 'bold',textAlign:'center' }} >Share this video </Text>
      </Pressable>




    </View>
  )
}


const styles = StyleSheet.create({
  InputStyle: {
    padding: 20, shadowColor: 'rgba(0,0,0,0.4)',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 2,
  },

  inputbox: {
    paddingHorizontal: 10,
    paddingVertical: 15
  },
  images: {
    width: 100,
    height: 100,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
    elevation: 20,
  },
  header: {
    // width: '100%',
    height: 30,
    marginLeft:'auto',
    justifyContent: 'center',
  },

})

export default QuizScreen