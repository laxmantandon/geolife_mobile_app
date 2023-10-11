import { StyleSheet, View, FlatList, Pressable, Text } from 'react-native';
import React, { useState } from 'react'
import Card from '../src/components/Card'
import { useEffect } from 'react';
import { AuthenicationService } from './services';
import FabButton from './components/FabButton';
import { Colors } from './contants';
import DateInput from './components/DateInput'
import moment from 'moment'
import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';


const ExpenseScreen = ({navigation}) => {
  const [data, setdata] = useState( [
    // {title:'Expense type', image:'https://www.rallis.com/Upload/homepage/banner-lead-rallis-03.JPG', subtitle:'350.00'},
    
  ])
  const [loading, setloading] = useState(true)
  const [expense, setexpense] = useState(0)
  // moment().add(-1,'d').toDate()
  const [from_date, setfrom_date] = useState({ label: 'From Date', value: new Date(), type: 'date', key: 'from_date'  })
  const [to_date, setto_date] = useState({ label: 'To Date', value: new Date(), type: 'date', key: 'to_date'  })


  useEffect(() => {
    getData()    
  }, [])

  useFocusEffect(
    React.useCallback(()=>{
      getData()
    },[])
  )
  
 
  const getData = ()=>{
    req={
      'from_date':moment(from_date.value).format('yyyy-MM-DD'),
      'to_date':moment(to_date.value).format('yyyy-MM-DD')
    }
    setloading(true)
    AuthenicationService.expenses_list(req).then(response => {
      console.log(response)
      setloading(false)
      if (response?.status== true) {
        
        mapped_array=[]
        total_expense=0
        response.data.forEach(a=> {
          let m ={
            title:a.expense_type,
            subtitle:`Expense in Rs. ${a.amount}`,
            image:a?.image?a?.image :'https://winaero.com/blog/wp-content/uploads/2019/11/Photos-new-icon.png',
            data:a,
          }
          total_expense = total_expense+a.amount
          mapped_array.push(m)
        })
        setdata(mapped_array)
        setexpense(total_expense)

      }else{
        setdata([])
        setexpense(0)
      }
    }).catch(e=>{
      setloading(false)

    })
  }



  return (
    <View style={{flex:1, backgroundColor:'white'}}>

<View style={{flexDirection:'row', paddingTop:6}}>
  <View style={{flex:1}}>
  <DateInput item={from_date} />
  </View>
  <Text style={{color:'green', fontSize:14, fontWeight:'bold', paddingVertical:7}}>TO</Text>
  <View style={{flex:1}}>
  <DateInput item={to_date} />
  </View>
  <Pressable onPress={()=>{ getData() }}>
          <Text style={{color:'white',fontWeight:'bold',fontSize: 15, borderRadius:8,backgroundColor:Colors.DEFAULT_GREEN,
          padding:9,paddingHorizontal:10,marginRight:10}}>GO</Text>
        </Pressable>
</View>



      <FlatList
       refreshing={loading}
       onRefresh={()=>{
         getData()
       }}
      data={data}
      renderItem={(item) =>{
        return (
          <Pressable
          onPress={() => {

            if(item.item.title=="Travel-Private" || item.item.title=="Travel-Company"){
              console.log(item.item.data.odometer_end )
              if(item.item.data.odometer_end == 0){
                navigation.navigate('ExpenseDetails',{item})} 

              }



            }
            
            
          }
          
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

<View style={{bottom:0,left:0,padding:8,flexDirection:'row', backgroundColor:Colors.LIGHT_GREY,alignItems:'center' }}>
  <View>
  <Text style={{fontSize:14,color:'black',fontWeight:'500'}}>Total Expense</Text>
  <Text style={{fontSize:14,color:'black',fontWeight:'500'}}>of the day</Text>
  </View>
            <Text style={{fontSize:18,color:'black', fontWeight:'700', }}>
            {` - Rs. ${expense} `}
              </Text>
            </View>

<Pressable onPressIn={()=>{navigation.navigate('ExpenseDetails',{item:''})}}>
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