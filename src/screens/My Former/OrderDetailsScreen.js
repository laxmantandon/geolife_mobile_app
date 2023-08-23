import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import Card from '../../components/Card'
import { useEffect } from 'react'
import mstyle from '../../mstyle'
import moment from 'moment'
import Buttons from '../../components/Buttons'
import { Pressable } from 'react-native'
import { AuthenicationService } from '../../services'
import { ToastAndroid } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const OrderDetailsScreen = ({navigation,route: {
    params: { mdata },
  },}) => {

const [data, setdata] = useState([])
const [productkitData, setproductkitData] = useState([])
const [IsLoading, setIsLoading] = useState(false)
const [muser_info, setmuser_info] = useState([])

    useEffect(() => {
      AsyncStorage.getItem("user_info").then((value) => {
        const user_info =JSON.parse(value)
        setmuser_info(user_info)

      })


      // console.log(mdata.item?.data.mdata)
      let mapped_array = []
      let mapped_array2 = []
        let image =mdata.item.data?.image
          mapped_array.push({ "large_image": image?image:'', "title": `${mdata.item.data.name}`, "subtitle":` Product kit for (${mdata.item.data?.crop_bundle})`, 
          "status": `(${mdata.item.data.docstatus==1?'Completed':mdata.item.data.payment_method})`, "percent":`Rs. ${mdata.item.data.amount}`, "date": mdata.item.data.posting_date,"data":mdata.item.data })
              
          setdata(mapped_array)
          
          let m = mdata.item?.data.mdata
          m.forEach(a=>{
            // console.log(a)
            mapped_array2.push({ "title": `${a.product_kit}`, "subtitle":` Product kit type (${mdata.item.data?.kit_type})`, 
            "status": 'Quantity', "percent":a.qty })
          })
          setproductkitData(mapped_array2)
    
    }, [])

    const CompleteOrder =()=>{
      if(IsLoading==false){
        setIsLoading(true)
        let req ={
          "order_id":mdata.item.title,
          "products":productkitData

        }
        // console.log(req)
        AuthenicationService.CompleteOrder(req).then((r)=>{
          setIsLoading(false)
          if (r.status){
            mdata.item.data.docstatus=1
            ToastAndroid.showWithGravityAndOffset(
              r.message,
              ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
            );
            navigation.goBack()
          }else {
            ToastAndroid.showWithGravityAndOffset(
              r.message,
              ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
            );
          }
        })
    }
    }
    

  return (
    <View style={mstyle.container1}> 
        <FlatList
        data={data}
        renderItem={(item)=>{
            return(
                <View>
                  <Pressable onPress={() => {
                    if(item.item?.large_image){

                     navigation.navigate('ViewImageScreen',{"large_image":item.item?.large_image})
                    }}
                  }
                  >

                  
                    <Card item={item} />
                    </Pressable>
                    <FlatList
                    ListHeaderComponent={()=>{
                      return(
                        <View>
                          <Text style={{color:'black', textAlign:'center', fontSize:22, fontWeight:'700'}}> Product Details</Text>
                          </View>
                      )
                    }}
                  data={productkitData}
                  renderItem={(item) => {
                    return (
                      <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View onPress={() => {  }}
                          style={{ flex: 1, flexDirection: 'row' }}>
                          <Card item={item} />
                        </View>
                      </View>
                    )
                  }} />




                    <View style={[mstyle.inputContainer,{padding:10, elevation:8,}]}>
                        <View style={{padding:10,paddingTop:1, elevation:8,}}>
                          {/* <Text style={{fontSize:14, paddingTop:14,color:'black'}}>Crop Name : - <Text style={{fontWeight:'bold'}}> {item.item.data.crop}</Text> </Text> */}
                          <Text style={{fontSize:14, paddingTop:14,color:'black'}}>Farmer Name : - <Text style={{fontWeight:'bold'}}> {item.item.data.farmer_name} {item.item.data?.last_name}</Text> </Text>
                          <Text style={{fontSize:14, paddingTop:14,color:'black'}}>Farmer Mobile Number : - <Text style={{fontWeight:'bold'}}> {item.item.data.farmer}</Text> </Text>
                          <Text style={{fontSize:14, paddingTop:14,color:'black'}}>Dealer Name : - <Text style={{fontWeight:'bold'}}> {item.item.data.dealer_name}</Text> </Text>
                          <Text style={{fontSize:14, paddingTop:14,color:'black'}}>Dealer Mobile Number : - <Text style={{fontWeight:'bold'}}> {item.item.data.dealer}</Text> </Text>
                          <Text style={{fontSize:14, paddingTop:14,color:'black'}}>Payment Method : - <Text style={{fontWeight:'bold'}}> {item.item.data.payment_method}</Text> </Text>
                          <Text style={{fontSize:14, paddingTop:14,color:'black'}}>Advance Paid Amount : - <Text style={{fontWeight:'bold'}}>Rs. {item.item.data.amount}</Text> </Text>
                          <Text style={{fontSize:14, paddingTop:14,color:'black'}}>Booking Date : - <Text style={{fontWeight:'bold'}}> {moment(item.item.data.posting_date).format("Do MMM-yyyy")} </Text> </Text>
                          <Text style={{fontSize:14, paddingTop:14,color:'black'}}>Expected Date of Delivery : - <Text style={{fontWeight:'bold'}}> {moment(item.item.data.booking_date).format("Do MMM-yyyy")} </Text> </Text>
                          <Text style={{fontSize:14, paddingTop:14,color:'black'}}>Booking Completed On : - <Text style={{fontWeight:'bold'}}> {moment(item.item.data?.modified).format("Do MMM-yyyy")} </Text> </Text>

                          {}


                        </View>
                     </View>
{mdata.item.data.docstatus?(
  <View></View>
):(
  <View>
    {muser_info.user_role =='Dealer'?(
  <Pressable onPress={()=>{
    CompleteOrder()
  }}>
  <Buttons title={'Complete Order'} loading={IsLoading} />
  
  </Pressable>
):(
  ''
)}

    </View>
)}




                </View>
            )
        }} 
        
        />
        {/* <Text>{mdata.index}</Text> */}
    </View>
  )
}

export default OrderDetailsScreen