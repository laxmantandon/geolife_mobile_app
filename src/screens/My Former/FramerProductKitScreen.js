import { View, Text, FlatList, Pressable, TextInput, Linking, ToastAndroid, Alert } from 'react-native'
import React, { useState } from 'react'
import Card from '../../components/Card'
import FabButton from '../../components'
import mstyle from '../../mstyle'
import { Colors } from '../../contants'
import { useEffect } from 'react'
import { AuthenicationService } from '../../services'
import Icon from 'react-native-vector-icons/Ionicons';
import Buttons from '../../components/Buttons'
import SearchableDropDown from 'react-native-searchable-dropdown'

const FramerProductKitScreen = ({ navigation, props,
  route: {
    params: { item },
  },
}) => {

  const [data, setdata] = useState([])
  const [serachingData, setserachingData] = useState(true)
  const [selectedProducts, setselectedProducts] = useState([])
  const [loading, setloading] = useState(false)
  const [crops, setcrops] = useState([])
  const [selectedCrops, setselectedCrops] = useState()
  const [dealers, setdealers] = useState([])
  const [selectedDelers, setselectedDelers] = useState()
  const [selectedFarmer, setselectedFarmer] = useState('')
  const [iscartloading, setiscartloading] = useState(false)

  const searchFilterFunction = (text) => {
    setloading(true)
    setserachingData(true)
    let req = {
      "text": text
    }
    if (text==''){
      req.text=false
    }
    // console.log(text)
    AuthenicationService.searchProductKitData(req)
      .then(x => {
        setserachingData(false)
        setloading(false)

        if (x.status == true) {
          let mapped_array = []
          x.data.forEach(a => {
            mapped_array.push({ "subtitle": `Crop Name - ${a.crop}`, "title": a.kit_name, "quantity":0,"name":a.name })
          })
          setdata(mapped_array)
        } else {
        }
      })
  }
  const addProductTocart = (product) => {
    setloading(true)
    let added = false;
    let cart = data
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
        'Product Kit Added',
        ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
      );
      cart.push(product);
      setdata(cart)
      // setselectedProducts(cart)
    }

    console.log(data)
    // setloading(false)
    getData()

  }

  const removeProductTocart = (product) => {
    setloading(true)

    let cart = data
    for (let [index, p] of cart.entries()) {
      if (p.title === product.title) {
        p.quantity -= 1;
        if (p.quantity < 1) {
          ToastAndroid.showWithGravityAndOffset(
            'Product Kit Quantity Removed',
            ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
          );
          cart.splice(index, 1);
          setdata(cart)
          // setselectedProducts(cart)
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

  useEffect(() => {
    if(item){
      setselectedFarmer(item.subtitle)
    }
    getDealers()
    getCrops()
    getData()
    searchFilterFunction("")
  }, [])


const getCrops =()=>{
  let req = {
    "text": ''
  }
  AuthenicationService.searchCropData(req)
    .then(x => {
      console.log(x.data)
        if (x.status == true) {
          let mapped_array = []
          x.data.forEach(a => {
            mapped_array.push({ "name": a.crop_name , "id": a.name })
          })
          setcrops(mapped_array)
        } else {
        }
      })
      .catch(error => {
        console.log(error)
      })
}

const getDealers =()=>{
  let req = {
    "text": ''
  }
  AuthenicationService.searchdealerData(req)
    .then(x => {
      console.log(x.data)
        if (x.status == true) {
          let mapped_array = []
          x.data.forEach(a => {
            mapped_array.push({ "name": `${a.dealer_name}` , "id": a.mobile_number })
          })
          setdealers(mapped_array)
        } else {
        }
      })
      .catch(error => {
        console.log(error)
      })
}

const bookProductKit=()=>{
  let s_item=[]
  for (let p of data) {
    if (p.quantity > 0) {
    s_item.push(p)
      break;
    }
  }
  setselectedProducts(s_item)
  console.log(selectedProducts)
if(!selectedCrops?.name){
alert('Please select crop')
return
}

if(!selectedDelers?.id){
  alert('Please select dealer')
  return
  }

  if(!selectedProducts.length){
    alert('Please select product kit')
    return
    }
    if(!iscartloading){
  Alert.alert('Confirm !','Do you want to pre book selected product kit ?', [
    {
      text: 'Cancel',
      onPress: () => null,
      style: 'cancel',
    },
    { text: 'YES', onPress: () => SubmitOrder() },
  ]);
}

}

const SubmitOrder=()=>{
  let req ={
    cart:selectedProducts,
    crop:selectedCrops.name,
    farmer:selectedFarmer,
    dealer_mobile:selectedDelers.id
  }
  console.log(req)
  AuthenicationService.checkoutProductKit(req).then(r=>{
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
    ToastAndroid.showWithGravityAndOffset(
      'Network Error No Internet',
      ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50)
  })
}

  return (
    <View style={mstyle.container1}>

      <View style={[mstyle.inputContainer,{backgroundColor:'white', paddingHorizontal: 1,
    marginHorizontal: 10,}]}>
            <Text style={{color:'black'}}> Select Crop</Text>

        <View style={mstyle.inputSubContainer}>
        {selectedCrops?(
          <View style={{padding: 10, marginTop: 2, flexDirection:'row',
            backgroundColor: 'white', borderColor: 'silver',
            borderWidth: 1, borderRadius: 5,width:'100%' 
            }}>

          <Text style={{color:'gray',width:'90%'}}> {selectedCrops.name}</Text>
          <Icon onPress={()=>{setselectedCrops()}} name='close-circle-outline' size={25} style={{color:'red'}}></Icon>

        </View>
        ):(
<SearchableDropDown
            onItemSelect={(item) => {
              // const items = selectedCrops;
              // items.push(item)
              setselectedCrops(item)
              searchFilterFunction(item.name)

              console.log(selectedCrops)
            }}
            containerStyle={{ padding: 3,width:'100%' }}
            onRemoveItem={(item, index) => {
              // const items = selectedCrops.filter((sitem) => sitem.name !== item.name);
              // setselectedCrops(items)
            }}
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: 'white',
              borderColor: 'silver',
              borderWidth: 1,
              borderRadius: 5,
            }}
            itemTextStyle={{ color: '#222' }}
            itemsContainerStyle={{ maxHeight: 140 }}
            items={crops}
            defaultIndex={2}
            resetValue={false}
            textInputProps={
              {
                placeholder: "Search Crops",
                underlineColorAndroid: "transparent",
                style: {
                    padding: 12,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                    color: "black"
                },
                onTextChange: text => 
                {
                  //getsearchData(text)
                }
              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
        />
        )}

        
        </View>
        </View>
        <View style={[mstyle.inputContainer,{backgroundColor:'white', paddingHorizontal: 1,marginTop:7,
    marginHorizontal: 10,}]}>
      <Text style={{color:'black'}}> Select Dealer</Text>
        <View style={mstyle.inputSubContainer}>
        {selectedDelers?(
          <View style={{padding: 10, marginTop: 2, flexDirection:'row',
            backgroundColor: 'white', borderColor: 'silver',
            borderWidth: 1, borderRadius: 5,width:'100%' 
            }}>

          <Text style={{color:'gray',width:'90%'}}> {selectedDelers.name}</Text>
          <Icon onPress={()=>{setselectedDelers()}} name='close-circle-outline' size={25} style={{color:'red'}}></Icon>

        </View>
        ):(
        <SearchableDropDown
            onItemSelect={(item) => {
              // const items = selectedCrops;
              // items.push(item)
              setselectedDelers(item)
              console.log(selectedDelers)
            }}
            containerStyle={{ padding: 3, width:'100%' }}
            onRemoveItem={(item, index) => {
              // const items = selectedCrops.filter((sitem) => sitem.name !== item.name);
              // setselectedDelers(items)
            }}
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: 'white',
              borderColor: 'silver',
              borderWidth: 1,
              borderRadius: 5,
            }}
            itemTextStyle={{ color: '#222' }}
            itemsContainerStyle={{ maxHeight: 140 }}
            items={dealers}
            defaultIndex={2}
            resetValue={false}
            textInputProps={
              {
                placeholder: "Search Dealer",
                underlineColorAndroid: "transparent",
                style: {
                    padding: 12,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                    color: "black"
                },
                onTextChange: text => 
                {
                 
                }
              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
        />
        )}

          {/* <TextInput
            placeholder={'Type something'}
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            style={mstyle.inputText}
            onChangeText={text => {
              searchFilterFunction(text)
            }}
          /> */}
        </View>
      </View>


<FlatList
        refreshing={loading}
        onRefresh={() => {
            getData()
        }}
        data={data}
        ListHeaderComponent={()=>{
          return (
            <View style={{marginHorizontal:10, marginTop:10}}>
                    <Text style={{color:'black'}}> Select <Text style={{fontWeight:'bold'}}>{selectedCrops?.name}</Text> Product Kit</Text>
            </View>
          )
        }}

        ListEmptyComponent={()=>{
          return (
            <View style={{marginHorizontal:10, marginTop:10}}>
                    <Text style={{color:'gray', fontSize:15 ,textAlign:'center',paddingTop:100}}>
                       Please Select Crop No Any Product Kit Available
                       
                       </Text>
            </View>
          )
        }}
        renderItem={(item) => {
          return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Pressable onPress={() => {
                // navigation.navigate('ProductDetails',{item})
              }}
                style={{ flex: 1, flexDirection: 'row' }}>
                <Card item={item} />
              </Pressable>

              <Icon  onPress={() => { removeProductTocart(item.item) }} 
              name={'remove-circle'} size={25} style={{paddingTop:15, paddingRight:5, color:'red'}}/>
                <Text style={{paddingTop:15,paddingRight:5,color:'black'}}>{item.item.quantity}  </Text>
                {/* <TextInput 
                  keyboardType='numeric'
                  style={{backgroundColor:'silver', padding:2}}
                  onChangeText={(t)=>{
                    item.item.quantity= parseInt(t)
                  }}
                  value={item.item.quantity} 
              />  */}

              <Icon onPress={() => { addProductTocart(item.item) }}
                name={'add-circle'} size={25} style={{ paddingTop: 15, paddingRight: 10, color: 'green' }} />
            </View>
          )
        }} />

      <Pressable onPress={() => {
       bookProductKit()
      }}>
        <Buttons title={'Book Now'} loading={iscartloading}/>

      </Pressable>


    </View>
  )
}

export default FramerProductKitScreen