import { View, StyleSheet, Pressable, FlatList, ScrollView, ToastAndroid, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import MYinputs from './components/MYinputs';
import mstyle from './mstyle';
import Buttons from './components/Buttons';
import { AuthenicationService } from './services';
import submitReqData from './services/FormData';
import { back } from 'react-native/Libraries/Animated/Easing';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Fonts } from './contants';


const QuizScreen = ({ navigation, props,
  route: {
    params: { item },
  },
}) => {
 
  const [activity_type, setactivity_type] = useState([])
  const [formdata, setformdata] = useState([])
  const [isLoading, setisLoading] = useState(false)

  useEffect(() => {
    if (item) {
        console.log(item)
        let reqw =[]
        item.faq.forEach(e => {
            let ree ={value: '',type: 'select',}
            ree.key = e.name
            ree.label = e.qua
            ree.options = e.qua_options.split(/\s*,\s*/)
          

          console.log(ree.options)
            reqw.push(ree)
            // console.log(e)
    });
    setformdata(reqw)
      }
    
  }, [])
  


  const submit = () => {
    // console.log(formdata)
    let req = submitReqData(formdata);
    setisLoading(true);

    if (req.activity_type=='' || req.activity_type==null){
      Alert.alert('Please Select Activity type ')
      setisLoading(false);
      return
    }

    if (req.activity_name=='' || req.activity_name==null){
      setisLoading(false);
      Alert.alert('Please Enter Activity Name')
      return
    }

    AuthenicationService.create_activity(req).then(response => {
      setisLoading(false);
      console.log(response)
      if (response?.status == true) {
          navigation.navigate('Home')
          ToastAndroid.showWithGravityAndOffset(
            'Your session started',
            ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50)
      } else {
        ToastAndroid.showWithGravityAndOffset(
          response?.message,
          ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
        );

      }
    }).catch(e=>{
      console.log(e)
    })

  }

  return (
    <View style={[mstyle.container,{paddingTop:100}]}>
      <FlatList
        data={formdata}
        renderItem={({ item, index }) => {
          return (
            <View style={[mstyle.inputContainer1,{marginTop:10}]}>
                <Text style={{  color: 'gray',
        // textAlign: "center",
        fontSize: 16,
        borderBottomColor:'black',
        borderBottomWidth:1,
        fontFamily: Fonts.POPPINS_MEDIUM,
        fontWeight: "bold",
        lineHeight: 16 * 1.4,
        marginTop: 10,
        color:'black',
        marginHorizontal: 10,
        paddingBottom:5
        }}>{index+1}. {item.label}</Text>
              
             <FlatList 
             data={item.options}
             renderItem={({item,index}) =>{
                <View>
                  <Pressable style={[mstyle.ListContainer,{marginTop:10}]}>
                      <Icon name={'ios-checkmark-circle' } size={22}/>
                      <Text style={mstyle.content}> {index}</Text>
                  </Pressable>
                </View>
             }}
             
             />

            </View>
          )
        }} />

      <Pressable onPress={() => { submit() }}>
        <Buttons title={'Submit'} loading={isLoading} />
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
})
export default QuizScreen