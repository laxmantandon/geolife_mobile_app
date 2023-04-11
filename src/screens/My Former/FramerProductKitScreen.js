import { View, Text, FlatList, Pressable, TextInput, Linking, ToastAndroid, Alert, Button, ScrollView, SafeAreaView,
  StyleSheet,  Modal, Animated, TouchableOpacity, Image, } from 'react-native'
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
import MYinputs from '../../components/MYinputs'


const ModalPoup = ({visible, children}) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};



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
  const [farmers, setfarmers] = useState([])
  const [selectedDelers, setselectedDelers] = useState()
  const [selectedFarmer, setselectedFarmer] = useState('')
  const [iscartloading, setiscartloading] = useState(false)

  const searchFilterFunction = (text) => {
    if(selectedCrops?.id){
      setloading(true)
    setserachingData(true)
    let req = {
      "text": text
    }
    if (text == '') {
      req.text = selectedCrops?.id
    }
    // console.log(text)
    AuthenicationService.searchProductKitData(req)
      .then(x => {
        setserachingData(false)
        setloading(false)

        if (x.status == true) {
          let mapped_array = []
          x.data.forEach(a => {
            mapped_array.push({ "subtitle": `Crop Name - ${a.crop}`, "title": a.kit_name, "quantity": 0, "status": 'Add to Cart',"percent": 0, "name": a.name })
            })
          setdata(mapped_array)
        } else {
        }
      })
    }else{
      alert('Please select crop')
    }
  }


  const searchFilterFunctionFarmer = (text) => {
    // setloading(true)
    // setserachingData(true)
    let req = {
      "text": text
    }
    if (text == '') {
      req.text = false
    }
    // console.log(text)
    AuthenicationService.searchfarmerData(req)
      .then(x => {
        // setserachingData(false)
        // setloading(false)

        if (x.status == true) {
          let mapped_array = []
          x.data.forEach(a => {
            mapped_array.push({ "name": `${a.first_name} ${a.last_name}`, "id": a.name,   })
          })
          setfarmers(mapped_array)
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
        p.percent += 1;
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
    getSelectedproducts()

  }

  const removeProductTocart = (product) => {
    setloading(true)

    let cart = data
    for (let [index, p] of cart.entries()) {
      if (p.title === product.title) {
       if (p.quantity ==2){
        alert('Do you wants to remove')
       }
       p.quantity -= 1;
        p.percent -= 1;

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
    getSelectedproducts()


  }

  const getData = () => {
    setTimeout(() => {
      setloading(false)
      clearTimeout();
    }, 500)
  }

  useEffect(() => {
    if (item) {
      setselectedFarmer(item.subtitle)
    }
    searchFilterFunctionFarmer('')
    getDealers()
    getCrops()
    getData()
    // searchFilterFunction("")
  }, [])


  const getCrops = () => {
    let req = {
      "text": ''
    }
    AuthenicationService.searchCropData(req)
      .then(x => {
        console.log(x.data)
        if (x.status == true) {
          let mapped_array = []
          x.data.forEach(a => {
            mapped_array.push({ "name": a.crop_name, "id": a.name })
          })
          setcrops(mapped_array)
        } else {
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  const getDealers = () => {
    let req = {
      "text": ''
    }
    AuthenicationService.searchdealerData(req)
      .then(x => {
        console.log(x.data)
        if (x.status == true) {
          let mapped_array = []
          x.data.forEach(a => {
            mapped_array.push({ "name": `${a.dealer_name}`, "id": a.mobile_number ,"qr_code": a.qr_code })
          })
          setdealers(mapped_array)
        } else {
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
const getSelectedproducts=()=>{
  let s_item = []
    for (let p of data) {
      if (p.quantity > 0) {
        s_item.push(p)
        break;
      }
    }
    setselectedProducts(s_item)
}
  const bookProductKit = () => {
    // let s_item = []
    // for (let p of data) {
    //   if (p.quantity > 0) {
    //     s_item.push(p)
    //     break;
    //   }
    // }
    // setselectedProducts(s_item)
    console.log(selectedProducts)
    if (!selectedCrops?.name) {
      alert('Please select crop')
      return
    }

    if (!selectedFarmer?.id) {
      alert('Please select farmer')
      return
    }

    if (!selectedDelers?.id) {
      alert('Please select dealer')
      return
    }

    if (!selectedProducts[0]) {
      alert('Please select product kit')
      return
    }
    if (!iscartloading) {
      Alert.alert('Confirm !', 'Do you want to pre book selected product kit ?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'YES', onPress: () => SubmitOrder() },
      ]);
    }

  }

  const SubmitOrder = () => {
    let req = {
      cart: selectedProducts,
      crop: selectedCrops.name,
      farmer: selectedFarmer.id,
      dealer_mobile: selectedDelers.id,
      expected_date:delivery_date.value,
      payment_method:payment_method.value
    }
    if (amount > 99){
      req.amount = amount
    }else{
      alert('Please Enter Valid Amount')
      return
    }
    console.log(req)
    AuthenicationService.checkoutProductKit(req).then(r => {
      console.log(r)
      setiscartloading(false)
      if (r.status == true) {
        setselectedProducts([])
        item.cart = []
        ToastAndroid.showWithGravityAndOffset(
          r?.message,
          ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50)
          setVisible(true)
        // navigation.goBack()
      } else {
        ToastAndroid.showWithGravityAndOffset(
          r?.message,
          ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50)
      }
    }).catch(e => {
      setiscartloading(false)
      ToastAndroid.showWithGravityAndOffset(
        'Network Error No Internet',
        ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50)
    })
  }
  const [delivery_date, setdelivery_date] = useState({label:'Expected Delivery Date', value:new Date(), type:'date', key:'expected_date'}  )
  const [payment_method, setpayment_method] = useState({label:'Payment Method', value:'', options:["CASH Payment","UPI"], type:'select', }  )
  const [amount, setamount] = useState(0 )
  const [visible, setVisible] = React.useState(false);

  return (
    <SafeAreaView style={mstyle.container1}>
        <ModalPoup visible={visible}>
        <View style={{alignItems: 'center'}}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => {
            
              setVisible(false)
              navigation.goBack()
              }}>
            <Icon name='close-circle-outline' style={{color:'red', fontWeight:'bold'}} size={30} />
            </TouchableOpacity>
          </View>
        </View>
        {payment_method.value=='UPI'?(
          <View style={{alignItems: 'center'}}>
          {/* <Icon name='checkmark-circle-outline' style={{color:'green', fontWeight:'bold'}} size={150} /> */}
          <Image
            source={{uri:selectedDelers.qr_code}}
            style={{maxHeight: 350, minHeight:250, width: '100%', }}
          />
          {/* <Image
          source={require('../../assets/images/check.png')}
          style={{height: 50, width: 50, marginVertical: 10}}
        /> */}
        </View>
        ):
        (
          <View style={{alignItems: 'center'}}>
          {/* <Icon name='checkmark-circle-outline' style={{color:'green', fontWeight:'bold'}} size={150} /> */}
          <Image
            source={require('../../assets/images/check.png')}
            style={{height: 150, width: 150, }}
          />
          
        </View>
        )}

        <Text style={{marginVertical: 10, fontSize: 20,color:'green',fontWeight:'bold', textAlign: 'center'}}>
          Congratulations 
        </Text><Text style={{ fontSize: 15,color:'black',fontWeight:'bold', textAlign: 'center'}}>
        Advance Booking was successfully
        </Text>
      </ModalPoup>
      {/* <Button title="Open Modal" onPress={() => setVisible(true)} /> */}
     {data.length ? (
      <View>
<FlatList
        refreshing={loading}
        onRefresh={() => {
          getData()
        }}
        data={data}
        ListHeaderComponent={() => {
          return (
            <View>      
            <View style={{ marginVertical: 10, marginTop: 1 }}>
              <Text style={{ color: 'black',fontSize:15,textAlign:'center', }}> Select <Text style={{ fontWeight: 'bold' }}>{selectedCrops?.name}</Text> Product Kit</Text>
            </View>
            </View>
          )
        }}

        ListEmptyComponent={() => {
          return (
            <View style={{ marginHorizontal: 10, marginTop: 10 }}>
              <Text style={{ color: 'gray', fontSize: 15, textAlign: 'center', paddingTop: 100 }}>
                Please Select Crop No Any Product Kit Available

              </Text>
            </View>
          )
        }}
        renderItem={(item) => {
          return (
            <View style={{ flex: 1, }}>
              <Pressable onPress={() => {addProductTocart(item.item)
              }}
              style={{ flex: 1, flexDirection: 'row' }}>

                <Card item={item} />
              </Pressable>

             {item.item.quantity>0?(
              <Pressable style={{flexDirection:'row', alignSelf:'center', marginBottom:15}} 
              onPress={() => { removeProductTocart(item.item) }}
              >
              <Icon 
                 name={'remove-circle'} size={23} style={{  paddingRight: 5, color: 'red' }} />
                 <Text style={{paddingTop:2,color:'red',fontWeight:'bold'}}>Remove product from cart</Text>
              </Pressable>
             ):''}
              {/* <Text style={{ paddingTop: 15, paddingRight: 5, color: 'black' }}>{item.item.quantity}  </Text> */}
             

              {/* <Icon onPress={() => { addProductTocart(item.item) }}
                name={'add-circle'} size={25} style={{ paddingTop: 15, paddingRight: 10, color: 'green' }} /> */}
            </View>
          )
        }} />

<View>
<Text style={mstyle.content}>
          Enter Token Amount
        </Text>
<View style={mstyle.inputContainer}>
          <View style={mstyle.inputSubContainer}>
            
            <TextInput
              placeholder="00.00" keyboardType='numeric'
              placeholderTextColor={Colors.DEFAULT_GREY}
              selectionColor={Colors.DEFAULT_GREY}
              style={mstyle.inputText}
              maxLength={10}
              onChangeText={text => setamount(text)}
              value={amount}
            />
          </View>
        </View>
</View>
      <Pressable onPress={() => {
        bookProductKit()
      }}>
        <Buttons title={'Book Now'} loading={iscartloading} />

      </Pressable>
      </View>
     ):(
      <View>
         <View style={[mstyle.inputContainer1, {
        backgroundColor: 'white',
        
      }]}>
        <Text style={{ color: 'black' }}> Select Famer</Text>

        <View style={mstyle.inputSubContainer}>
          {selectedFarmer ? (
            <View style={{
              padding: 8, marginTop: 2, flexDirection: 'row',
              backgroundColor: 'white', borderColor: 'silver',
              borderWidth: 1, borderRadius: 5, width: '100%'
            }}>

              <Text style={{ color: 'black', width: '90%',fontSize:15,fontWeight:'bold' }}> {selectedFarmer.name}</Text>
              <Icon onPress={() => { setselectedFarmer() }} name='close-circle-outline' size={25} style={{ color: 'red' }}></Icon>

            </View>
          ) : (
            <SearchableDropDown
              onItemSelect={(item) => {
                // const items = selectedCrops;
                // items.push(item)
                setselectedFarmer(item)

                console.log(selectedFarmer)
              }}
              containerStyle={{ padding: 1, width: '100%' }}
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
              items={farmers}
              defaultIndex={2}
              resetValue={false}
              textInputProps={
                {
                  placeholder: "Search Farmer",
                  underlineColorAndroid: "transparent",
                  style: {
                    padding: 8,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                    color: "black"
                  },
                  onTextChange: text => {
                    searchFilterFunctionFarmer(text)
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

      <View style={[mstyle.inputContainer1, {
        backgroundColor: 'white',
         marginTop: 7,
      }]}>
        <Text style={{ color: 'black' }}> Select Crop</Text>

        <View style={mstyle.inputSubContainer}>
          {selectedCrops ? (
            <View style={{
              padding: 8, marginTop: 2, flexDirection: 'row',
              backgroundColor: 'white', borderColor: 'silver',
              borderWidth: 1, borderRadius: 5, width: '100%'
            }}>

              <Text style={{ color: 'black', width: '90%',fontSize:15,fontWeight:'bold' }}> {selectedCrops.name}</Text>
              <Icon onPress={() => { setselectedCrops() }} name='close-circle-outline' size={25} style={{ color: 'red' }}></Icon>

            </View>
          ) : (
            <SearchableDropDown
              onItemSelect={(item) => {
                // const items = selectedCrops;
                // items.push(item)
                setselectedCrops(item)
                // searchFilterFunction(item.name)

                console.log(selectedCrops)
              }}
              containerStyle={{ padding: 3, width: '100%' }}
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
                    padding: 8,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                    color: "black"
                  },
                  onTextChange: text => {
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

      <View style={[mstyle.inputContainer1, {
        backgroundColor: 'white', marginTop: 7,
        
      }]}>
        <Text style={{ color: 'black' }}> Select Dealer</Text>
        <View style={mstyle.inputSubContainer}>
          {selectedDelers ? (
            <View style={{
              padding: 8, marginTop: 2, flexDirection: 'row',
              backgroundColor: 'white', borderColor: 'silver',
              borderWidth: 1, borderRadius: 5, width: '100%'
            }}>

              <Text style={{ color: 'black', width: '90%',fontSize:15,fontWeight:'bold' }}> {selectedDelers.name}</Text>
              <Icon onPress={() => { setselectedDelers() }} name='close-circle-outline' size={25} style={{ color: 'red' }}></Icon>

            </View>
          ) : (
            <SearchableDropDown
              onItemSelect={(item) => {
                // const items = selectedCrops;
                // items.push(item)
                setselectedDelers(item)
                console.log(selectedDelers)
              }}
              containerStyle={{ padding: 3, width: '100%' }}
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
                    padding: 8,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                    color: "black"
                  },
                  onTextChange: text => {

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
      <View >
        <MYinputs item={delivery_date} />
      </View>
      <View >
        <MYinputs item={payment_method} />
      </View>
     

      <Pressable onPress={() => {
        searchFilterFunction(selectedCrops?.id)
      }}>
        <Buttons title={'Get Crop Product Kit Now'} loading={iscartloading} />

      </Pressable>
      </View>
     )}

      


    
      </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
export default FramerProductKitScreen