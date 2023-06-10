import { View, Text, FlatList, Pressable, TextInput, ToastAndroid, Alert, Modal, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Card from '../../../components/Card'
import mstyle from '../../../mstyle'
import { Colors } from '../../../contants'
import { useEffect } from 'react'
import { AuthenicationService } from '../../../services'
import Icon from 'react-native-vector-icons/Ionicons';
import CameraPermission from '../../../services/permissionservices'
import { launchCamera } from 'react-native-image-picker'
import MYinputs from '../../../components/MYinputs'
import { Button } from 'react-native-share'
import Buttons from '../../../components/Buttons'


const FreeSampleBeneficiariesScreen = ({ navigation, route: {
  params: { item },
}, }) => {

  const [data, setdata] = useState([])
  const [captureimage, setsetcaptureimage] = useState("")
  const [modalVisible, setModalVisible] = useState(false)
  const [searchText, setsearchText] = useState('')
  const [farmerName, setfarmerName] = useState('')
  const [farmerNumber, setfarmerNumber] = useState('')
  const [IsLoading, setIsLoading] = useState(false)

  const searchFilterFunction = (text) => {
    let req = {
      "text": text
    }
    // // console.log(text)
    AuthenicationService.searchfarmerData(req)
      .then(x => {
        if (x.status == true) {
          let mapped_array = []
          x.data.forEach(a => {
            mapped_array.push({ "title": `${a.first_name} ${a.last_name}`, "name": a.free_sample_name,  "second_subtitle": `TFT app:${a.app_installed?a.app_installed:'Installed'}, Crop added : ${a.crop_added?'Yes':'No'} `, "subtitle": a.mobile_number, "free_sample": a.free_sample, "status": a.free_sample ? a.free_sample : 'Add Sample' })
          })
          setdata(mapped_array)
        } else {
        }
      })
  }


  useEffect(() => {
    // getData()
    searchFilterFunction("")
  }, [])

  const checkfarmer = (farmer) => {
    // console.log(farmer)
    let msg = `Are you sure you add ${farmer.title} for free sample ?`
    let msg1 = ` ${farmer.title} Alredy have a free sample product `
    Alert.alert('Confirmation!', `${farmer.free_sample ? msg1 : msg}`, [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      { text: 'YES', onPress: () => farmer.free_sample ? OpenDropDown(farmer) : startCamera(farmer) },
    ]);
  }

  const startCamera = (farmer) => {

    CameraPermission()
    let options = {
      includeBase64: true,
      mediaType: 'photo',
      saveToPhotos: true,
      quality: 0.3


    };

    launchCamera(options, (response) => {
      // // console.log(response.assets);

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
        // setcaptureimage("")
        // setcaptureimage(basse64image)

        submit(farmer, basse64image)


      }
    });

  }


  const OpenDropDown = (farmer) => {
    // console.log(farmer)
    if (farmer.free_sample == "Purchased") {
      Alert.alert("Farmer Already updated")
    } else {

      Alert.alert(`Change status ${farmer.free_sample} to ${farmer.free_sample == "Used" ? "Results" : "Purchased"}`, `Are you sure you Update ${farmer.title} for free sample ?`, [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'YES', onPress: () => update(farmer) },
        // { text: 'Update', onPress: () => update(farmer) },
      ]);
    }
  }


  const update = (farmer) => {
    if (farmer.free_sample === "Used") {
      farmer.status = "Results"
    }
    if (farmer.free_sample === "" || farmer.free_sample === false) {
      farmer.status = "Used"
    }
    if (farmer.free_sample === "Results") {
      farmer.status = "Purchased"
    }
    req = {
      farmer: farmer.subtitle,
      status: farmer.status,
      fsd_name: farmer.name
    }
    if (item) {
      req.crop_seminar_name = item.value.item.crop.name
    }
    // console.log(req)
    AuthenicationService.update_status_free_sample(req).then(x => {
      // console.log(x)
      if (x.status) {
        searchFilterFunction("")
        ToastAndroid.showWithGravityAndOffset(
          'Farmer status successfully updated',
          ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
        );
      } else {
        ToastAndroid.showWithGravityAndOffset(
          'Farmer Not Submited Please Try Again',
          ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
        );

      }

    })
  }


  const submit = (farmer, image) => {
    req = {
      farmer: farmer.subtitle,
      image: image,
    }
    if (item) {
      req.name = item.value.item.crop.name
    }
    // console.log(req)
    AuthenicationService.create_free_sample(req).then(x => {
      // console.log(x)
      if (x.status) {
        searchFilterFunction("")
        ToastAndroid.showWithGravityAndOffset(
          'Farmer Successfully Submited',
          ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
        );
      } else {
        ToastAndroid.showWithGravityAndOffset(
          'Farmer Not Submited Please Try Again',
          ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
        );

      }

    })
  }


  const Create_Farmer = () => {
   if(IsLoading==false){
    req = {
      farmer_name: farmerName,
      mobile_no: farmerNumber
    }
    if (!farmerName) {
      alert('Please  enter farmer name')
      return
    }
    if (!farmerNumber) {
      alert('Please  enter farmer mobile number')
      return
    }
    // console.log(req)
    setIsLoading(true)
    AuthenicationService.create_farmer(req).then(x => {
      setIsLoading(false)
      // console.log(x)
      if (x.status) {
        setfarmerName('')
        setfarmerNumber('')
        setModalVisible(false)
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
    <View style={mstyle.container1}>

      <View style={mstyle.inputContainer}>
        <View style={mstyle.inputSubContainer}>

          <TextInput
            placeholder={'Type something'}
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            style={mstyle.inputText}
            onChangeText={text => {
              setsearchText(text)
              searchFilterFunction(text)
            }}
          />
        </View>
      </View>

      <View>
        <Pressable onPress={() => {
          if (searchText?.length > 9 || Number(searchText)=='number') {
            setfarmerNumber(searchText)
            setfarmerName('')
          }else{
            setfarmerName(searchText)
            setfarmerNumber('')
          }
          setModalVisible(true)
        }} >
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black', textAlign: 'center',paddingVertical:10 }}>Do you wants to add new farmer?
            <Text style={{ color: Colors.GOOGLE_BLUE }}> YES</Text></Text>
        </Pressable>
      </View>

      <Modal
        animationType="slide"
        // transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={{ padding: 10, margin: 10,backgroundColor:'white' }}>
          <Text style={{ textAlign: 'right', fontSize: 15, color: 'red', fontWeight: '700' }} onPress={() => { setModalVisible(false) }}>X</Text>
          <Text style={{ fontSize: 25, fontWeight: '600', color: 'black' }}>Create New Farmer</Text>

          <View style={[mstyle.inputContainer1, { marginTop: 8 }]}>
            <Text style={{ color: 'black', marginHorizontal: 8, fontSize: 15 }}>
              Farmer Name
            </Text>
            <View style={mstyle.inputContainer}>
              <View style={mstyle.inputSubContainer}>
                <TextInput
                  placeholder={'Enter farmer name'}
                  placeholderTextColor={Colors.DEFAULT_GREY}
                  selectionColor={Colors.DEFAULT_GREY}
                  style={mstyle.inputText}
                  onChangeText={text => {
                    setfarmerName(text)
                  }}
                  value={farmerName}
                />
              </View>
            </View>

          </View>
          <View style={[mstyle.inputContainer1, { marginTop: 8 }]}>
            <Text style={{ color: 'black', marginHorizontal: 8, fontSize: 15 }}>
              Farmer Mobile Number
            </Text>
            <View style={[mstyle.inputContainer, { marginTop: 8 }]}>
              <View style={mstyle.inputSubContainer}>
                <TextInput
                  placeholder={'Enter farmer number'} keyboardType='numaric'
                  placeholderTextColor={Colors.DEFAULT_GREY}
                  selectionColor={Colors.DEFAULT_GREY}
                  style={mstyle.inputText}
                  onChangeText={text => {
                    setfarmerNumber(text)
                  }}
                  value={farmerNumber}
                />
              </View>
            </View>
          </View>
<Pressable onPress={()=>{Create_Farmer()}}>
<Buttons title={'Submit Farmer'} loading={IsLoading}/>

</Pressable>

        </View>
      </Modal>

      <FlatList

        data={data}
        renderItem={(item) => {
          return (
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <Pressable style={{ flexDirection: 'row', flex: 1 }}
                onPress={() => { checkfarmer(item.item) }} >
                <Card item={item} />
              </Pressable>
              {/* {item.item.free_sample?( 
            <View>
              <Icon onPress={()=>{
              OpenDropDown(item.item)

            }} name={'chevron-down-outline'} 
                size={22} 
                style={{paddingTop:15,paddingRight:20,color:'gray'}}
            />
            <Text style={{paddingTop:15,paddingRight:20,color:'green',fontWeight:'bold', fontSize:12}}>
              {item.item.free_sample}
            </Text>
              </View>
            
            ):(null)} */}

            </View>
          )
        }} />
      {/* <Pressable onPress={() => { navigation.navigate('AddFarmer') }}>
        <FabButton />

      </Pressable> */}


    </View>
  )
}

export default FreeSampleBeneficiariesScreen