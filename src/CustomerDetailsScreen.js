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
    if(item.cart){
      setselectedProducts(item.cart)
    }
    getStock()
  
   
  }, [])
  

  const addProductTocart = (product) => {
    setloading(true)
    let added = false;
    let cart = selectedProducts
    for (let p of cart) {
      if (p.title === product.title) {
        p.quantity += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      product.quantity = 1;
      ToastAndroid.showWithGravityAndOffset(
        'Product Added',
        ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
      );
      cart.push(product);
      setselectedProducts(cart)
    }

    console.log(selectedProducts)
    // setloading(false)
    getData()

  }

  const removeProductTocart = (product) => {
    setloading(true)

    let cart = selectedProducts
    for (let [index, p] of cart.entries()) {
      if (p.title === product.title) {
        p.quantity -= 1;
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
        added = true;
        break;
      }
    }
    if (!added) {
      product.quantity = 1;
      ToastAndroid.showWithGravityAndOffset(
        'Product Added',
        ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
      );
      cart.push(product);
      setstock(cart)
    }

    console.log(stock)
    // setloading(false)
    getData()

  }

  const removeProductTostock = (product) => {
    setloading(true)

    let cart = stock
    for (let [index, p] of cart.entries()) {
      if (p.title === product.title) {
        p.quantity -= 1;
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
    // console.log('Location hai', info.coords.longitude,info.coords.latitude)
      mylocation = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"point_type":"circlemarker","radius":10},
      "geometry":{"type":"Point","coordinates":[info.coords.longitude,info.coords.latitude]}}]}
  })
  let req ={
    dealer_mobile : item.item.subtitle,
    cart : selectedProducts,
    mylocation: mylocation,
    type:"Sales Order"
  }
  console.log(req)
  AuthenicationService.checkoutProduct(req).then(r=>{
    console.log(r)
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
    // console.log('Location hai', info.coords.longitude,info.coords.latitude)
      mylocation = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"point_type":"circlemarker","radius":10},
      "geometry":{"type":"Point","coordinates":[info.coords.longitude,info.coords.latitude]}}]}
  })
  let req ={
    dealer_mobile : item.item.subtitle,
    stock : stock,
    mylocation: mylocation
  }
  console.log(req)
  AuthenicationService.update_stock(req).then(r=>{
    console.log(r)
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
    dealer_mobile : item.item.subtitle,  
  }
  console.log(req)
  AuthenicationService.get_stock(req).then(r=>{
    console.log(r.data[0].details.stock)
    if(r.status==true){
         let mapped_array = []
         r.data[0].details.stock.forEach(a => {
            mapped_array.push({ "subtitle": `Rs.${a.rate} /${a.uom}`, "title": a.product_name,"quantity": a.quantity, "uom": a.uom, "rate": a.rate, "item_code": a.product })
          })
          setstock(mapped_array)
    }else{
      ToastAndroid.showWithGravityAndOffset(
        response?.message,
        ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50)
    }
  }).catch(e=>{
    console.log(e)
  })
}

  return (
    <ScrollView style={mstyle.container}>
      <View style={{paddingHorizontal:10}}>
        <Text style={{color:'gray', fontSize:15,}} >
           Customer name :-
           <Text style={{color:'gray', fontSize:15, fontWeight:'bold'}}> {item.item.title} </Text> </Text>
        <Text style={{color:'gray', fontSize:15}} >
           Customer Mobile :- 
        <Text style={{color:'gray', fontSize:15, fontWeight:'bold'}}> {item.item.subtitle} </Text> </Text>
      </View>


      <Text style={mstyle.title}>Dealer Stock Details:-</Text>
      <FlatList
        refreshing={loading}
        onRefresh={() => {
          getData()
        }}
        data={stock}
        renderItem={(item) => {
          return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Pressable onPress={() => {
                // navigation.navigate('ProductDetails',{item})
              }}
                style={{ flex: 1, flexDirection: 'row' }}>
                <Card item={item} />
              </Pressable>

             <View>
            <View style={{flexDirection:'row'}}>
            <Icon onPress={() => { removeProductTostock(item.item) }}
                name={'remove-circle'} size={25} style={{ paddingTop: 5, paddingRight: 5, color: 'red' }} />
              <Text style={{ paddingTop: 5, paddingRight: 5, color: 'black' }}> {item.item.quantity} </Text>
              {/* <TextInput 
              keyboardType='numaric'
              onChangeText={(t)=>{
                console.log(t)
                setloading(true)
                getData()
                item.item.quantity= parseInt(t)
              }}
              value={item.item.quantity} /> */}
              <Icon onPress={() => { addProductTostock(item.item) }}
                name={'add-circle'} size={25} style={{ paddingTop: 5, paddingRight: 10, color: 'green' }} />
              </View>

            </View>
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

{selectedProducts?(
<View>
      <Text style={mstyle.title}>New Order Details:-</Text>
      <FlatList
        refreshing={loading}
        onRefresh={() => {
          getData()
        }}
        data={selectedProducts}
        renderItem={(item) => {
          return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Pressable onPress={() => {
                // navigation.navigate('ProductDetails',{item})
              }}
                style={{ flex: 1, flexDirection: 'row' }}>
                <Card item={item} />
              </Pressable>

             <View>
            <View style={{flexDirection:'row'}}>
            <Icon onPress={() => { removeProductTocart(item.item) }}
                name={'remove-circle'} size={25} style={{ paddingTop: 5, paddingRight: 5, color: 'red' }} />
              <Text style={{ paddingTop: 5, paddingRight: 5, color: 'black' }}> {item.item.quantity} </Text>
              {/* <TextInput 
              keyboardType='numaric'
              onChangeText={(t)=>{
                console.log(t)
                setloading(true)
                getData()
                item.item.quantity= parseInt(t)
              }}
              value={item.item.quantity} /> */}
              <Icon onPress={() => { addProductTocart(item.item) }}
                name={'add-circle'} size={25} style={{ paddingTop: 5, paddingRight: 10, color: 'green' }} />
              </View>
              <Text>Total : <Text style={{textAlign:'right'}}>{item.item.quantity * item.item.rate }</Text> </Text>

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

      <View style={{flexDirection:'row', paddingTop:105, paddingHorizontal:10}}>
        <Pressable
        style={{borderColor:'silver', width:'33%', borderWidth:1, borderRadius:5, paddingHorizontal:10, paddingVertical:10}}
         onPress={() => { navigation.navigate('ProductScreen', { item }) }}>
          <Text style={{color:'gray'}}>New Order</Text>
        </Pressable>

        <Pressable
        style={{borderColor:'silver', width:'33%', borderWidth:1, borderRadius:5, paddingHorizontal:10, paddingVertical:10, marginHorizontal:5}}
        onPress={() => { navigation.navigate('AddPayment', { item }) }}>
          <Text>Payment Entry</Text>
        </Pressable>

        <Pressable
        style={{borderColor:'silver', width:'30%', borderWidth:1, borderRadius:5, paddingHorizontal:10, paddingVertical:10, marginHorizontal:5}}
        onPress={() => { navigation.navigate('ReturnOrder', { item }) }}>
          <Text>Return order</Text>
        </Pressable>
      
      </View>

    </ScrollView>
  )
}

export default CustomerDetailsScreen