import { View, StyleSheet, Pressable, FlatList, ScrollView, ToastAndroid, Alert, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import MYinputs from './components/MYinputs';
import mstyle from './mstyle';
import Buttons from './components/Buttons';
import { AuthenicationService } from './services';
import submitReqData from './services/FormData';
import Card from './components/Card';
import { TextInput } from 'react-native';
import { Colors } from './contants';


const ExpenseDetailsScreen = ({ navigation,
  route: {
    params: { item },
  },
}) => {
  const [expense_type, setexpense_type] = useState([])
  const [selected_type, setselected_type] = useState('')
  const [formdata, setformdata] = useState([
    // { label: ' Select Expense Type', key: 'expense_type', value: '', options: expense_type, type: 'select', },
    { label: 'Amount Against Expense', placeholder: '00.00', key: 'amount', value: '', keyboard: 'numeric' },
    { label: 'Notes', placeholder: 'Enter Notes', key: 'notes', value: '', type: 'textarea' },
    { label: 'Image', value: [], type: 'image', key: 'odometer_start_image', },
  ])
  const [jsondata, setjsondata] = useState([])
  const [type_data, settype_data] = useState([])
  const [isLoading, setisLoading] = useState(false)
  const [Loading, setLoading] = useState(false)

  const [fare_amount, setfare_amount] = useState('')







  const getData = () => {
    setLoading(true)
    AuthenicationService.expense_type(req).then(res => {
      // // console.log(JSON.parse(res.data[0].json))
      setLoading(false)

      if (res?.status == true) {

        // setformdata(JSON.parse(res.data[0].json))
        settype_data(res.data)
        mapped_array = []
        res.data.forEach(a => {
          mapped_array.push({ "title": `${a.name}`, "json": `${a.json}` })
          if (item) {
            // console.log(item)
            if (item.item.title == a.name) {
              // generateAmount()
              setselected_type(a.name)
              let v = JSON.parse(a.json)
              if (v) {
                if (v.length) {
                  for (let i in v) {
                    for (let n in item.item.data) {
                      // console.log(`item value ${n} ${v[i].key}`, item.item.data[n])
                      if (v[i].key === n) {
                        if (v[i].key == 'odometer_start_image') {
                          if (item.item.data[n]) {
                            v.splice(i, 1)
                          }
                          // let image= []
                          // image.push(item.item.data[n])
                          // console.log(item.item.data[n])
                          // v[i].value = image

                        } else {
                          if (v[i].key == 'odometer_end_image') {
                            if (item.item.data[n]) {
                              v.splice(i, 1)
                            }
                          } else {
                            console.log(item.item.data[n])
                            v[i].value = item.item.data[n] ? item.item.data[n] : ''
                          }
                        }

                      }
                    }
                  }
                  setformdata(v)
                }
              }
            }

          }
        })

        formdata[0].options = mapped_array
        // console.log(mapped_array)

        setexpense_type(mapped_array)
      } else {
      }
    })
  }
  useEffect(() => {
    getData()
    if (item) {
      // generateAmount()
    }

  }, [])



  const submit = () => {
    setisLoading(true);

    let valid = true
    formdata.forEach(a => {
      if (a.value == '' && a?.req == 1) {
        alert(`Please check ${a.label}`)
        setisLoading(false);

        valid = false
        return
      }

    });


    let req = submitReqData(formdata);
    if (selected_type == 'Travel-Private') {
      // if(req.odometer_start < req.odometer_end){ 
      if (req.odometer_start && req.odometer_end) {
        let petrol = formdata[0].value == "Four Wheeler" ? 10 : 3.5
        let mn = (formdata[3].value - formdata[1].value) * petrol
        req.amount = mn
      } else {
        req.amount = 0
      }
      // }
    }
    req.expense_type = selected_type
    // // console.log(re/q)
    if (req.expense_type == '' || req.expense_type == null) {
      Alert.alert('Please Select Expense type ')
      setisLoading(false);
      return
    }

    // if (req.amount == '' || req.amount == null) {
    //   setisLoading(false);
    //   Alert.alert('Please Enter Amount')
    //   return
    // }
    console.log(req)
    if (valid) {
      AuthenicationService.create_expenses(req).then(response => {
        setisLoading(false);
        console.log(response)
        if (response?.status == true) {
          navigation.goBack()
          ToastAndroid.showWithGravityAndOffset(
            'Expense Successfully Added',
            ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
          );
        } else {
          ToastAndroid.showWithGravityAndOffset(
            'Oops! Something went wrong check internet connection',
            ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
          );

        }
      })
    }

  }

  const update = () => {
    setisLoading(true);

    let valid = true
    formdata.forEach(a => {
      if (a.value == '' && a?.req == 1) {
        alert(`Please check ${a.label}`)
        setisLoading(false);

        valid = false
        return
      }

    });


    let req = submitReqData(formdata);
    req.expense_type = selected_type

    if (selected_type == 'Travel-Private') {
      if (req.odometer_start < req.odometer_end) {
        if (req.odometer_start && req.odometer_end) {
          let petrol = formdata[0].value == "Four Wheeler" ? 10 : 3.5
          let mn = (req.odometer_end - req.odometer_start) * petrol
          req.amount = mn
        } else {
          req.amount = 0
        }
      }
    }
    req.name = item.item.data.name
    console.log(req)
    if (req.expense_type == '' || req.expense_type == null) {
      Alert.alert('Please Select Expense type ')
      setisLoading(false);
      return
    }
    // if (req.odometer_end_image) {
    //   req.odometer_end_image.splice(item.item.data.odometer_end_image, 1)
    // }

    if (req.odometer_start_image) {
      req.odometer_start_image.splice(item.item.data.odometer_start_image, 1)


    }


    // if (req.amount == '' || req.amount == null) {
    //   setisLoading(false);
    //   Alert.alert('Please Enter Amount')
    //   return
    // }
    console.log(req)
    if (valid) {
      AuthenicationService.update_expenses(req).then(response => {
        setisLoading(false);
        console.log(response)
        if (response?.status == true) {
          navigation.goBack()
          ToastAndroid.showWithGravityAndOffset(
            'Expense Successfully Updated',
            ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
          );
        } else {
          ToastAndroid.showWithGravityAndOffset(
            'Oops! Something went wrong check internet connection',
            ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
          );

        }
      })
    }

  }

  const generateAmount = (text) => {
    // console.log(selected_type)
    if (selected_type == 'Travel-Private') {
      setLoading(true)

      setTimeout(() => {
        // if (item){

        // if(formdata[3].value){
        let petrol = formdata[0].value == "Four Wheeler" ? 10 : 3.5
        let mn = (text - formdata[1].value) * petrol
        // console.log(mn  )
        // formdata[5].value = mn

        setfare_amount(mn)
        // }
        // }

        setLoading(false)
        // generateAmount()
      }, 100);
    }

  }

  const getkm = (text, citem) => {
    setLoading(true)

    setTimeout(() => {
      citem.km = text - formdata[1].value
      setLoading(false)

    }, 100);

  }



  return (
    <View style={[mstyle.container, { paddingBottom: 5 }]}>
      <Text style={{
        fontSize: 20, color: 'black',
        fontWeight: 'bold', textAlign: "center", paddingBottom: 10
      }}>
        {selected_type ? selected_type : 'Please select type of'} expenses</Text>

      {selected_type ? (
        <FlatList zIndex={999}
          data={formdata}
          refreshing={Loading}
          onRefresh={() => {
            // generateAmount()
            // getData()
          }}
          renderItem={({ item, index }) => {
            // console.log(item)
            return (
              <Pressable>

                {/* <Text>jkh jh j</Text> */}
                {item.key == "odometer_end" && selected_type == 'Travel-Private' ? (
                  <View>
                    <Pressable
                      style={[]}>
                      <View style={[mstyle.inputContainer, { paddingVertical: 10, borderWidth: 0, marginTop: 8, elevation: 8 }]}>
                        <Text style={mstyle.content}>{item.label} </Text>
                        <View style={mstyle.inputContainer}>
                          <View style={[mstyle.inputSubContainer, { paddingVertical: 1 }]}>
                            <TextInput
                              keyboardType='numeric'
                              placeholderTextColor={'gray'}
                              selectionColor={Colors.DEFAULT_GREY}
                              style={mstyle.inputText}
                              placeholder='00.00'
                              onChangeText={text => {
                                // console.log(text)
                                item.value = text
                                generateAmount(text)

                              }}
                              defaultValue={item.value}
                            />
                            {/* <Text style={{padding:8,color:'black'}}>{formdata[5].value}</Text> */}
                          </View>
                        </View>
                      </View>

                    </Pressable>



                    <Pressable style={[]}>
                      <View style={[mstyle.inputContainer, { paddingVertical: 10, borderWidth: 0, marginTop: 8, elevation: 8 }]}>
                        <Text style={mstyle.content}> Get Fare Amount</Text>
                        <View style={mstyle.inputContainer}>
                          <View style={[mstyle.inputSubContainer, { paddingVertical: 5 }]}>
                            <Text style={{ padding: 8, color: 'black' }}>{ item.value?fare_amount?(fare_amount >= 0?fare_amount:0):item.value-formdata[1].value >=0 :0}</Text>
                          </View>
                        </View>
                      </View>
                    </Pressable>

                  </View>
                ) : (
                  <View>
                    {item.key == "amount" && selected_type == 'Travel-Private' ? (
                      null
                    ) : (

                      <View>
                        {selected_type == "Travel-Company" && item.key == "odometer_end" ? (
                          <View>

                            <Pressable
                              style={[]}>
                              <View style={[mstyle.inputContainer, { paddingVertical: 10, borderWidth: 0, marginTop: 8, elevation: 8 }]}>
                                <Text style={mstyle.content}>{item.label}</Text>
                                <View style={mstyle.inputContainer}>
                                  <View style={[mstyle.inputSubContainer, { paddingVertical: 1 }]}>
                                    <TextInput
                                      keyboardType='numeric'
                                      placeholderTextColor={'gray'}
                                      selectionColor={Colors.DEFAULT_GREY}
                                      style={mstyle.inputText}
                                      placeholder='00.00'
                                      onChangeText={text => {
                                        // console.log(text)
                                        item.value = text
                                        getkm(text, item)

                                        // generateAmount(text)

                                      }}
                                      defaultValue={item.value}
                                    />
                                    {/* <Text style={{padding:8,color:'black'}}>{formdata[5].value}</Text> */}
                                  </View>
                                </View>
                              </View>

                            </Pressable>



                            <Pressable style={[]}>
                              <View style={[mstyle.inputContainer, { paddingVertical: 10, borderWidth: 0, marginTop: 8, elevation: 8 }]}>
                                <Text style={mstyle.content}>Total Distance in KM</Text>
                                <View style={mstyle.inputContainer}>
                                  <View style={[mstyle.inputSubContainer, { paddingVertical: 5 }]}>
                                    <Text style={{ padding: 8, color: 'black' }}>{ item.value? (item.value-formdata[1].value >=0?item.value-formdata[1].value:0):0 }</Text>
                                  </View>
                                </View>
                              </View>
                            </Pressable>


                          </View>

                        ) : (
                          <View>
                            {item.key == "odometer_start"  && item.value?(
                              <View pointerEvents='none'>
                                  <MYinputs item={item} />
                              </View>

                            ):(
                              <View>
                              {item.key == "vehicale_type" && item.value?(
                                <View pointerEvents='none'>
                                    <MYinputs item={item} />
                                </View>
  
                              ):(
                                <MYinputs item={item} />
                              )}
  
                            
                            </View>
                            )}

                          
                          </View>
                        )}
                      </View>

                    )}
                  </View>
                )}
              </Pressable>
            )
          }}

          ListFooterComponent={() => {
            return (
              <Pressable onPressIn={() => {
                if (item) {
                  update()
                } else { submit() }
                // generateAmount()
              }} style={{ paddingBottom: 80 }}>
                <Buttons title={item ? 'Update' : 'Submit'} loading={isLoading} />
              </Pressable>
            )
          }} />


      ) : (
        <View style={{ paddingBottom: 50 }}>
          <FlatList
            refreshing={Loading}
            onRefresh={() => {
              getData()
            }}
            ListEmptyComponent={() => {
              return (
                <View>
                  <Text style={{ textAlign: 'center' }}>No Data to show </Text>
                </View>
              )
            }}
            data={expense_type}
            renderItem={(item) => {
              return (
                <Pressable onPress={() => {
                  setselected_type(item.item.title)
                  if (item.item.title == "Travel-Private") {
                    // generateAmount()
                  }
                  let v = JSON.parse(item.item.json)
                  // console.log(v)
                  if (v) {
                    if (v.length) {
                      setformdata(v)

                    }
                  }
                }}>
                  <Card item={item} />
                </Pressable>
              )
            }} />
        </View>
      )}



    </View>
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
export default ExpenseDetailsScreen