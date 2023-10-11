import { View, StyleSheet, Pressable, FlatList, ScrollView, ToastAndroid, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import MYinputs from '../..//components/MYinputs';
import mstyle from '../../mstyle';
import Buttons from '../../components/Buttons';
import submitReqData from '../../services/FormData';
import { AuthenicationService } from '../../services';
import SearchableDropDown from 'react-native-searchable-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text } from 'react-native';



const FarmerMeetingScreen = ({ navigation }) => {
  const [formdata, setformdata] = useState([
    { label: 'Agenda', placeholder: 'Agenda', key: 'agenda', value: '', type: 'text',req:1 },
    //  { label: 'Village', placeholder:'Village', key: 'village', value:'',type: 'select',options:[], link_doctype:'City', },
    { label: 'Village', placeholder: 'Village Name', key: 'location', value: '', keyboard: 'text' ,req:1},

    { label: 'No of Attendees', placeholder: 'No of Attendees', key: 'no_attendees', value: '', type: 'text', keyboard: 'phone-pad' ,req:1},

    { label: 'Nearest Market Where Farmer Purchase', type: 'searchable', options: [], link_doctype: 'Geo Market', key: 'market', value: '', keyboard: 'text' ,req:1},
    { label: 'Nearest Dealer', type: 'select', options: [], link_doctype: 'Dealer', key: 'dealer', value: '', keyboard: 'text' ,req:1},

    { label: 'Note', placeholder: 'Note : About meeting', key: 'notes', value: '', type: 'textarea',req:1 },
    //  { label: 'Photo attendance',  type: 'section'  },
    { label: 'Upload Farmers Photos', type: 'image', key: 'farmer_image', source: 'Gallery', value: [],req:1 },
    { label: 'Upload Farmer List', type: 'image', key: 'farmer_list_image', source: 'Gallery', value: [] ,req:1},
    { label: 'Upload selfie with Geolife SO or Seniors', type: 'image', key: 'so_image', source: 'Gallery', value: [],req:1 },
    { label: 'Geolife SO or Seniors Name', placeholder: 'Geolife SO or Seniors Name', type: 'text', key: 'so_name',req:0 },
    { label: 'Upload Selfie with Geolife authorized Dealer', type: 'image', key: 'dealer_image', source: 'Gallery', value: [] ,req:1},
    { label: 'Geolife authorized Dealer Name', placeholder: 'Geolife authorized Dealer Name', type: 'text', key: 'dealer_image_name',req:0 },
  ])
  const [dealer, setdealer] = useState()
  const [dealers, setdealers] = useState([])

  const [isloading, setisloading] = useState(false)
  // if (item) {
  //   // console.log(item)

  //   for (let i in formdata) {
  //     for (let n in item.item) {
  //       // console.log('item value', item.item[n])
  //       if (formdata[i].key === n) {
  //         formdata[i].value = item.item[n]
  //       }
  //     }
  //   }
  // }

  const getDealers = () => {
    let req = {
      "text": ''
    }
    AuthenicationService.searchdealerData(req)
      .then(x => {
        console.log("kjh sakfsj", x.data)
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


  const submit = () => {
    let req = submitReqData(formdata);
   
    let valid =true
    formdata.forEach(a => {
      if (a.req == 1) {
        if (!a.value) {
          alert(`Please Enter ${a.label}`)
          valid=false
          
        }
      }

    });
    
    if (!isloading && valid) {
      setisloading(true)
      // console.log(formdata)
      let req = submitReqData(formdata);
      AuthenicationService.farmer_meeting(req).then(response => {
        setisloading(false);
        console.log(response)
        if (response?.status == true) {
          navigation.goBack()
          ToastAndroid.showWithGravityAndOffset(
            'Farmer meeting submited',
            ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
          );
        } else {
          ToastAndroid.showWithGravityAndOffset(
            'Oops! Something went wrong check internet connection',
            ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
          );

        }
      }).catch((e) => {
        ToastAndroid.showWithGravityAndOffset(
          ' Something went wrong check internet connection',
          ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
        )

      })
    }

  }

  const [loading, setloading] = useState(false)
  useEffect(() => {
    getDealers()
  }, [])

  const getData =()=>{
    setTimeout(()=> {
      setloading(false)
      clearTimeout();
    }, 1000)
    
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>



      <ScrollView keyboardShouldPersistTaps="handled">


       {formdata.map((item)=>{
         return (
          <View>
            {item.key == 'dealer_image_name' ? (
              <View>
                <View style={[mstyle.inputContainer1, {
                  backgroundColor: 'white', marginTop: 7,

                }]}>

                  <Text style={{ fontSize: 14, color: 'black', paddingBottom: 5,paddingHorizontal:5, fontWeight: '400' }}>{item.label}</Text>


                  <View style={mstyle.inputSubContainer}>

                    {item.value ? (
                      <View style={{
                        padding: 8, marginTop: 2, flexDirection: 'row',
                        backgroundColor: 'white', borderColor: 'silver',
                        borderWidth: 1, borderRadius: 5, width: '100%'
                      }}>

                        <Text style={{ color: 'black', width: '90%', fontSize: 15, fontWeight: 'bold' }}> {item.data.name}</Text>
                        <Icon onPress={() => { item.value = ''
                        item.data = {}
                      setloading(true)
                      getData()
                      
                      }} name='close-circle-outline' size={25} style={{ color: 'red' }}></Icon>

                      </View>
                    ) : (

                      <SearchableDropDown zIndex={999}
                        onItemSelect={(kitem) => {
                          // alert('select dealer')
                          // console.log('clicked',kitem)
                          item.value = kitem.id
                          item.data = kitem
                          console.log('clicked', item.data)
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
                        items={dealers}
                        defaultIndex={2}
                        resetValue={false}
                        textInputProps={
                          {
                            placeholder: item.label,
                            underlineColorAndroid: "transparent",
                            style: {
                              padding: 8,
                              borderWidth: 1,
                              borderColor: '#ccc',
                              borderRadius: 5,
                              color: "black"
                            },
                            // onTextChange: text => {
                            // getDealers()

                            // }
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
              </View>

            ) :
              (
                <View>
                  {item.key == "dealer" ? (
                    <View>
                      <View>
                        <View style={[mstyle.inputContainer1, {
                          backgroundColor: 'white', marginTop: 7,

                        }]}>
                  <Text style={{ fontSize: 14, color: 'black', paddingBottom: 5,paddingHorizontal:5, fontWeight: '400' }}>{item.label}</Text>

                          <View style={mstyle.inputSubContainer}>

                            {item?.value ? (
                              <View style={{
                                padding: 8, marginTop: 2, flexDirection: 'row',
                                backgroundColor: 'white', borderColor: 'silver',
                                borderWidth: 1, borderRadius: 5, width: '100%'
                              }}>

                                <Text style={{ color: 'black', width: '90%', fontSize: 15, fontWeight: 'bold' }}> {item?.data.name}</Text>
                                <Icon onPress={() => {
                                  item.value = ''
                                  item.data = {}
                                  setloading(true)
                                  getData()
                                }} name='close-circle-outline' size={25} style={{ color: 'red' }}></Icon>

                              </View>
                            ) : (

                              <SearchableDropDown zIndex={999}
                                onItemSelect={(kitem) => {
                                  // alert('select dealer')
                                  console.log('clicked', kitem)
                                  item.value = kitem.id
                                  item.data = kitem
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
                                items={dealers}
                                defaultIndex={2}
                                resetValue={false}
                                textInputProps={
                                  {
                                    placeholder: item.label,
                                    underlineColorAndroid: "transparent",
                                    style: {
                                      padding: 8,
                                      borderWidth: 1,
                                      borderColor: '#ccc',
                                      borderRadius: 5,
                                      color: "black"
                                    },
                                    // onTextChange: text => {
                                    // getDealers()

                                    // }
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

                      </View>
                    </View>
                  ) : (
                    <MYinputs item={item} />
                  )}
                </View>
              )

            }

          </View>
        )
       })}





        <Pressable style={{ paddingBottom: 20 }} onPress={() => { submit() }}>
          <Buttons title={'Submit'} loading={isloading} />
        </Pressable>
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
export default FarmerMeetingScreen