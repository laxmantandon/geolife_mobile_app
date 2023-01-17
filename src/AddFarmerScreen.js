import { View, Text, TextInput, Button, FlatList, Pressable } from 'react-native'
import React, { useState } from 'react'
import mstyle from './mstyle';
import { Colors } from './contants';
import MYinputs from './components/MYinputs';
import submitReqData from './services/FormData';


const AddFarmerScreen = ({navigation}) => {
  const [formdata, setformdata] = useState([{label:'Name', placeholder:'Enter Name', value:'Kamesh Kumar', type:'text'},
  {label:'Mobile', placeholder:'Enter Mobile number', value:'8319366462',type:'text', keyboard:'numeric'},
  
  {label:'Please Select', placeholder:'Enter Mobile number', value:'Option 01', 
  options:["Option 01", "Option 02", "Option 03", "Option 04"], type:'select',},

  // {label:'My Image', value:[],type:'image'},
])

const submitnow =()=>{
  // console.log(formdata)
let req = submitReqData(formdata);
console.log(req)

// for (let i in formdata){
//   // let ing = `${formdata[i].label} : ${formdata[i].value}`
//   req[formdata[i].label ] = formdata[i].value
//   // console.log(req)
//   // console.log('submit' ,formdata[i].label)

// }
// console.log(req)


  
}
  return (
    <View style={mstyle.container}>     
       <FlatList
      data={formdata}
      renderItem={({item, index}) =>{
        return (
          <Pressable
          >
          <MYinputs item={item} />

          </Pressable>
          )
      }} />

     <Button onPress={()=>{ submitnow()}} title='Submit'>Submit</Button>

    </View>
  )
}

export default AddFarmerScreen