import { StyleSheet, View, FlatList, Pressable, Text } from 'react-native';
import React, { useState } from 'react'
import Card from '../src/components/Card'
import { useEffect } from 'react';
import { AuthenicationService } from './services';
import FabButton from './components/FabButton';

const ExpenseScreen = ({navigation}) => {
  const [data, setdata] = useState( [
    // {title:'Expense type', image:'https://www.rallis.com/Upload/homepage/banner-lead-rallis-03.JPG', subtitle:'350.00'},
    
  ])
  const [loading, setloading] = useState(true)
  const [expense, setexpense] = useState(0)

  useEffect(() => {
    getData()    
  }, [])
 
  const getData = ()=>{
    req=null
    setloading(true)
    AuthenicationService.expenses_list(req).then(response => {
      console.log(response)
      setloading(false)
      if (response?.status== true) {
        
        mapped_array=[]
        total_expense=0
        response.data.forEach(a=> {
          let m ={
            title:a.expense_name,
            subtitle:a.amount,
            image:a?.image?a?.image :'https://winaero.com/blog/wp-content/uploads/2019/11/Photos-new-icon.png',
          }
          total_expense = total_expense+a.amount
          mapped_array.push(m)
        })
        setdata(mapped_array)
        setexpense(total_expense)

      }else{
      }
    }).catch(e=>{
      setloading(false)

    })
  }

  return (
    <View style={{flex:1, backgroundColor:'white'}}>
      <FlatList
       refreshing={loading}
       onRefresh={()=>{
         getData()
       }}
      data={data}
      renderItem={(item) =>{
        return (
          <Pressable
          onPress={() => navigation.navigate('ExpenseDetails',{item})}
          >
          <Card item={item} />

          </Pressable>
          )
      }} 

      // ListFooterComponent={()=>{
      //   return(
      //     <View style={{top:5}}>
      //       <Text>Total Expense of the day</Text>
      //       </View>
      //   )
      // }}
      
      
      />

<View style={{bottom:25,left:15}}>
            <Text>Total Expense of the day {expense}</Text>
            </View>

<Pressable onPress={()=>{navigation.navigate('ExpenseDetails',{item:''})}}>
          <FabButton />
      </Pressable>
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