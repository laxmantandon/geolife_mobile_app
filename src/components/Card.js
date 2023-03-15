import { StyleSheet, StatusBar, Text, View, Image } from 'react-native';
import React, { Component } from 'react'
import { Colors, Fonts } from '../contants';
import { useState } from 'react';
import { useEffect } from 'react';

const Card = ({ item }) => {
  // console.log(item.item)
  const data = item.item
  // console.log('type',parseInt(data.subtitle))
  const [sub_title, setsub_title] = useState(0)

  useEffect(() => {
    if(parseInt(data.subtitle)){
      setsub_title(parseInt(data.subtitle))
    }
  
  }, [])
  
  return (
    <View
      style={styles.ListContainer} >
      {data?.image ? (<Image style={{ margin: "auto", backgroundColor: Colors.LIGHT_GREY, height: 60, width: 60,
     borderRadius: 4, }} source={{ uri: data?.image }} />) : ('')}
      {data?.avatar ? (<Image style={{ margin: "auto", backgroundColor: 'silver', height: 60, width: 60, borderRadius: 50 }} source={{ uri: data?.avatar }} />) : ('')}

      <View style={styles.detailContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.listListTitle} numberOfLines={2}>
            {data?.title}
          </Text>
          {data?.subtitle ? (<Text style={{ color: 'gray',fontSize:12,fontWeight:'600', fontFamily: Fonts.POPPINS_MEDIUM,
 }} numberOfLines={2}> {sub_title?`*****${data.subtitle.substring(0, 5)}`: data.subtitle}</Text>) : ('')}
        </View>
      </View>
    </View>
  )

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 10,
    backgroundColor: 'white'
  },

  ListContainer: {
    flex: 1,
    backgroundColor: 'white',
    // borderColor: 'silver',
    // borderWidth: 1,
    borderBottomColor: Colors.LIGHT_GREY2,
    borderBottomWidth:1,
    paddingHorizontal: 7,
    paddingVertical:4,
    borderRadius: 8,
    flexDirection: 'row',
    marginHorizontal: 7,
    marginVertical: 2,
    // elevation:2
   

  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    marginHorizontal: 10,
    alignItems: 'center',
    // width: '55%',
  },

  listListTitle: {
    color: 'black',
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 0.1,
    // width: '100%',
  },
  titleContainer: {
    // flexDirection: 'column',
    // width: '10%',
  }
});


export default Card