import {
  View, Text, FlatList, Pressable, TextInput, Linking, ToastAndroid, Alert, Button, ScrollView, SafeAreaView,
  StyleSheet, Modal, Animated, TouchableOpacity, Image,
} from 'react-native'
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
import CameraPermission from '../../services/permissionservices'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { ActivityIndicator } from 'react-native-paper'
import submitReqData from '../../services/FormData'


const ModalPoup = ({ visible, children }) => {
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
          style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};



const FramerProductKitScreen = ({ navigation, props,
  route: {
    params: { farmerData },
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
  const [imageloading, setimageloading] = useState(false)
  const [delivery_date, setdelivery_date] = useState({ label: 'Expected Delivery Date', value: new Date(), type: 'date', key: 'expected_date' })
  // const [kit_type, setkit_type] = useState({ label: 'Product Kit Type', value: new Date(), type: 'select',value: '', options: ["Standard CNP", "Premium CNP"], key: 'kit_type' })
  
  const [payment_method, setpayment_method] = useState({ label: 'Payment Method', value: '', options: ["Cash", "UPI"], type: 'select', })
  const [amount, setamount] = useState(0)
  const [visible, setVisible] = React.useState(false);

  const [crop_bundle_list, setcrop_bundle_list] = useState([{title:'Bulb Crops', large_image:'https://crop.erpgeolife.com/files/bulb crops.jpg'},
  {title:'Leafy Vegetables', large_image:'https://crop.erpgeolife.com/files/Leafy veg.jpg'},
  {title:'Paddy', large_image:'https://crop.erpgeolife.com/files/paddy.....jpg'},
  {title:'Vegetables', large_image:'https://crop.erpgeolife.com/files/veg.jpg'}])
  const [crop_bundle, setcrop_bundle] = useState('')
  const [CNP_kit_type, setCNP_kit_type] = useState([
  {title:'With Soil Application', large_image:'https://crop.erpgeolife.com/files/with_soil.jpg'},
  {title:'Without Soil Application', 
  large_image:'https://crop.erpgeolife.com/files/without_soil.jpg'}
])
const [cnp_type, setcnp_type] = useState('')
const [qrcode, setqrcode] = useState('')
const [FarmerShowModal, setFarmerShowModal] = useState(false)
const [newForm, setnewForm] = useState([
  { label: 'Farmer First Name', placeholder: 'Ex. - Rama', key: 'first_name', value: '', keyboard: 'text' },
  { label: 'Farmer Last Name', placeholder: 'Ex. - Dash', key: 'last_name', value: '', keyboard: 'text' },
  { label: 'Pincode', placeholder: 'Ex. - 492001', key: 'pincode', value: '', keyboard: 'numeric', len: 6 },
  { label: 'City', placeholder: 'Ex. - Pune', key: 'city', value: '', keyboard: 'text' },
  { label: 'Nearest Market Where Farmer Purchase', type:'select',options:[], link_doctype:'Geo Market', key: 'market', value: '', keyboard: 'text' },
  { label: 'Mobile Number', placeholder: 'Ex. - 9876543210', key: 'mobile_no', value: '', keyboard: 'numeric', len: 10 },
  { label: 'Select Crop', placeholder: '',type:'select',options:[], link_doctype:'Crop', key: 'crop', value: '', keyboard: 'text' },
  { label: 'Date Of Sowing', placeholder: '', key: 'data_of_sowing', type:'date', value:new Date(), keyboard: 'text' },
  { label: 'Farm In Acres', placeholder: 'Ex. - 15', key: 'acre', value: '', keyboard: 'numeric' },

])
const [IsLoading, setIsLoading] = useState(false)
const [transaction_id, settransaction_id] = useState({ label: 'Payment Transaction Id',placeholder:'Transaction id', value:'', type: 'text', key: 'transaction_id' })




  const searchFilterFunction = (text) => {
    // if (selectedCrops?.id) {
    if (crop_bundle) {
      setloading(true)
      setserachingData(true)
      let req = {
        "text": text
      }
      if(!selectedDelers?.id){
        alert('Please Select Dealer')
        return
      }
        // req.text = selectedCrops?.id
        req.text = crop_bundle
        req.cnp_type= cnp_type
        // req.kit_type=kit_type.value
        req.dealer = selectedDelers.id
        // if(!kit_type.value){
        //   alert('Please Select Product Kit Type')
        //   return
        // }

        
      
      // console.log(req)
      AuthenicationService.searchProductKitData(req)
        .then(x => {
          // console.log(x)
          setserachingData(false)
          setloading(false)

          if (x.status == true) {
            let mapped_array = []
            x.data.forEach(a => {
              mapped_array.push({ "subtitle": `Price - ${a.price}`,"price": a.price, "title": a.kit_name, "quantity": 0, "status": 'Add to Cart', "percent": 0, "name": a.name })
            })
            setdata(mapped_array)
          } else {
          }
        })
    } else {
      alert('Please select crop')
    }
  }


  const searchFilterFunctionFarmer = (text) => {
    // setloading(true)
    // setserachingData(true)
    let req = {
      "text": text,
      "all_farmer":1
    }
    if (text == '') {
      req.text = false
    }
    // // console.log(text)
    AuthenicationService.searchfarmerData(req)
      .then(x => {
        // setserachingData(false)
        // setloading(false)
        if (x.status == true) {
          let mapped_array = []
          x.data.forEach(a => {
            mapped_array.push({ "name": `${a.first_name} ${a.last_name} (${a.name})`, "id": a.name, })
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
      // console.log(    cart.reduce((a, b) => a + (b['price'] || 0), 0)      )
      // setselectedProducts(cart)
    }
    // console.log(data)
    // setloading(false)
    getData()
    getSelectedproducts()

  }

  const removeProductTocart = (product) => {
    setloading(true)

    let cart = data
    for (let [index, p] of cart.entries()) {
      if (p.title === product.title) {
        if (p.quantity == 2) {
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
    if (farmerData) {
      // console.log(farmerData)
      setselectedFarmer(farmerData)
    }
    // searchFilterFunctionFarmer(' ')
    getDealers()
    getCrops()
    getData()
  }, [])


  const getCrops = () => {
    let req = {
      "text": ''
    }
    AuthenicationService.searchCropData(req)
      .then(x => {
        // console.log(x.data)
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
        // console.log(error)
      })
  }

  const getDealers = () => {
    let req = {
      "text": ''
    }
    AuthenicationService.searchdealerData(req)
      .then(x => {
        // console.log("kjh sakfsj",x.data)
        if (x.status == true) {
          let mapped_array = []
          x.data.forEach(a => {
            mapped_array.push({ "name": `${a.dealer_name}`, "id": a.mobile_number, "qr_code": a.qr_code })
          })
          setdealers(mapped_array)
        } else {
        }
      })
      .catch(error => {
        // console.log(error)
      })
  }
  const getSelectedproducts = () => {
    let s_item = []
    let  m_amount =0
    for (let p of data) {
      if (p.quantity > 0) {
        s_item.push(p)
        m_amount= m_amount+(500*p.quantity)
        setamount(m_amount)
       
        // console.log(m_amount)
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
    // console.log(selectedProducts)

    // if (!selectedCrops?.name) {
    //   alert('Please select crop')
    //   return
    // }

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
        { text: 'YES', onPress: () =>{
if(payment_method.value=="UPI"){
  setVisible(true)
}else{
  SubmitOrder('')
}

        }
      },
      ]);
    }

  }
const [booking_id, setbooking_id] = useState('')

  const SubmitOrder = (basse64image) => {
  if(imageloading == false){
    setimageloading(true)
    console.log(getSelectedproducts())
if (transaction_id==''){
  Alert.alert('Please add transaction ID')
  return
}
    let req = {
      cart: selectedProducts,
      // crop: selectedCrops.name,
      farmer: selectedFarmer.id,
      dealer_mobile: selectedDelers.id,
      expected_date: delivery_date.value,
      payment_method: payment_method.value,
      image:basse64image?basse64image:'',
      transaction_id:transaction_id,
      
      
    }
    req.amount = amount
    // if (!amount) {
    //   req.amount = amount
    // } else {
    //   alert('Please Enter Valid Amount')
    //   return
    // }
    // console.log(req)
    AuthenicationService.checkoutProductKit(req).then(r => {
      // console.log(r)
      // console.log(r?.msg?.template?.components[0]?.parameters)
      setiscartloading(false)
      setimageloading(false)

      if (r.status == true) {
        setselectedProducts([])
        // item.cart = []
        setbooking_id(r.name)
        ToastAndroid.showWithGravityAndOffset(
          r?.message,
          ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50)
        setVisible(true)
       
          navigation.goBack()
        

        // navigation.goBack()
      } else {
        ToastAndroid.showWithGravityAndOffset(
          r?.message,
          ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50)
      }
    })
    .catch(e => {
      setiscartloading(false)
      ToastAndroid.showWithGravityAndOffset(
        'Network Error No Internet',
        ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50)
    })
  }
  }


  const [capturedImage, setcapturedImage] = useState('')
  const startCamera = (cap_type) => {

    CameraPermission()
    let options = {
      includeBase64: true,
      mediaType: 'photo',
      saveToPhotos: true,
      quality: 0.3
    };
if(cap_type=='gallery'){


launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        // const source = { uri: response.uri };
        // // console.log('response', JSON.stringify(response.assets[0].base64));
        const basse64image = 'data:image/jpeg;base64,' + JSON.stringify(response?.assets[0].base64)
        // UploadRefrenceImage(basse64image)
        setcapturedImage(basse64image)
        SubmitOrder(basse64image)
      }
    });

  }else{

    launchCamera(options, (response) => {
      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        // const source = { uri: response.uri };
        // // console.log('response', JSON.stringify(response.assets[0].base64));
        const basse64image = 'data:image/jpeg;base64,' + JSON.stringify(response?.assets[0].base64)
        // UploadRefrenceImage(basse64image)
        setcapturedImage(basse64image)
        SubmitOrder(basse64image)
      }
    });


  }

  }

  const UploadRefrenceImage=(basse64image)=>{

    // if(imageloading==false){
      setimageloading(true)
     
    req={
      'image':basse64image,
      "ref_number":booking_id,
      farmer: selectedFarmer.id,
      dealer_mobile: selectedDelers.id,
      amount: amount,
      payment_method: payment_method.value
    }
    AuthenicationService.checkoutPaymentUpdate(req).then(r => {
      // console.log(r)
      setimageloading(false)
      if (r.status == true) {
        setVisible(false)
        navigation.goBack()
        ToastAndroid.showWithGravityAndOffset(
          'Payment Receipt Uploaded Done',
          ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
        );
      }else{
        ToastAndroid.showWithGravityAndOffset(
            'Oops! Something went please try again',
            ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
          );

      }

    }).catch(e=>{
      ToastAndroid.showWithGravityAndOffset(
        'Oops! Something went please try again',
        ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
      );
    })
    // }

  }

  const Create_Farmer = () => {
    if(IsLoading==false){
      req = submitReqData(newForm)
     if (!req.first_name) {
       alert('Please  enter farmer name')
       return
     }
     if (!req.pincode) {
       alert('Please  enter farmer pincode')
       return
     }
     if (!req.mobile_no) {
      alert('Please  enter farmer mobile number')
      return
    }
    //  console.log(req)
     setIsLoading(true)
     AuthenicationService.create_farmer(req).then(x => {
       setIsLoading(false)
      //  console.log(x)
       if (x.status) {
         setFarmerShowModal(false)
         ToastAndroid.showWithGravityAndOffset(
           x.message,
           ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
         );
       } else {
         ToastAndroid.showWithGravityAndOffset(
           'Farmer Not Submited Please Try Again',
           ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
         );
 
       }
 
     }).catch(e=>{
       setIsLoading(false)
       ToastAndroid.showWithGravityAndOffset(
         'No internet connection',
         ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
       );
     })
    }
   }
 

  return (
    <SafeAreaView style={mstyle.container1}>

      <ModalPoup visible={imageloading}>
        <View style={{ alignItems: 'center' }}>
          <View style={[styles.header,{ flexDirection:'row'}]}>
           <Text style={{fontSize:22, color:'black'}}> Loading </Text> 
           <ActivityIndicator/>

            </View>
            </View>
      </ModalPoup>
      
      <ModalPoup visible={visible}>
        <View style={{ alignItems: 'center' }}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => {
              if (payment_method.value == 'UPI') {

              } else {
                setVisible(false)
                navigation.goBack()
              }

            }}>
              <Icon name='close-circle-outline' style={{ color: 'red', fontWeight: 'bold' }} size={30} />
            </TouchableOpacity>
          </View>
        </View>
        {payment_method.value == 'UPI' ? (
          <View style={{ alignItems: 'center' }}>
            {/* <Icon name='checkmark-circle-outline' style={{color:'green', fontWeight:'bold'}} size={150} /> */}
           {selectedDelers?.qr_code?(
                      <Image
                        source={{ uri: selectedDelers?.qr_code.replace('/private','') }}
                        style={{ height: 350, width:250, }}
                        resizeMode='contain'
                      />

           ):(
            <View>
               <Image
                    source={require('../../assets/images/noimg.jpg')}
                    style={{ height: 350, width: 250, }}
                    resizeMode='contain'
              />
            </View>

           )} 

           <View>

            <MYinputs item={transaction_id} />

           </View>

            <View style={{flexDirection:'row'}}>
            {/* <Pressable
              onPress={() => startCamera('gallery')} style={{
                alignSelf: 'center',  marginVertical: 10,
                backgroundColor: 'white', borderRadius: 50,paddingHorizontal:10
              }} >
              <Icon name='image-outline' size={30} style={{ alignSelf: 'center', backgroundColor: Colors.LIGHT_GREEN, color: 'green', borderRadius: 50, padding: 5 }} />
              <Text style={{color:'black'}}>Gallery</Text>

            </Pressable> */}

            <Pressable
              onPress={() => startCamera()} style={{
                alignSelf: 'center',  marginVertical: 10,
                backgroundColor: 'white', borderRadius: 50,paddingHorizontal:10
              }} >
              <Icon name='camera' size={30} style={{ alignSelf: 'center', backgroundColor: Colors.LIGHT_GREEN, color: 'green', borderRadius: 50, padding: 5 }} />
              <Text style={{color:'black'}}>Camera</Text>

            </Pressable>
            </View>
            <Text style={{color:'red'}}>Upload payment receipt</Text>

            {/* <Image
          source={require('../../assets/images/check.png')}
          style={{height: 50, width: 50, marginVertical: 10}}
        /> */}
          </View>
        ) :
          (
            <View style={{ alignItems: 'center' }}>
              {/* <Icon name='checkmark-circle-outline' style={{color:'green', fontWeight:'bold'}} size={150} /> */}
              <Image
                source={require('../../assets/images/check.png')}
                style={{ height: 150, width: 150, }}
              />

            </View>
          )}

        {/* <Text style={{ marginVertical: 10, fontSize: 20, color: 'green', fontWeight: 'bold', textAlign: 'center' }}>
          Congratulations
        </Text><Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold', textAlign: 'center' }}>
          Advance Booking was successfully
        </Text> */}
      </ModalPoup>

      <Modal
        animationType="slide"
        // transparent={true}
        visible={FarmerShowModal}
        onRequestClose={() => {
          setFarmerShowModal(!FarmerShowModal);
        }}>
        <ScrollView style={{ padding: 10,  backgroundColor: 'white' }}>
          <Text style={{ textAlign: 'right', fontSize: 15, color: 'red', fontWeight: '700' }} 
          onPress={() => { setFarmerShowModal(false) }}>X</Text>
          <Text style={{ fontSize: 20,textAlign:'center', fontWeight: '600', color: 'black' }}>Create New Farmer</Text>
          <FlatList 
          data={newForm}
          renderItem={({item})=>{
            return(
              <View>
                <MYinputs item={item} />
                </View>
            )
          }}
          ListFooterComponent={()=>{
            return(
              <Pressable onPress={() => { Create_Farmer() }}>
              <Buttons title={'Submit Farmer'} loading={IsLoading} />
            </Pressable>
            )
          }}
          />
          
         

        </ScrollView>
      </Modal>

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
                    <Text style={{ color: 'black', fontSize: 15, textAlign: 'center', }}>
                       {/* Select <Text style={{ fontWeight: 'bold' }}>{selectedCrops?.name}</Text> Product Kit</Text> */}
                       Select <Text style={{ fontWeight: 'bold' }}>{crop_bundle}</Text> Product Kit</Text>

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
                  {/* <Text style={{ paddingTop: 15, paddingRight: 5, color: 'black' }}>{item.item.quantity}  </Text> */}


                  {/* <Icon onPress={() => { addProductTocart(item.item) }}
                name={'add-circle'} size={25} style={{ paddingTop: 15, paddingRight: 10, color: 'green' }} /> */}
                </View>
              )
            }} />

          <View style={mstyle.inputContainer1}>
          <Text style={[mstyle.content,{fontWeight:'bold'}]}>
              Total payable amount :- 
            </Text><Text style={mstyle.content}>
              Enter Token Amount
            </Text>
            <View style={mstyle.inputContainer}>
              <View style={mstyle.inputSubContainer}>
                <View
                  // placeholder="00.00" keyboardType='numeric'
                  // placeholderTextColor={Colors.DEFAULT_GREY}
                  // selectionColor={Colors.DEFAULT_GREY}
                  style={mstyle.inputText}
                  // maxLength={19}
                  // onChangeText={text => setamount(text)}
                  
                >
                  <Text style={{fontSize:15, fontWeight:'bold', color:'black'}}>
                  Rs. - {amount}.00
                  </Text>

                  </View>
              </View>
            </View>
          </View>
          <Pressable onPress={() => {
            bookProductKit()
          }}>
            <Buttons title={'Book Now'} loading={iscartloading} />

          </Pressable>
        </View>
      ) : (

        <View>
          {crop_bundle =='' ? (
          <View>
            <Text style={{textAlign:'center', color:'black', fontSize:22,fontWeight:'bold', paddingVertical:5}}> CROP TYPE </Text>


            <FlatList
            data={crop_bundle_list}
            numColumns={2}
            style={{padding:5,elevation:8,marginBottom:2}}
            renderItem={(item)=>{
              return(
                <Pressable onPress={()=>{setcrop_bundle(item.item.title)}} 
                style={{flex:1,backgroundColor:'white',marginHorizontal:5, marginVertical:10,
                padding:1,borderColor:'black',borderWidth:.5,borderRadius:8}}>
                  {/* <Text>{item.item.title}</Text> */}
                  {/* <Card item={item} /> */}
                 <View style={{margin:1}}>
                 <Image source={{uri:item.item.large_image}} 
                 resizeMode={'contain'}
                 style={{width:'100%', height:200,borderRadius:8}}  />
                  </View>
                  </Pressable>
              )
            }}
            />

          </View>
          ):(
          <View>
            {cnp_type =='' ?(
            <View>
              <View>
                <Text style={{textAlign:'center', color:'black', fontSize:22,fontWeight:'bold', paddingVertical:5}}> CNP KIT TYPE </Text>
                </View>
                      <FlatList
                        data={CNP_kit_type}
                        // numColumns={2}
                        renderItem={(item) => {
                          return (
                            <Pressable onPress={()=>{setcnp_type(item.item.title)}}>
                              <Card item={item} />
                              {/* <Text>{item.name}</Text>
                              <Image source={require('../../../src/assets/images/w11.jpg')} 
                              style={{width:'100%', height:250}}  resizeMode="contain"/> */}
                            </Pressable>
                          )
                        }}
                      />


            </View>
              ):(
              <View>
                      <View>
                  <View style={[mstyle.inputContainer1, {
                    backgroundColor: 'white',

                  }]}>
                    <View style={{flexDirection:'row'}}>
                    <Text style={{ color: 'black' }}> Select Farmer <Text style={{fontWeight:'bold', fontSize:15}}>OR</Text>  </Text>
                    <Pressable onPress={()=>{
                      setFarmerShowModal(true)
                    }} >
                      <Text style={{color:Colors.GOOGLE_BLUE, fontWeight:'bold'}}>Add New Farmer</Text>
                    </Pressable>
                      </View>

                    <View style={mstyle.inputSubContainer}>
                      {selectedFarmer ? (
                        <View style={{
                          padding: 8, marginTop: 2, flexDirection: 'row',
                          backgroundColor: 'white', borderColor: 'silver',
                          borderWidth: 1, borderRadius: 5, width: '100%'
                        }}>

                          <Text style={{ color: 'black', width: '90%', fontSize: 15, fontWeight: 'bold' }}> {selectedFarmer.name}</Text>
                          <Icon onPress={() => { setselectedFarmer() }} name='close-circle-outline' size={25} style={{ color: 'red' }}></Icon>

                        </View>
                      ) : (
                        <SearchableDropDown
                          onItemSelect={(item) => {
                            // const items = selectedCrops;
                            // items.push(item)
                            setselectedFarmer(item)

                            // console.log(selectedFarmer)
                          }}
                          containerStyle={{ padding: 1, width: '100%' }}
                          modalContainer
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

                  {/* <View style={[mstyle.inputContainer1, {
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

                          <Text style={{ color: 'black', width: '90%', fontSize: 15, fontWeight: 'bold' }}> {selectedCrops.name}</Text>
                          <Icon onPress={() => { setselectedCrops() }} name='close-circle-outline' size={25} style={{ color: 'red' }}></Icon>

                        </View>
                      ) : (
                        <SearchableDropDown
                          onItemSelect={(item) => {
                            // const items = selectedCrops;
                            // items.push(item)
                            setselectedCrops(item)
                            // searchFilterFunction(item.name)

                            // console.log(selectedCrops)
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
                  </View> */}

                  <View style={[mstyle.inputContainer1, {
                    backgroundColor: 'white',
                    marginTop: 7,
                  }]}>
                    <Text style={{ color: 'black' }}> Selected Crop Bundle</Text>

                    <View style={mstyle.inputSubContainer}>
                      
                        <View style={{
                          padding: 8, marginTop: 2, flexDirection: 'row',
                          backgroundColor: 'white', borderColor: 'silver',
                          borderWidth: 1, borderRadius: 5, width: '100%'
                        }}>
                          <Text style={{ color: 'black', width: '90%', fontSize: 15, fontWeight: 'bold' }}>
                            {crop_bundle?crop_bundle:'not selected'}</Text>
                        </View>
                    </View>
                  </View>

                  <View style={[mstyle.inputContainer1, {
                    backgroundColor: 'white',
                    marginTop: 7,
                  }]}>
                    <Text style={{ color: 'black' }}> Selected Crop CNP Kit Type</Text>
                    <View style={mstyle.inputSubContainer}>
                        <View style={{
                          padding: 8, marginTop: 2, flexDirection: 'row',
                          backgroundColor: 'white', borderColor: 'silver',
                          borderWidth: 1, borderRadius: 5, width: '100%'
                        }}>
                          <Text style={{ color: 'black', width: '90%', fontSize: 15, fontWeight: 'bold' }}>
                            {cnp_type}</Text>
                        </View>
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

                          <Text style={{ color: 'black', width: '90%', fontSize: 15, fontWeight: 'bold' }}> {selectedDelers.name}</Text>
                          <Icon onPress={() => { setselectedDelers() }} name='close-circle-outline' size={25} style={{ color: 'red' }}></Icon>

                        </View>
                      ) : (
                        <SearchableDropDown
                          onItemSelect={(item) => {
                            // const items = selectedCrops;
                            // items.push(item)
                            setselectedDelers(item)
                            setqrcode(selectedDelers?.qrcode)
                            // console.log(selectedDelers)
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
                  {/* <View >
                    <MYinputs item={kit_type} />
                  </View> */}
                    <MYinputs item={delivery_date} />
                  </View>
                  <View >
                  <MYinputs item={payment_method} />
                  </View>


                  <Pressable onPress={() => {
                    searchFilterFunction()
                  }} style={{paddingBottom:50}}>
                    <Buttons title={'Get Crop Product Kit Now'} loading={iscartloading} />

                  </Pressable>
                      </View>
              </View>)}

          </View>
          
          )}


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