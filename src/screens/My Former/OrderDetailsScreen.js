import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import Card from '../../components/Card'
import { useEffect } from 'react'
import mstyle from '../../mstyle'
import moment from 'moment'

const OrderDetailsScreen = ({navigation,route: {
    params: { mdata },
  },}) => {

const [data, setdata] = useState([])

    useEffect(() => {
      console.log(mdata.item)
        let mapped_array = []
        
            mapped_array.push({ "title": `${mdata.item.data.name}`, "subtitle":` Product kit for (${mdata.item.data.crop})`, 
            "status": mdata.item.data.payment_method, "percent":`Rs. ${mdata.item.data.amount}`, "date": mdata.item.data.posting_date,"data":mdata.item.data })
      
        setdata(mapped_array)
    
    }, [])
    

  return (
    <View style={mstyle.container1}> 
        <FlatList
        data={data}
        renderItem={(item)=>{
            return(
                <View>
                    <Card item={item} />
                    <View style={[mstyle.inputContainer,{padding:10, elevation:8,}]}>
                        <View style={{padding:10,paddingTop:1, elevation:8,}}>
                        <Text style={{fontSize:14, paddingTop:14,color:'black'}}>Crop Name : - <Text style={{fontWeight:'bold'}}> {item.item.data.crop}</Text> </Text>
                        <Text style={{fontSize:14, paddingTop:14,color:'black'}}>Farmer Name : - <Text style={{fontWeight:'bold'}}> {item.item.data.farmer_name}</Text> </Text>
                        <Text style={{fontSize:14, paddingTop:14,color:'black'}}>Farmer Mobile Number : - <Text style={{fontWeight:'bold'}}> {item.item.data.farmer}</Text> </Text>
                        <Text style={{fontSize:14, paddingTop:14,color:'black'}}>Dealer Name : - <Text style={{fontWeight:'bold'}}> {item.item.data.dealer_name}</Text> </Text>
                        <Text style={{fontSize:14, paddingTop:14,color:'black'}}>Dealer Mobile Number : - <Text style={{fontWeight:'bold'}}> {item.item.data.dealer}</Text> </Text>
                        <Text style={{fontSize:14, paddingTop:14,color:'black'}}>Payment Method : - <Text style={{fontWeight:'bold'}}> {item.item.data.payment_method}</Text> </Text>
                        <Text style={{fontSize:14, paddingTop:14,color:'black'}}>Advance Paid Amount : - <Text style={{fontWeight:'bold'}}>Rs. {item.item.data.amount}</Text> </Text>
                        <Text style={{fontSize:14, paddingTop:14,color:'black'}}>Booking Date : - <Text style={{fontWeight:'bold'}}> {moment(item.item.data.posting_date).format("Do MMM-yyyy")} </Text> </Text>
                        <Text style={{fontSize:14, paddingTop:14,color:'black'}}>Expected Date of Delivery : - <Text style={{fontWeight:'bold'}}> {moment(item.item.data.booking_date).format("Do MMM-yyyy")} </Text> </Text>
                   
                            </View>
                     </View>



                </View>
            )
        }} 
        
        />
        {/* <Text>{mdata.index}</Text> */}
    </View>
  )
}

export default OrderDetailsScreen