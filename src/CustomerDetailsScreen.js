import { View, Text, Button, ToastAndroid, FlatList, Pressable, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React from 'react'
import { useState } from 'react'
import Card from './components/Card'

import { AuthenicationService } from './services'
import Icon from 'react-native-vector-icons/Ionicons';
import mstyle from './mstyle'
import Buttons from './components/Buttons'
import activitysubmitReqData from './services/activityFromData'
import Geolocation from '@react-native-community/geolocation'
import { useEffect } from 'react'
import { Colors } from './contants'
import moment from 'moment'


const CustomerDetailsScreen = ({ navigation, props,
  route: {
    params: { item },
  },
}) => {
  const [selectedProducts, setselectedProducts] = useState()
  const [loading, setloading] = useState(false)
  const [isloading, setisloading] = useState(false)
  const [iscartloading, setiscartloading] = useState(false)
  const [stock, setstock] = useState()

  useEffect(() => {
    console.log(item.cart)

    const interval = setInterval(() => {
      if(item.cart){
        setloading(true)
        let mapped_array = []
        item.cart.forEach(a => {
              a.status= 'Add to Cart'
              a.percent= a.quantity 
              mapped_array.push(a)
            })
        setselectedProducts(mapped_array)
        getData()
      }

    }, 1000);

    // Subscribe for the focus Listener
  
    getStock()

setTimeout(() => {
  clearTimeout(interval);

}, 10000);

    return () => {
      clearTimeout(interval);
      
    };
   
  }, [])
  

  const addProductTocart = (product) => {
    setloading(true)
    let added = false;
    let cart = selectedProducts
    for (let p of cart) {
      if (p.title === product.title) {
        p.quantity += 1;
        p.percent +=1
        added = true;
        break;
      }
    }
    if (!added) {
      product.quantity = 1;
      product.percent = 1
      ToastAndroid.showWithGravityAndOffset(
        'Product Added',
        ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
      );
      cart.push(product);
      setselectedProducts(cart)
    }

    // console.log(selectedProducts)
    // setloading(false)
    getData()

  }

  const removeProductTocart = (product) => {
    setloading(true)

    let cart = selectedProducts
    for (let [index, p] of cart.entries()) {
      if (p.title === product.title) {
        p.quantity -= 1;
        p.percent-=1;
        if (p.quantity < 1) {
          ToastAndroid.showWithGravityAndOffset(
            'Product Quantity Removed',
            ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
          );
          cart.splice(index, 1);
          setselectedProducts(cart)
        }
      }
    }
    // setloading(false)
    getData()

  }

  const addProductTostock = (product) => {
    setloading(true)
    let added = false;
    let cart = stock
    for (let p of cart) {
      if (p.title === product.title) {
        p.quantity += 1;
        p.percent +=1
        added = true;
        break;
      }
    }
    if (!added) {
      product.quantity = 1;
      product.percent = 1
      ToastAndroid.showWithGravityAndOffset(
        'Product Added',
        ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
      );
      cart.push(product);
      setstock(cart)
    }

    // console.log(stock)
    // setloading(false)
    getData()

  }

  const removeProductTostock = (product) => {
    setloading(true)

    let cart = stock
    for (let [index, p] of cart.entries()) {
      if (p.title === product.title) {
        p.quantity -= 1;
        p.percent -=1;
        if (p.quantity < 1) {
          ToastAndroid.showWithGravityAndOffset(
            'Product Quantity Removed',
            ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
          );
          cart.splice(index, 1);
          setstock(cart)
        }
      }
    }
    // setloading(false)
    getData()

  }
const getData =()=>{
    setTimeout(()=> {
      setloading(false)
      clearTimeout();
    }, 500)
  }

const checkout= ()=>{
  if(!iscartloading){
    setiscartloading(true)
  let mylocation = {}
  Geolocation.getCurrentPosition(info =>{
    // // console.log('Location hai', info.coords.longitude,info.coords.latitude)
      mylocation = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"point_type":"circlemarker","radius":10},
      "geometry":{"type":"Point","coordinates":[info.coords.longitude,info.coords.latitude]}}]}
  })
  let req ={
    dealer_mobile : item.item.mobile_number,
    cart : selectedProducts,
    mylocation: mylocation,
    type:"Sales Order"
  }
  // console.log(req)
  AuthenicationService.checkoutProduct(req).then(r=>{
    // console.log(r)
    setiscartloading(false)
    if(r.status==true){
      setselectedProducts([])
      item.cart=[]
      ToastAndroid.showWithGravityAndOffset(
        r?.message,
        ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50)
      navigation.goBack()
    }else{
      ToastAndroid.showWithGravityAndOffset(
        r?.message,
        ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50)
    }
  }).catch(e=>{
    setiscartloading(false)
  })

}
}

const Update_Stock= ()=>{
  if(!isloading){
  let mylocation = {}
  Geolocation.getCurrentPosition(info =>{
    // // console.log('Location hai', info.coords.longitude,info.coords.latitude)
      mylocation = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"point_type":"circlemarker","radius":10},
      "geometry":{"type":"Point","coordinates":[info.coords.longitude,info.coords.latitude]}}]}
  })
  let req ={
    dealer_mobile : item.item.mobile_number,
    stock : stock,
    mylocation: mylocation
  }
  // console.log(req)
  AuthenicationService.update_stock(req).then(r=>{
    // console.log(r)
    setisloading(false)

    if(r.status==true){
      setselectedProducts=[]
      ToastAndroid.showWithGravityAndOffset(
        r?.message,
        ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50)
      navigation.goBack()
    }else{
      ToastAndroid.showWithGravityAndOffset(
        r?.message,
        ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50)
    }
  }).catch(e=>{
    setisloading(false)
  })

}
}

const getStock= ()=>{
  let req ={
    dealer_mobile : item.item.mobile_number,  
  }
  // console.log(req)
  AuthenicationService.get_stock(req).then(r=>{
    // console.log(r.data[0].details.stock)
    if(r.status==true){
         let mapped_array = []
         r.data[0].details.stock.forEach(a => {
            mapped_array.push({ "subtitle": `Rs.${a.rate} /${a.uom}`, "title": a.product_name,"quantity": a.quantity, "uom": a.uom, "rate": a.rate, "item_code": a.product,"status": 'Add Quantity', "percent": a.quantity, })
          })
          setstock(mapped_array)
    }else{
      ToastAndroid.showWithGravityAndOffset(
        response?.message,
        ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50)
    }
  }).catch(e=>{
    // console.log(e)
  })
}

  return (
    <ScrollView style={mstyle.container1}>
      <View style={[mstyle.inputContainer,{paddingVertical:18,paddingHorizontal:10, elevation:8}]}>
       <View>
       <Text style={{color:'black', fontSize:15, textAlign:'center'}} >
           {/* Customer name :- */}
           <Text style={{color:'black', fontSize:15, fontWeight:'bold'}}> {item.item.title} </Text> </Text>
        <Text style={{color:'grey', fontSize:15, textAlign:'center'}} >
           {/* Customer Mobile :-  */}
        <Text style={{color:'grey', fontSize:13, fontWeight:'bold'}}> Contact- {item.item.mobile_number} </Text> </Text>
       </View>

       <View style={{ alignItems:'center', elevation:4, padding:10,margin:5, borderRadius:5,
       backgroundColor:item.item.data.activity[0].count==0?Colors.LIGHT_RED:Colors.LIGHT_GREEN}}>
       <Text style={{color:'black', fontSize:15, fontWeight:'700'}}> DGO Visits : {item.item.data.activity[0].count==0?'No':item.item.data.activity[0].count}</Text>
{item.item.data.activity[0].count==0?(''):(
  <View>
         <Text style={{color:'black', fontSize:13, fontWeight:'500'}}> Last visited by {item.item.data.activity[0].geo_mitra_name} on {moment(item.item.data.activity[0].posting_date).format('DD MMM-yy')}  </Text>
         {item.item.data.activity[0]?.last_visit?(
         <Text style={{color:'black',textAlign:'center', fontSize:13, fontWeight:'500'}}> Last visit for {item.item.data.activity[0].last_visit}   </Text>
):('')}
</View>
)}


       </View>
      </View>


      <View style={[mstyle.inputContainer,{marginTop:5,paddingHorizontal:0, paddingBottom:10, elevation:8}]}>
      <Text style={[mstyle.title, {fontSize:15, fontWeight:'700'}]}>Dealer Stock Details :-</Text>
      <FlatList
        refreshing={loading}
        onRefresh={() => {
          getData()
        }}
        data={stock}
        renderItem={(item) => {
          return (
              <View style={{ flex: 1, }}>
                  <Pressable onPress={() => { addProductTostock(item.item) }}
                    style={{ flex: 1, flexDirection: 'row' }}>
                    <Card item={item} />
                  </Pressable>

                  {item.item.quantity > 0 ? (
                    <Pressable style={{ flexDirection: 'row', alignSelf: 'center', marginBottom: 15 }}
                      onPress={() => { removeProductTostock(item.item) }}
                    >
                      <Icon
                        name={'remove-circle'} size={23} style={{ paddingRight: 5, color: 'red' }} />
                      <Text style={{ paddingTop: 2, color: 'red', fontWeight: 'bold' }}>Remove product from cart</Text>
                    </Pressable>
                  ) : ''}
                 
                </View>
          )
        }}

        ListEmptyComponent={()=>{
          return(
            <View>
              <Text style={{textAlign:'center'}}>
                No stock Data
              </Text>
            </View>
          )
        }}

        ListFooterComponent={()=>{
          return(
            <View>
              {stock?(<TouchableOpacity onPress={()=>{
                  Alert.alert('Confirm !','Do you want to update dealer stock ?', [
                    {
                      text: 'Cancel',
                      onPress: () => null,
                      style: 'cancel',
                    },
                    { text: 'YES', onPress: () => Update_Stock() },
                  ]);

                }}>
                    <Buttons title={'Update Stock'}/>
                </TouchableOpacity>):(
                  ''
                )}
              
            </View>
          )
        }}
      />
      </View>

{selectedProducts?(
<View style={[mstyle.inputContainer,{marginTop:10, paddingBottom:10,elevation:8}]}>
      <Text style={[mstyle.title,{fontSize:15, fontWeight:'700'}]}>New Order Details:-</Text>
      <FlatList
        refreshing={loading}
        onRefresh={() => {
          getData()
        }}
        data={selectedProducts}
        renderItem={(item) => {
          return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 1, }}>
                  <Pressable onPress={() => { addProductTocart(item.item) }}
                    style={{ flex: 1, flexDirection: 'row' }}>
                    <Card item={item} />
                  </Pressable>

                  {item.item.quantity > 0 ? (
                    <Pressable style={{ flexDirection: 'row', alignSelf: 'center', marginBottom: 15 }}
                      onPress={() => { removeProductTocart(item.item) }}
                    >
                      <Icon
                        name={'remove-circle'} size={23} style={{ paddingRight: 5, color: 'red' }} />
                      <Text style={{ paddingTop: 2, color: 'red', fontWeight: 'bold' }}>Remove product from cart</Text>
                    </Pressable>
                  ) : ''}
                 
                </View>
             
            </View>
            
          )
        }}
        ListFooterComponent={() => {
          return (
            <View>
             
                <TouchableOpacity onPress={()=>{
                  checkout()
                }}>
                    <Buttons title={'Checkout Order'} loading={iscartloading}/>
                </TouchableOpacity>
  
              
              </View>
          )
        }}
      />
     </View>
      ):(null)}

      <View style={{flex:1,flexDirection:'row',paddingVertical:10 , marginHorizontal:10}}>
        <Pressable
        style={{backgroundColor:Colors.DEFAULT_GREEN, 
        flex:1, borderWidth:.5, borderRadius:5, paddingHorizontal:5, paddingVertical:5,marginRight:3}}
         onPress={() => { navigation.navigate('ProductScreen', { item }) }}>
          <Icon name='add-circle-outline' size={22} style={{color:'white',alignSelf:'center'}}/>
          <Text style={{color:'white', fontSize:13, fontWeight:'bold',textAlign:'center'}}>New Order</Text>
        </Pressable>

        <Pressable
        style={{backgroundColor:Colors.SECONDARY_GREEN, 
          flex:1, borderWidth:.5, borderRadius:5, paddingHorizontal:10, paddingVertical:5,marginRight:3}}
           onPress={() => { navigation.navigate('AddPayment', { item }) }}>
                      <Icon name='cash-outline' size={22} style={{color:'white',alignSelf:'center'}}/>
          <Text style={{color:'white', fontSize:13, fontWeight:'bold',textAlign:'center'}}>Payment Entry</Text>
        </Pressable>

        <Pressable
        style={{backgroundColor:Colors.SECONDARY_RED, 
          flex:1, borderWidth:.5, borderRadius:5, paddingHorizontal:10, paddingVertical:5,marginRight:1}} onPress={() => { navigation.navigate('ReturnOrder', { item }) }}>
                                <Icon name='refresh-outline' size={22} style={{color:'white',alignSelf:'center'}}/>
          <Text style={{color:'white', fontSize:13, fontWeight:'bold',textAlign:'center'}}>Return order</Text>
        </Pressable>
      
      </View>

    </ScrollView>
  )
}

export default CustomerDetailsScreen