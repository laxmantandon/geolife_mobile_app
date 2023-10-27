import { View, Text, StyleSheet, Pressable, FlatList, ScrollView, ToastAndroid, Alert, SafeAreaView, ViewBase, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import MYinputs from './components/MYinputs';
import mstyle from './mstyle';
import Buttons from './components/Buttons';
import { AuthenicationService } from './services';
import submitReqData from './services/FormData';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchableDropDown from 'react-native-searchable-dropdown';
import AuthenticationService from './services/AuthenticationService';
import Frappe_Model from './Frappe_Model';


const ActivityDetailsScreen = ({ navigation, props,
  route: {
    params: { item },
  },
}) => {

  const [activity_type, setactivity_type] = useState([])
  const [formdata, setformdata] = useState([
    { label: 'Please Select Type', key: 'type', options: ["Farmer", "Retailer", "Dealer", "Other"], type: 'select', },
    { label: 'Please Select Activity Type', key: 'activity_type', value: '', options: activity_type, type: 'searchable',multi_select:true },
    { label: 'Name', placeholder: 'Enter Name', key: 'party', link_doctype: 'My Farmer' },
    { label: 'Notes', placeholder: 'Enter Notes', key: 'notes', value: '', type: 'textarea' },
    { label: 'My Image', value: [], type: 'image', key: 'image', },
  ])
  const [party_type, setparty_type] = useState('Farmer')
  const [refreshing, setrefreshing] = useState(false)
  const [isLoading, setisLoading] = useState(false)
  const [all_activity_type, setall_activity_type] = useState([])

  const [farmer_options, setfarmer_options] = useState([])
  const [dealer_options, setdealer_options] = useState([])
  if (item) {
    // console.log(item)
    AuthenicationService.activity_for(req).then(res => {
      // console.log(res.data)
      if (res?.status == true) {
        mapped_array = []
        res.data.forEach(a => {
          mapped_array.push({ "json": `${a.json}` })
        })
        setformdata(JSON.parse(mapped_array))
      } else {
      }
    })

    // for (let i in formdata) {
    //   for (let n in item.item) {
    //     // console.log('item value', item.item[n])
    //     if (formdata[i].key === n) {
    //       formdata[i].value = item.item[n]
    //     }
    //   }
    // }




  }

  if (activity_type.length === 0) {
    // console.log(activity_type.length)
    AuthenicationService.activity_type(req).then(res => {
      // // console.log(res.data)
      if (res?.status == true) {
        mapped_array = []
        setall_activity_type(res.data)
        res.data.forEach(a => {
          // console.log(a)
          if(a.activity_for==formdata[0].value){
          // mapped_array.push(a.name)
          mapped_array.push({id:a.name ,name:a.name})
          }
        })
        formdata[1].options = mapped_array
        setactivity_type(mapped_array)
      } else {
      }
    })

  }
useEffect(() => {
  searchFilterFunctionFarmer('a')
  searchFilterFunctionDealer('a')
}, [])

const onRefresh = React.useCallback(() => {
  setrefreshing(true);

  all_activity_type.forEach(a => {
    if(a.activity_for== formdata[0].value){
    // mapped_array.push(a.name)
    mapped_array.push({id:a.name ,name:a.name})
    }
  })
  formdata[1].options = mapped_array

  setTimeout(() => {
    setrefreshing(false);
  }, 1000);
}, []);


  const submit = () => {
    // // console.log(formdata)
    let req = submitReqData(formdata);
    setisLoading(true);
    req.activity_type= formdata[1]?.values
    // if(req.activity_type){
    //   mapped=[]
    //   req.activity_type.forEach(a => {
    //     mapped.push({activity_type:a})
        
    //   });
    // }


    req.multiactivity_type= formdata[1]?.values

    if (req.activity_type == '' || req.activity_type == null) {
      Alert.alert('Please Select Activity type ')
      setisLoading(false);
      return
    }

    if (req.party == '' || req.party == null) {
      setisLoading(false);
      Alert.alert('Please Enter Party Name')
      return
    }
    console.log(req)

    AuthenicationService.create_activity(req).then(response => {
      setisLoading(false);
      // console.log(response)
      if (response?.status == true) {
        ToastAndroid.showWithGravityAndOffset(
          response?.message,
          ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50)
        navigation.goBack()
      } else {
        ToastAndroid.showWithGravityAndOffset(
          response?.message,
          ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
        );

      }
    }).catch(e => {
      setisLoading(false);

      // console.log(e)
    })

  }

  const update = () => {
    // console.log(formdata)
  }

  const refreshField=()=>{
    setisLoading(true)
    setTimeout(() => {
      setisLoading(false)
    }, 100);

  }

  function refreshForm() {
    refreshField()

    console.log('refreshing', formdata[0].value)
      if(formdata[0].value != party_type){
        setisLoading(true);
        // console.log('refreshing', formdata[0].value)

        setactivity_type([])
      setparty_type(formdata[0].value)
      mapped_array=[]

      formdata[1].value =[]
      formdata[1].values =[]
      formdata[1].options =[]
      
      // formdata[1].options = mapped_array
      setactivity_type(mapped_array)
      refreshField()
     
      onRefresh()

      }
      
   
  }

  const [dealers, setdealers] = useState([])
  const searchFilterFunctionDealer = () => {
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
  const [farmers, setfarmers] = useState([])
  const searchFilterFunctionFarmer = (text) => {
    // setloading(true)
    // setserachingData(true)
    let req = {
      "text": text,
      "all_farmer": 1
    }
    if (text == '') {
      req.text = false
    }
    // // console.log(text)
    AuthenticationService.searchfarmerData(req)
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


  return (
    <SafeAreaView style={mstyle.container1}>
            <Frappe_Model loading={isLoading} />

      <ScrollView keyboardShouldPersistTaps="handled"  refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>

        {formdata.map(item => {
          return (
            <View style={{ flex: 1 }}>
              <View>
              {item.key == 'party'?(
                <View  style={[mstyle.inputContainer1, {
                  backgroundColor: 'white', marginTop: 8,
                }]}>

                  <Text style={{ fontSize: 14, color: 'black', paddingBottom: 1, paddingHorizontal: 5, fontWeight: '400' }}>
                    {`Select ${formdata[0].value}`} </Text>


                  

                  <View style={mstyle.inputSubContainer}>
                    {item.value ? (
                      <View style={{
                        padding: 8, marginTop: 2, flexDirection: 'row',
                        backgroundColor: 'white', borderColor: 'silver',
                        borderWidth: 1, borderRadius: 5, width: '100%'
                      }}>
 
                        <Text style={{ color: 'black', width: '90%', fontSize: 15, fontWeight: 'bold' }}> {item.value_name}</Text>
                        <Icon onPress={() => {
                          item.value = ''
                          refreshField()
                        }} name='close-circle-outline' size={25} style={{ color: 'red' }}></Icon>

                      </View>
                    ) : (
                      <SearchableDropDown zindex="999"
                        onItemSelect={(kitem) => {
                          // const items = selectedCrops;
                          // items.push(item)
                          // setselectedFarmer(kitem)
                          item.value = kitem.id
                          item.value_name = kitem.name
                          // refreshForm()
                          refreshField()

                          setisLoading(true)
                          setTimeout(() => {
                            setisLoading(false)
                          }, 1000);

                          // console.log(selectedFarmer)
                        }}
                        containerStyle={{ padding: 1, width: '100%' }}
                        modalContainer
                        onRemoveItem={(kitem, index) => {
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
                        items={formdata[0].value=='Farmer'?farmers:dealers}
                        // defaultIndex={2}
                        resetValue={false}
                        textInputProps={
                          {
                            placeholder: `Search ${formdata[0].value}`,
                            underlineColorAndroid: "transparent",
                            style: {padding: 8, borderWidth: 1,borderColor: '#ccc', borderRadius: 5, color: "black"},
                            onTextChange: text => {
                              if (formdata[0].value == 'Farmer') {
                                searchFilterFunctionFarmer(text)
                              } else {
                                searchFilterFunctionDealer(text)
                              }
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
              ) : (
                <View>
                    <MYinputs item={item} refreshinput={refreshForm} />
                  </View>

              )}
              </View>
            </View>
          )
        })}

        {item.item ? (<Pressable onPress={() => { update() }}>
          <Buttons title={'Update'} loading={isLoading} />
        </Pressable>) : (<Pressable style={{ paddingBottom: 20 }} onPress={() => { submit() }}>
          <Buttons title={'Submit'} loading={isLoading} />
        </Pressable>)}


      </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  InputStyle: {
    padding: 20, shadowColor: 'rgba(0,0,0,0.4)',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 2,
  },

  inputbox: {
    paddingHorizontal: 10,
    paddingVertical: 15
  },
  images: {
    width: 100,
    height: 100,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3
  },
})
export default ActivityDetailsScreen