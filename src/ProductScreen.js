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
    // // console.log(text)
    AuthenicationService.searchProductData(req)
      .then(x => {
        setserachingData(false)
        if (x.status == true) {
          let mapped_array = []
          x.data.forEach(a => {
            mapped_array.push({ "subtitle": `Rs.${a.rate} /${a.uom}`, "title": a.product_name, "uom": a.uom, "rate": a.rate, "item_code": a.item_code,"item_code": a.product,"status": 'Add to Cart', "percent": 0,"quantity": 0 })
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
        p.percent += 1;
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

    // console.log(selectedProducts)
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
        }} />

      <Pressable onPress={() => {
        item.cart = selectedProducts
        // // console.log(item)
        navigation.navigate('CustomerDetails', { item })
      }} style={{paddingBottom:10}} >
        <Buttons title={'Go to Cart'} />

      </Pressable>


    </View>
  )
}

export default ProductScreen