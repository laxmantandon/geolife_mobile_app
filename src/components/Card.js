import { StyleSheet, StatusBar, Text, View, Image } from 'react-native';
import React, { Component } from 'react'

const Card = ({item}) => {
  console.log(item.item)
  const data=item.item
    return (
        <View
        onPress={() => {
          // AddPoint()
        }}
        style={styles.ListContainer} >
          {data?.image?(<Image  style={{ margin: "auto", backgroundColor: 'silver', height:80, width:80 }} source={{ uri: data?.image }} />):('')}
          {data?.avatar?(<Image  style={{ margin: "auto", backgroundColor: 'silver', height:60, width:60, borderRadius:50 }} source={{ uri: data?.avatar }} />):('')}
  
        <View style={styles.detailContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.listListTitle} numberOfLines={2}>
              {data?.title}
            </Text>
            {data?.subtitle?(<Text style={{color:'gray'}} numberOfLines={2}> {data?.subtitle}</Text> ):('')}
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
      backgroundColor:'white',
      borderColor: 'silver',
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
   
    listListTitle: {
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
  
  
export default Card