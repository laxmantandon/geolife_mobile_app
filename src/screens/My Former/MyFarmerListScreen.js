import { View, Text, FlatList, Pressable, TextInput, Linking, ActivityIndicator, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Card from '../../components/Card'
import FabButton from '../../components/FabButton'
import mstyle from '../../mstyle'
import { Colors } from '../../contants'
import { useEffect } from 'react'
import { AuthenicationService } from '../../services'
import Icon from 'react-native-vector-icons/Ionicons';
import { Modal } from 'react-native'
import MYinputs from '../../components/MYinputs'
import Buttons from '../../components/Buttons'
import submitReqData from '../../services/FormData'
import { ToastAndroid } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Display } from '../../utils'
import SearchableDropDown from 'react-native-searchable-dropdown';
import { RefreshControl } from 'react-native'
import { useRef } from 'react'

const MyFarmerListScreen = ({ navigation, route }) => {

  const [data, setdata] = useState([])
  const [serachingData, setserachingData] = useState(true)
  const [post_office, setpost_office] = useState([])

  const searchFilterFunction = (text) => {
    setserachingData(true)
    let req = {
      "text": text,
      "village": villages.value
    }
    console.log(req)
    AuthenicationService.searchfarmerData(req)
      .then(x => {
        setserachingData(false)

        if (x.status == true) {
          let mapped_array = []
          x.data.forEach(a => {
            mapped_array.push({ "title": `${a.first_name} ${a.last_name}`, "second_subtitle": `TFP app:${a.app_installed ? a.app_installed : 'Installed'}, Crop added : ${a.crop_added ? 'Yes' : 'No'} `, "subtitle": a.mobile_number, "call": a.mobile_number, "whatsapp": a.mobile_number, "city": a.city })
          })
          setdata(mapped_array)
          // setallfarmer(mapped_array)
        } else {
        }
      })
  }
  // const [allfarmer, setallfarmer] = useState([])

  useEffect(() => {
          // getData()
    // setFarmerShowModal(true)
    setTimeout(() => {
      setFarmerShowModal(false)

    }, 100);


    if (route.params?.item) {
      setFarmerShowModal(true)
    }
          // console.log(route?.params?.item)
    getvillages()
    searchFilterFunction("")
  }, [])

  // const handleSearch = text => {
  //   allfarmer.forEach(a => {
  //     mapped_farmer=[]


  //   });

  // };

  // const getData = ()=>{
  //   req=null
  //   AuthenicationService.farmerData(req).then(x => {
  //     x.text().then(m => {
  //       let y = JSON.parse(m)
  //       if (y.success == true) {
  //           let mapped_array = []
  //           y.data.forEach(a=> {
  //             mapped_array.push({"title": a.fullName, "subtitle": a.mobileNumber})
  //           })
  //           setdata(mapped_array)
  //       } else {
  //       }
  //     })
  //   })
  // }
  const [FarmerShowModal, setFarmerShowModal] = useState(false)
  const [newForm, setnewForm] = useState([
    { label: 'Farmer First Name', placeholder: 'Ex. - Rama', key: 'first_name', value: '', keyboard: 'text' },
    { label: 'Farmer Last Name', placeholder: 'Ex. - Dash', key: 'last_name', value: '', keyboard: 'text' },
    // { label: 'Pincode', placeholder: 'Ex. - 492001', key: 'pincode_code', value: '', keyboard: 'phone-pad', len: 6 },
    { label: 'Pincode', placeholder: 'Ex. - 492001', key: 'pincode', value: '', keyboard: 'phone-pad' },
    { label: 'Village Name', placeholder: 'Ex. - Village', key: 'village', value: '', keyboard: 'text' },
    { label: 'Nearest Market Where Farmer Purchase', type: 'searchable', options: [],filter:'name', link_doctype: 'Geo Market', key: 'market', value: '', keyboard: 'text' },
    { label: 'Mobile Number', placeholder: 'Ex. - 9876543210', key: 'mobile_no', value: '', keyboard: 'phone-pad', len: 10 },
    { label: 'Select Crop', placeholder: '', type: 'searchable',filter:'name', options: [], link_doctype: 'Crop', key: 'crop', value: '', keyboard: 'text' },
    { label: 'Date Of Sowing', placeholder: '', key: 'data_of_sowing', type: 'date', value: new Date(), keyboard: 'text' },
    { label: 'Farm In Acres', placeholder: 'Ex. - 15', key: 'acre', value: '', keyboard: 'numeric' },

  ])
  const [villages, setvillages] = useState({ label: 'Select Village', key: 'village', options: [], type: 'select', value: '', keyboard: 'numeric' })
  const [showvillage, setshowvillage] = useState([])
  const [IsLoading, setIsLoading] = useState(false)

  const getvillages = () => {

    let req = null
    AuthenicationService.get_villages(req).then(x => {
      setIsLoading(false)
      console.log('Villages', x)
      if (x.status) {
        // setFarmerShowModal(false)

        let vill = villages
        vill.options = x.data
        vill.value = x.data[0]
        setvillages(vill)
        console.log(villages)
        setshowvillage(true)
        // ToastAndroid.showWithGravityAndOffset(
        //   x.message,
        //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
        // );
      } else {
        ToastAndroid.showWithGravityAndOffset(
          'Villages Not Available Please Try Again',
          ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
        );

      }

    }).catch(e => {
      setIsLoading(false)
      console.log(e)
    })
  }

  const Create_Farmer = () => {
    if (IsLoading == false) {
      let req = submitReqData(newForm)
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



      req.address_data = newForm[2].data
      req.data_of_sowing = req.data_of_sowing.toISOString().split('T')[0]
      setIsLoading(true)
      console.log(req)

      AuthenicationService.create_farmer(req).then(x => {
        setIsLoading(false)
        console.log(x)
        if (x.status) {
          setFarmerShowModal(false)

          newForm.forEach(a => {
            a.value = ''

          });
          if (route.params?.item) {
            navigation.goBack()
          }
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

      }).catch(e => {
        setIsLoading(false)
        ToastAndroid.showWithGravityAndOffset(
          'No internet connection',
          ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
        );
      })
    }
  }

  const [loading, setloading] = useState(false)
  const [Pincode, setPincode] = useState('')
  const getData = React.useCallback(() => {
    setloading(true);
    setTimeout(() => {
      setloading(false);
    }, 2000);
  }, []);

  // const getData = () => {
  //   setTimeout(() => {
  //     setloading(false)
  //     clearTimeout();
  //   }, 1000)

  // }

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };
const scrollViewRef = useRef()
  return (
    <View style={mstyle.container1}>
      <Modal
        animationType="slide"
        // transparent={true}
        visible={FarmerShowModal}
        onRequestClose={() => {
          setFarmerShowModal(!FarmerShowModal);
        }}>
        <ScrollView keyboardShouldPersistTaps="handled"
        // ref={scrollViewRef}
        // onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}

          style={{ flex: 1, padding: 10, backgroundColor: 'white' }}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={getData} />
          }>

          <Text style={{ textAlign: 'right', fontSize: 15, color: 'red', fontWeight: '700' }}
            onPress={() => { setFarmerShowModal(false) }}>X</Text>
          <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: '600', color: 'black' }}>Create New Farmer</Text>

          {newForm.map(item => {

            return (
              <View>
                {item.key == 'pincode' ? (
                  <View>
                    <View style={[mstyle.inputContainer1, {
                      backgroundColor: 'white', marginTop: 7,
                    }]}>

                      <Text style={{ fontSize: 14, color: 'black', paddingBottom: 5, paddingHorizontal: 5, fontWeight: '400' }}>{item.label}</Text>


                      <View style={[mstyle.inputSubContainer, { flexDirection: 'column' }]}>

                        {item?.pincode ? (
                          <View style={{
                            padding: 8, marginTop: 2, flexDirection: 'row',
                            backgroundColor: 'white', borderColor: 'silver',
                            borderWidth: 1, borderRadius: 5, width: '100%'
                          }}>
                            <Text style={{ color: 'black', width: '90%', fontSize: 15, paddingVertical: 4, fontWeight: '600' }}> {item?.pincode}</Text>
                            <Pressable onPress={()=>{item.pincode =''
                          setPincode('')
                          setloading(true)
                          getData()}}>
                              <Icon name='close-circle-outline' size={25} style={{ color: 'red' }} />
                            </Pressable>

                          </View>
                        ) : null}

                        {item?.pincode ? (
                          <View style={{ width: '100%', marginTop: 8 }}>
                            <Text style={{ fontSize: 14, color: 'black', paddingBottom: 5, paddingHorizontal: 5, fontWeight: '400' }}>Select Post Office</Text>
                          </View>
                        ) : null}

                        {item.value ? (
                          <View style={{
                            padding: 8, marginTop: 2, flexDirection: 'row',
                            backgroundColor: 'white', borderColor: 'silver',
                            borderWidth: 1, borderRadius: 5, width: '100%'
                          }}>


                            <View style={{ flex: 1 }}>
                              {/* <Text style={{ color: 'black', width: '90%', fontSize: 15, fontWeight: '600' }}> {item?.value}</Text> */}
                              <Text style={{ color: 'black', width: '90%', fontSize: 14, fontWeight: '400' }}>{item?.data?.name}</Text>
                            </View>
                            <Icon onPress={() => {
                              item.value = ''
                              item.data = {}
                              setloading(true)
                              getData()

                            }} name='close-circle-outline' size={25} style={{ color: 'red' }}></Icon>

                          </View>
                        ) : (
                          <View style={{ width: '100%' }}>

                            <SearchableDropDown zIndex={999}
                              onItemSelect={(kitem) => {
                                console.log('clicked', kitem)
                                item.value = kitem.id
                                item.data = kitem
                                // newForm[3].value = kitem?.data.Block
                                // console.log('clicked', newForm[3].value)
                                setloading(true)
                                getData()


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
                              items={item?.mdata ? item.mdata : []}
                              // defaultIndex={}
                              resetValue={item?.reset ? true : false}

                              textInputProps={
                                {
                                  placeholder: item.label,
                                  placeholderTextColor: 'gray',
                                  underlineColorAndroid: "transparent",
                                  style: {
                                    padding: 8,
                                    borderWidth: 1,
                                    borderColor: '#ccc',
                                    borderRadius: 5,
                                    color: "black"
                                  },
                                  value: Pincode,

                                  onTextChange: text => {
                                    setPincode(text)
                                    if (text.length == 6) {

                                      let num = text.replace("/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/", '')
                                      if (isNaN(num)) {
                                        setPincode('')

                                      } else {
                                        item.pincode = text
                                        setPincode('')
                                        setloading(true)
                                        getData()
                                        console.log(item.pincode)
                                      }


                                    }
                                    var requestOptions = {
                                      method: 'GET',
                                      redirect: 'follow'
                                    };

                                    fetch(`https://api.postalpincode.in/pincode/${item.pincode}`, requestOptions)
                                      .then(response => response.text())
                                      .then(result => {
                                        let m = JSON.parse(result)
                                        console.log(m[0].Status)

                                        if (m[0].Status) {
                                          item.data = []
                                          let mn = []
                                          m[0].PostOffice.forEach(a => {
                                            mn.push({ 'data': a, 'name': `${a.Name}, ${a.Block}, ${a.District}, ${a.Circle}, ${a.Pincode}`, 'id': a.Pincode })
                                          });
                                          // setpost_office(mn)
                                          item.mdata = mn
                                          setloading(true)

                                          text + 1
                                          getData()
                                          console.log(item.mdata)

                                        }
                                      }
                                      )
                                      .catch(error => console.log('error', error));

                                  }
                                }
                                // }
                              }
                              listProps={
                                {
                                  nestedScrollEnabled: true,
                                }
                              }
                            />
                          </View>
                        )}

                      </View>
                    </View>
                  </View>

                ) :
                  (
                    <View>
                      <MYinputs item={item} />
                    </View>
                  )}
              </View>
            )
          })}
          <Pressable style={{ paddingBottom: 30 }} onPressIn={() => { Create_Farmer() }}>
            <Buttons title={'Submit Farmer'} loading={IsLoading} />
          </Pressable>

        </ScrollView>
      </Modal>

      <View style={[mstyle.inputContainer]}>
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

      {showvillage ? (
        <View style={[mstyle.inputContainer, { marginTop: 5, paddingBottom: 1 }]}>
          <SelectDropdown
            data={villages?.options}
            defaultValue={villages?.value}
            defaultButtonText={villages.label}

            buttonStyle={{
              backgroundColor: 'white',
              width: '100%', height: Display.setHeight(6)
            }}
            buttonTextStyle={{ fontSize: 14, }}
            renderDropdownIcon={isOpened => {
              return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
            }}

            dropdownIconPosition={'right'}

            dropdownStyle={[mstyle.inputContainer]}
            selectedRowStyle={{ backgroundColor: Colors.LIGHT_GREEN }}
            rowTextStyle={{ fontSize: 14 }}


            onSelect={(selectedItem, index) => {
              // console.log(selectedvillages, index)
              villages.value = selectedItem
              villages.index = index

              searchFilterFunction('')

            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem
            }}
            rowTextForSelection={(item, index) => {
              return item
            }}

            search
            searchInputStyle={{
              backgroundColor: 'white',
              borderBottomWidth: 1,
              borderBottomColor: '#FFF',
            }}
            searchPlaceHolder={'Search here'}
            searchPlaceHolderColor={'darkgrey'}
            renderSearchInputLeftIcon={() => {
              return <FontAwesome name={'search'} color={'#444'} size={18} />;
            }}
          />
        </View>
      ) : null}



      <Pressable onPress={() => {
        setFarmerShowModal(true)
      }} >
        <Text style={{ color: Colors.GOOGLE_BLUE, fontSize: 15, fontWeight: 'bold', textAlign: 'center' }}>
          <Icon name={'add-circle-outline'} size={20}
            style={{
              paddingTop: 15, paddingRight: 10, color: Colors.GOOGLE_BLUE,
              fontWeight: 'bold',
            }} />
          Add New Farmer</Text>
      </Pressable>


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
                navigation.navigate('FarmerDetails', { item })
              }}
                style={{ flex: 1, flexDirection: 'row' }}>
                <Card item={item} />
              </Pressable>

              {/* <Icon  onPress={() => {
                Linking.openURL(`whatsapp://send?phone=91${item.item.subtitle}`)
              }} 
              name={'logo-whatsapp'} size={25} color='green' style={{paddingTop:15,paddingRight:10,color:'green'}}/>

              <Icon onPress={() => {
                Linking.openURL(`tel:${item.item.subtitle}`)
              }}
              name={'ios-call'} size={22} color='black' style={{paddingTop:15,paddingRight:20,color:'black'}}/> */}


            </View>
          )
        }}
        onEndReachedThreshold={0.2}
        // onEndReached={searchFilterFunction()}


        ListFooterComponent={() => {
          return (
            <View>
              <ActivityIndicator />
            </View>
          )
        }}


      />
      {/* <Pressable onPress={() => { navigation.navigate('AddFarmer') }}>
        <FabButton />

      </Pressable> */}


    </View>
  )
}

export default MyFarmerListScreen