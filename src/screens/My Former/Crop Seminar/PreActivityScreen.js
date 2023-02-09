import { View, Text, FlatList, Pressable,CheckBox } from 'react-native'
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
              <CheckBox
          value={true}
          // onValueChange={setSelection}
          // style={styles.checkbox}
        />

            </Pressable>
          )
        }} />
    </View>
  )
}

export default PreActivityScreen