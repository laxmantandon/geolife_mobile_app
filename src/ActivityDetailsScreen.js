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
    { label: 'Please Select Type', key: 'type', options: ["Farmer","Dealer","Other"], type: 'select', },
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
  const [visible, setvisible] = useState('auto')


  if(!item){
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
  }
useEffect(() => {
  // console.log(item)
  if(item){
    setvisible('none')
    mdata= item.item.data
    console.log(item.item.data.activity_type)
    if(mdata.activity_name){
     console.log('Type',mdata.activity_name.replace(" Visit",''))
     formdata[0].value=mdata.activity_name.replace(" Visit",'')
    }
    formdata[1].values=mdata.activity_type

    formdata[3].value=mdata.notes
    if(mdata.activity_name.includes('Farmer')){
      formdata[2].value=mdata.farmer
      formdata[2].value_name=mdata.farmer
      // console.log('Farmaer hai')
    }
    if(mdata.activity_name.includes('Dealer')){
      // console.log('Dealer hai')
      formdata[2].value=mdata.dealer
      formdata[2].value_name=mdata.dealer
    }
    if(mdata.image){
      let images=[]
      images.push(mdata.image)
      formdata[4].value=images



    }

  }else{
  searchFilterFunctionFarmer('a')
  searchFilterFunctionDealer('a')
  }
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
    let validform=true
    let req = submitReqData(formdata);
    setisLoading(true);
    req.activity_type= formdata[1]?.values
   
    req.multiactivity_type= formdata[1]?.values
console.log(req)
    if (req.activity_type == '' || req.activity_type == null) {
      Alert.alert('Please Select Activity type ')
      setisLoading(false);
      validform=false
      return
    }

    

    if (req.type == '' || req.type == null) {
      setisLoading(false);
      validform=false
      Alert.alert('Please Enter Select Type')
      return
    }
    if (req.notes == '' || req.notes == null) {
      setisLoading(false);
      validform=false
      Alert.alert('Please Enter Notes')
      return
    }

    if (!req.image || req.image == '' || req.image == []) {
      setisLoading(false);
      validform=false
      Alert.alert('Please Capture Activity Image')
      return
    }
    if(req.type !="Other"){
      if (req.party == '' || req.party == null) {
        setisLoading(false);
        validform=false
        Alert.alert('Please Enter Party Name')
        return
      }
    }
    // console.log(req.latitude)
    
    // setisLoading(false);
if (validform==true){
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


  const [retailers, setretailers] = useState([])
  const searchFilterFunctionRetailer = () => {
    let req = {
      "text": ''
    }
    AuthenicationService.searchretailerData(req)
      .then(x => {
        // console.log("kjh sakfsj",x.data)
        if (x.status == true) {
          let mapped_array = []
          x.data.forEach(a => {
            mapped_array.push({ "name": `${a.name}`, "id": a.mobile_number })
          })
          setretailers(mapped_array)
        } else {
        }
      })
      .catch(error => {
        // console.log(error)
      })
  }

  const [others, setothers] = useState([])
  const searchFilterFunctionOther = () => {
    let req = {
      "text": ''
    }
    AuthenicationService.searchotherData(req)
      .then(x => {
        // console.log("kjh sakfsj",x.data)
        if (x.status == true) {
          let mapped_array = []
          x.data.forEach(a => {
            mapped_array.push({ "name": `${a.name}`, "id": a.mobile_number})
          })
          setothers(mapped_array)
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
      // "all_farmer": 1
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
<View pointerEvents={visible}>


        {formdata.map(item => {
          return (
            <View style={{ flex: 1 }}>
              <View>
              {item.key == 'party'?(
               <View>
                {formdata[0].value == 'Other'?(''):(

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
                          items={formdata[0].value=='Farmer'?farmers:formdata[0].value=='Dealer'?dealers:formdata[0].value=='Retailer'?retailers:others}
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
                                } else if (formdata[0].value == 'Dealer'){
                                  searchFilterFunctionDealer(text)
                                }else if (formdata[0].value == 'Retailer'){
                                  searchFilterFunctionRetailer(text)
                                }else if (formdata[0].value == 'Other'){
                                  searchFilterFunctionOther(text)
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
                )}
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

        {item.item ? ('') : (<Pressable style={{ paddingBottom: 20 }} onPress={() => { submit() }}>
          <Buttons title={'Submit'} loading={isLoading} />
        </Pressable>)}

        </View>
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