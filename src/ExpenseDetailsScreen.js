import { View, StyleSheet,  Pressable,  FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import MYinputs from './components/MYinputs';
import mstyle from './mstyle';
import Buttons from './components/Buttons';


const ExpenseDetailsScreen = ({ props,
  route: {
    params: { item },
  },
}) => {
  const [activity_type, setactivity_type] = useState(["Option 01", "Option 02", "Option 03", "Option 04"])
  const [formdata, setformdata] = useState([
    { label: 'Please Select Activity Type', key: 'type', value: '', options: activity_type, type: 'select', },
    { label: 'Name', placeholder: 'Enter Name', key: 'title', value: '', type: 'text' },
    { label: 'Notes', placeholder: 'Enter Notes', key: 'subtitle', value: '', type: 'text', keyboard: 'numeric' },
    { label: 'My Image', value: [], type: 'image', key: 'image', },
  ])
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


  const submit =()=>{
    console.log(formdata)
  }

  const update =()=>{
    console.log(formdata)
  }



  return (
    <ScrollView style={mstyle.container}>
      <FlatList
        data={formdata}
        renderItem={({ item, index }) => {
          return (
            <Pressable
            >
              <MYinputs item={item} />

            </Pressable>
          )
        }} />

      {item.item ? (<Pressable onPress={()=>{update()}}>
        <Buttons title={'Update'} loading={false}/>
      </Pressable>):(<Pressable>
        <Buttons title={'Submit'} onPress={()=>{submit()}} loading={false}/>
      </Pressable>)}



    </ScrollView>
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