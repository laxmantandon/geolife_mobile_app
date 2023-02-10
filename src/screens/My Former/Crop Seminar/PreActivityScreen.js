import { View, Text, FlatList, Pressable } from 'react-native'
import React from 'react'
import mstyle from '../../../mstyle'
import { useState } from 'react'
import MYinputs from '../../../components/MYinputs'

const PreActivityScreen = () => {
  const [formdata, setformdata] = useState([
    { label: 'Name', key: 'title', value: '', type: 'check' },
    { label: 'Name', key: 'title', value: '', type: 'check' },
    { label: 'Name', key: 'title', value: '', type: 'check' },
    { label: 'Name', key: 'title', value: '', type: 'check' },
   

  ])
  return (
    <View style={mstyle.container1}>
      <FlatList
        data={formdata}
        renderItem={({ item, index }) => {
          return (
            <Pressable
            >
              {/* <CheckBox
    style={{flex: 1, padding: 10}}
    onClick={()=>{
      console.log()
      // this.setState({
      //     isChecked:!this.state.isChecked
      // })
    }}
    isChecked={true}
    leftText={"CheckBox"}
/> */}
              

            </Pressable>
          )
        }} />
    </View>
  )
}

export default PreActivityScreen