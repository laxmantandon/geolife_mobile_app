import { View, StyleSheet, Pressable, FlatList, ScrollView, ToastAndroid, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import MYinputs from './components/MYinputs';
import mstyle from './mstyle';
import Buttons from './components/Buttons';
import { AuthenicationService } from './services';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Fonts } from './contants';
import MultiSelect from 'react-native-checkbox-selection';


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
      let reqw = []
      count = 0
      item.faq.forEach(e => {
        count += 1
        reqw.push({
          "label": `${count}. ${e.qua}`, "title": e.qua, "key": e.name, "options": e.qua_options.split(/\s*,\s*/)
          , value: '', type: 'select', "ans": e.ans
        })
        console.log(reqw[0].options)
        // reqw.push(ree)
        // console.log(e)
      });
      setformdata(reqw)
    }

  }, [])



  const submit = () => {
    // console.log(formdata)
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
        console.log(points)
      });
      req = {
        "points": points
      }
      setisLoading(true);

      AuthenicationService.submit_quiz(req).then(response => {
        setisLoading(false);
        console.log(response)
        if (response?.status == true) {
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
        console.log(e)
      })

    }
  }

  return (
    <View style={[mstyle.container, { paddingTop: 30 }]}>
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
        data={formdata}
        renderItem={({ item, index }) => {
          return (
            <View >

              <MYinputs item={item} />

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