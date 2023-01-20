import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Card from './components/Card'
import mstyle from './mstyle'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Fonts } from './contants';
import { Display } from './utils';

const MydayScreen = ({navigation}) => {

  const [data, setdata] = useState([
    {title:'Activity', route:'Activity'},{title:'Expense', route:'Expense'},{title:'Customer', route:'Customer'},{title:'Day Plan', route:'Dayplan'}
  ])

  return (
    <View style={mstyle.container1}>
      {/* <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>MY Day Screen</Text>
      </View> */}


       <FlatList
      data={data}
      renderItem={(item) =>{
        return (
          <Pressable
             onPress={() => {
               navigation.navigate(item.item.route)
             }} 
             >
          <Card item={item} />

          </Pressable>
          )
      }} />
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  headerTitle: {
    color:'black',
    fontSize: 18,
    fontWeight:'700',
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    width: Display.setWidth(80),
    textAlign: 'center',
  },
})

export default MydayScreen