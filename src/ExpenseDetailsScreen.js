import { View, StyleSheet,  Pressable,  FlatList, ScrollView, ToastAndroid, Alert, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import MYinputs from './components/MYinputs';
import mstyle from './mstyle';
import Buttons from './components/Buttons';
import { AuthenicationService } from './services';
import submitReqData from './services/FormData';
import Card from './components/Card';


const ExpenseDetailsScreen = ({ navigation,
  route: {
    params: { item },
  },
}) => {
  const [expense_type, setexpense_type] = useState([])
  const [selected_type, setselected_type] = useState('')
  const [formdata, setformdata] = useState([
    // { label: ' Select Expense Type', key: 'expense_type', value: '', options: expense_type, type: 'select', },
    { label: 'Amount Against Expense', placeholder: '00.00', key: 'amount', value: '',  keyboard: 'numeric' },
    { label: 'Notes', placeholder: 'Enter Notes', key: 'notes', value: '', type: 'textarea' },
    { label: 'Image', value: [], type: 'image', key: 'image', },
  ])
  const [jsondata, setjsondata] = useState([])
  const [type_data, settype_data] = useState([])
  const [isLoading, setisLoading] = useState(false)



 
  if (item) {
    console.log(item)
    for (let i in formdata) {
      for (let n in item.item) {
        console.log('item value', item.item[n])
        if (formdata[i].key === n) {
          formdata[i].value = item.item[n]
        }
      }
    }
  }

  if (expense_type.length===0){
    console.log(expense_type.length)
    AuthenicationService.expense_type(req).then(res => {
      // console.log(JSON.parse(res.data[0].json))
      if (res?.status == true) {
        // setformdata(JSON.parse(res.data[0].json))
        settype_data(res.data)
        mapped_array=[]
        res.data.forEach(a=> {
          mapped_array.push({ "title": `${a.name}`, "json": `${a.json}` })
        })
        formdata[0].options =mapped_array
        console.log(mapped_array)
        setexpense_type(mapped_array)
      } else {
      }
    })

  }

  // useEffect(() => {
  //     console.log('type', formdata[0].value)
    
   
  // }, [])
  


  const submit =()=>{
    let req = submitReqData(formdata);
    req.expense_type=selected_type
      setisLoading(true);
      // console.log(re/q)
    if (req.expense_type=='' || req.expense_type==null){
      Alert.alert('Please Select Expense type ')
      setisLoading(false);
      return
    }

    if (req.amount=='' || req.amount==null){
      setisLoading(false);

      Alert.alert('Please Enter Amount')
      return
    }

    AuthenicationService.create_expenses(req).then(response => {
      setisLoading(false);
      console.log(response)
      if (response?.status== true) {
      navigation.goBack()
      ToastAndroid.showWithGravityAndOffset(
        'Expense Successfully Added',
        ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
      );
      }else{
        ToastAndroid.showWithGravityAndOffset(
      'Oops! Something went wrong check internet connection',
      ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    );
       
      }
    })

  }

  const update =()=>{
    console.log(formdata)
  }



  return (
    <View style={mstyle.container}>
        <Text style={{fontSize:20,color:'black',
        fontWeight:'bold',textAlign:"center", paddingBottom:25}}>
          {selected_type?selected_type:'Please select type of'} expenses</Text>

     {selected_type?(
      <View>
         <FlatList
        data={formdata}
        renderItem={({ item, index }) => {
          return (
            <Pressable>
              <MYinputs item={item} />
            </Pressable>
          )
        }} />

      {item.item ? (<Pressable onPress={()=>{update()}}>
        <Buttons title={'Update'} loading={isLoading}/>
      </Pressable>):(<Pressable onPress={()=>{submit()}}>
        <Buttons title={'Submit'}  loading={isLoading}/>
      </Pressable>)}
        </View>
     ):(

      <FlatList
      data={expense_type}
      renderItem={(item) => {
        return (
          <Pressable onPress={()=>{
            setselected_type(item.item.title)
            let v =JSON.parse(item.item.json)
            console.log(v)
            if(v){
              if(v.length){
                setformdata(v)

              }
            }
          }}>
            <Card item={item} />
          </Pressable>
        )
      }} />

     )}



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
export default ExpenseDetailsScreen