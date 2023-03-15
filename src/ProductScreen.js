import { View, Text, FlatList, Pressable, TextInput, Linking, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import Card from './components/Card'
import FabButton from './components/FabButton'
import mstyle from './mstyle'
import { Colors } from './contants'
import { useEffect } from 'react'
import { AuthenicationService } from './services'
import Icon from 'react-native-vector-icons/Ionicons';
import Buttons from './components/Buttons'

const ProductScreen = ({ navigation, props,
  route: {
    params: { item },
  },
}) => {

  const [data, setdata] = useState([])
  const [serachingData, setserachingData] = useState(true)
  const [selectedProducts, setselectedProducts] = useState([])

  const searchFilterFunction = (text) => {
    setserachingData(true)
    let req = {
      "text": text
    }
    // console.log(text)
    AuthenicationService.searchProductData(req)
      .then(x => {
        setserachingData(false)
        if (x.status == true) {
          let mapped_array = []
          x.data.forEach(a => {
            mapped_array.push({ "subtitle": `Rs.${a.rate} /${a.uom}`, "title": a.product_name, "uom": a.uom, "rate": a.rate, "item_code": a.item_code })
          })
          setdata(mapped_array)
        } else {
        }
      })
  }
  const addProductTocart = (product) => {
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
  }

  const removeProductTocart = (product) => {

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

  }

  useEffect(() => {
    // getData()
    searchFilterFunction("")
  }, [])

  return (
    <View style={mstyle.container1}>

      <View style={mstyle.inputContainer}>
        <View style={mstyle.inputSubContainer}>

          <TextInput
            placeholder={'Type something'}
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            style={mstyle.inputText}
            onChangeText={text => {
              searchFilterFunction(text)
            }}
          />
        </View>
      </View>


      <FlatList
        refreshing={serachingData}
        onRefresh={() => {
          searchFilterFunction("")
        }}
        data={data}
        renderItem={(item) => {
          return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Pressable onPress={() => {
                // navigation.navigate('ProductDetails',{item})
              }}
                style={{ flex: 1, flexDirection: 'row' }}>
                <Card item={item} />
              </Pressable>


              {/* <Icon  onPress={() => { removeProductTocart(item.item) }} 
              name={'remove-circle'} size={25} style={{paddingTop:15, paddingRight:5, color:'red'}}/>
<Text style={{paddingTop:15,paddingRight:5,color:'black'}}>{selectedProducts.length}  </Text> */}
              <Icon onPress={() => { addProductTocart(item.item) }}
                name={'add-circle'} size={25} style={{ paddingTop: 15, paddingRight: 10, color: 'green' }} />
            </View>
          )
        }} />

      <Pressable onPress={() => {
        item.cart = selectedProducts
        // console.log(item)
        navigation.navigate('CustomerDetails', { item })
      }}>
        <Buttons title={'Go to Cart'} />

      </Pressable>


    </View>
  )
}

export default ProductScreen