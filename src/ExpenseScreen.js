import { StyleSheet, View, FlatList, Pressable } from 'react-native';
import React, { useState } from 'react'
import Card from '../src/components/Card'

const ExpenseScreen = ({navigation}) => {
  const [data, setdata] = useState( [
    {title:'Expense type', image:'https://www.rallis.com/Upload/homepage/banner-lead-rallis-03.JPG', subtitle:'Amount'},
    
  ])
  return (
    <View style={{flex:1, backgroundColor:'white'}}>
      <FlatList
      data={data}
      renderItem={(item) =>{
        return (
          <Pressable
          onPress={() => navigation.navigate('ExpenseDetails')}
          >
          <Card item={item} />

          </Pressable>
          )
      }} />
    </View>
  )
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 10,
    backgroundColor: 'white'
  },
 
  videoContainer: {
    backgroundColor:'white',
    borderColor: 'white',
    borderWidth: 1,
    borderBottomColor: 'silver',
    padding: 7,
    // marginRight: 100,
    borderRadius: 8,
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 4,
    // width: '95%',
    // alignItems: 'flex-start',

  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    marginHorizontal: 10,
    alignItems: 'center',
    width: '55%',
  },
 
  listVideoTitle: {
    color: '#282828',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    fontWeight:'bold',
    letterSpacing: 0.1,
    // width: '100%',
  },
  titleContainer: {
    // flexDirection: 'column',
    // width: '10%',
  }
});

export default ExpenseScreen