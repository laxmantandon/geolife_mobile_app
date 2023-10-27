import { View, Text, TextInput, Button, Pressable, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import mstyle from '../mstyle'
import { Colors } from '../contants'
import Separator from './Separator'
import CameraPermission from '../services/permissionservices'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import ImageView from "react-native-image-viewing";
import SelectDropdown from 'react-native-select-dropdown'
// import Feather from 'react-native-vector-icons/Feather';

import { Display } from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'
import DatePicker from 'react-native-date-picker'
import Card from './Card'
import moment from 'moment'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AuthenicationService } from '../services'
import { useEffect } from 'react'
import SearchableDropDown from 'react-native-searchable-dropdown'



const MYinputs = ({ item,refreshinput }) => {
  // // console.log('FROM MY INPUT',  item)
 
  const [visible, setIsVisible] = useState(false);
  const [captureimage, setcaptureimage] = useState([])
  const [open, setOpen] = useState(false)
  const [LinkedDoctypeData, setLinkedDoctypeData] = useState([])
  const [loading, setloading] = useState(false)
  const [givedans, setgivedans] = useState('')
  const [realans, setrealans] = useState(item.ans)
  const [multi_value, setmulti_value] = useState([])


  useEffect(() => {
    if(item?.link_doctype){
      getLinkedDoctype('a')
    }
  }, [])


  const getfiltersdata=(text)=>{
    if(item.filter){
      let req={
        'doctype':item?.link_doctype,
        'filter':item?.filter,
        'text':text
  
      }
      AuthenicationService.GetDoctypefilterData(req).then((result)=>{
        console.log(result)
        mapped_data=[]
        if (result.data){
          if(item.type=='searchable'){
            result.data.forEach(a => {
              if (item?.options.includes(a.name)) {
              } else {
                if (a.name){
                  mapped_data.push(a)
                  setLinkedDoctypeData(mapped_data)
                  item?.options.push({'name':a.name,'id':a.name,'data':a})
                }
              }
            })
          }
        }
  
      })
  
    }
  }
  

  const getLinkedDoctype = (text) => {
    let req={
      'doctype':item?.link_doctype

    }
    AuthenicationService.GetDoctypeData(req).then((result)=>{
      console.log(result)
      // let mdata = JSON.parse(result)
          mapped_data=[]
          if(item.type=='searchable'){
            item.options=[]
            result.data.forEach(a => {
              if (item?.options.includes(a.name)) {
              } else {
                if (a.name){
                  mapped_data.push(a)
                  setLinkedDoctypeData(mapped_data)
                  item?.options.push({'name':a.name,'id':a.name,'data':a})
                }
              }
            })
          }else{
            result.data.forEach(a => {
              if (item?.options.includes(a.name)) {
              } else {
                if (a.name){
                  mapped_data.push(a)
                  setLinkedDoctypeData(mapped_data)
                  item?.options.push(a.name)
                }
              }
            })
          }

    }).catch((e)=>{
      console.log(e)
    })




    // var myHeaders = new Headers();
    // var requestOptions = {
    //   method: 'GET',
    //   headers: myHeaders,
    //   redirect: 'follow'
    // };
    // fetch(`https://dbh.erevive.cloud/api/resource/${item?.link_doctype}?fields=["name"]`, requestOptions)
    //   .then(response => response.text())
    //   .then(result => {
    //     let mdata = JSON.parse(result)
    //     mapped_data=[]
    //     mdata.data.forEach(a => {
    //       if (item?.options.includes(a.name)) {
    //       } else {
    //         if (a.name){
    //           mapped_data.push(a)
    //           setLinkedDoctypeData(mapped_data)
    //           item?.options.push(a.name)
    //         }
    //       }
    //     });
    //   })
    //   .catch(error => console.log('error', error));
  }
const OpenGallery=()=>{
  CameraPermission()
  let options = {
    includeBase64: true,
    mediaType: 'photo',
    saveToPhotos: true,
    quality: 0.3
  };

  launchImageLibrary(options, (response) => {
    if (response.didCancel) {
      // console.log('User cancelled image picker');
    } else if (response.error) {
      // console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      // console.log('User tapped custom button: ', response.customButton);
      alert(response.customButton);
    } else {
      const basse64image = 'data:image/jpeg;base64,' + JSON.stringify(response?.assets[0].base64)
      setcaptureimage([])
    
      item.value.push(basse64image)

      setcaptureimage(item.value)

    }
  });

}
  const startCamera = () => {

    CameraPermission()
    let options = {
      includeBase64: true,
      mediaType: 'photo',
      saveToPhotos: true,
      quality: 0.3
    };

   
      launchCamera(options, (response) => {
        if (response.didCancel) {
          // console.log('User cancelled image picker');
        } else if (response.error) {
          // console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          // console.log('User tapped custom button: ', response.customButton);
          alert(response.customButton);
        } else {
          const basse64image = 'data:image/jpeg;base64,' + JSON.stringify(response?.assets[0].base64)
          setcaptureimage([])
        
          item.value.push(basse64image)
  
          setcaptureimage(item.value)
  
        }
      });

    

    

  }

  const getData = (i) => {
    if (item?.type === 'multi_checkbox'){
      let v= i
      
      // console.log(v)
      // item.value =[]
      if (item?.value){
        item.value.push(v)
        setmulti_value(item.value)
        // console.log(item.value)
      }else{
        item.value=[]
        item.value.push(v)
      }
      setgivedans(i)
    }else{
    setgivedans(i)
    item.gived_ans = i
    item.value = i
    // console.log(item.gived_ans)
    }
  }


  const removeData=(i)=>{
    for (let [index, p] of multi_value.entries()) {
    if (i==p){
      // console.log(p, i)
      setgivedans(i)
      item.gived_ans = i
      multi_value.splice(index, 1)
      // console.log(multi_value)

    }
    }
  }

  const removeImage=(img,index)=>{
    setloading(true)
    item.value.splice(captureimage.indexOf(img),1)
    
    console.log('clicked')

    setTimeout(() => {
      setloading(false)
    }, 500);

  }

  const refreshGetData=()=>{
    setTimeout(() => {
      setloading(false)
    }, 1000);

  }

  return (
    <View >
      <View style={[mstyle.inputContainer1, {
        backgroundColor: 'white', marginTop: 8

      }]}>
        {item?.type === 'multi_checkbox' ? (
          <View>
            <Text style={[mstyle.content, { fontWeight: 'bold' }]}>{item.label}</Text>
            <FlatList
              data={item.options}
              numColumns={2}
              renderItem={({ item, index }) => {
                return (
                  <Pressable onPressIn={() => {
                    if(multi_value.includes(item)){
                     removeData(item)
                     if(refreshinput){
                      refreshinput()
                      }
                    }else{
                       getData(item)
                        if(refreshinput){
                      refreshinput()
                      }
                    }
                     

                   }} style={{ flex: 1, paddingVertical: 5 }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}
                      
                    >

                      <View style={{ backgroundColor: Colors.LIGHT_GREEN, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }} >
                       
                            
                              <Icon name={multi_value.includes(item) ? 'ios-checkmark-circle' : 'ios-ellipse-outline'}
                                size={20} style={{padding: 8, color: givedans === realans ? (multi_value.includes(item) ? 'green' : 'red') : 'green' }} />
                              

                         
                      </View>
                      <View style={mstyle.detailContainer}>
                        <View style={[mstyle.titleContainer, { width: '90%' }]}>
                          <Text style={[mstyle.listListTitle, { fontWeight: '600' }]} numberOfLines={4}>
                            {item} 
                          </Text>

                        </View>
                      </View>
                      </View>
                    </Pressable>


                 
                )

              }}

            />

          </View>
        ) : (
          <View>
            {item?.type === 'checkbox' ? (
              <View>
                <Text style={[mstyle.content, { fontWeight: 'bold' }]}>{item.label}</Text>
                <FlatList
                  data={item.options}
                  numColumns={2}
                  renderItem={({ item, index }) => {
                    return (
                      <View style={{ flex: 1, paddingVertical: 5 }}>
                        <Pressable style={{ flex: 1, flexDirection: 'row' }}
                          onPress={() => {
                            if (givedans) {

                            } else {
                              getData(item)

                            }

                          }}
                        >

                          <View style={{ backgroundColor: Colors.LIGHT_GREEN, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }} >
                            {givedans ? (
                              <View>
                                {
                                  givedans != item ? (<Icon name={realans === item ? 'ios-checkmark-circle' : 'ios-ellipse-outline'}
                                    size={20} style={{ padding: 8, color: givedans === realans ? (givedans === realans ? 'green' : 'red') : 'green' }} />
                                  ) : (
                                    <Icon name={givedans === item ? 'ios-checkmark-circle' : 'ios-ellipse-outline'}
                                      size={20} style={{ padding: 8, color: givedans === item ? (givedans === realans ? 'green' : 'red') : 'gray' }} />

                                  )
                                }

                              </View>
                            ) : (
                              <Icon name={'ios-ellipse-outline'}
                                size={20} style={{ padding: 8, color: 'gray' }} />
                            )}
                          </View>
                          <View style={mstyle.detailContainer}>
                            <View style={[mstyle.titleContainer, { width: '90%' }]}>
                              <Text style={[mstyle.listListTitle, { fontWeight: '600' }]} numberOfLines={4}>
                                {item}
                              </Text>

                            </View>
                          </View>

                        </Pressable>


                      </View>
                    )

                  }}

                />

              </View>
            ) : (
              <View>
                <Text style={mstyle.content}>{item.label}</Text>
                {item?.type == 'image' ? (
                  <View style={{ paddingHorizontal: 10, paddingVertical: 5 }} >
                    <View>
                      <FlatList
                        data={captureimage}
                        // style={{flex:1, flexDirection:'row'}}
                        numColumns={4}

                        renderItem={({ img, index }) => {
                          return (
                            <View style={{ margin: 2 }}
                              // onPress={() => { setIsVisible(true) }}
                            >
                              <Icon name='close-circle-outline' onPress={()=>{ removeImage(item.value[index],index)}} size={22} style={{ color:'red'}} />
                              <Image style={{ width: 80, height: 100, backgroundColor: 'silver' }} source={{ uri: item.value[index] }} />

                            </View>
                          )
                        }}

                      />
                      <ImageView
                        images={item.value}
                        imageIndex={0}
                        visible={visible}
                        onRequestClose={() => setIsVisible(false)}
                      />
                    </View>



                    <Separator width={10} />

                    <View style={{flexDirection:'row'}}>

                    <Pressable onPress={() => startCamera()} style={{ width: 50, height: 50, marginTop: 10 }} >
                      <Icon name={'camera'} size={30} style={{ backgroundColor: Colors.LIGHT_GREEN, color: 'green', borderRadius: 50, padding: 10 }} />
                    
                    </Pressable>

                    {item?.source=='Gallery'?(
                      <Pressable onPress={() => OpenGallery()} style={{marginHorizontal:15, width: 50, height: 50, marginTop: 10 }} >
                      <Icon name={'images-outline'} size={30} style={{ backgroundColor: Colors.LIGHT_GREEN, color: 'green',
                       borderRadius: 50, padding: 10 }} />
                    </Pressable>

                    ):(null)}

                      </View>

                  </View>
                ) : (
                  <View>
                    <View style={mstyle.inputContainer}>
                      <View style={mstyle.inputSubContainer}>

                        {item?.type === 'select' ? (
                          <View style={{ flex: 1, flexDirection: 'row' }}>

                            <SelectDropdown
                              data={item?.options}
                              onChangeSearchInputText={(text)=>{
                                // console.log(text)
                                      if(item?.link_doctype){
                                        getLinkedDoctype(text)
                                      }
                              }}
                              defaultValue={item.value}
                              defaultButtonText={item?.label}
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
                                // console.log(selectedItem, index)
                                if(refreshinput){
                                  refreshinput()
                                  }
                                item.value = selectedItem
                                item.index = index

                                if(item?.link_doctype){
                                  LinkedDoctypeData.forEach(a => {
                                    if(a.name==selectedItem){
                                      item.fetch= a
                                    }
                                  });
                                  
                                }

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

                            {/* <Feather
                    name="phone"
                    size={18}
                    color={Colors.DEFAULT_GREY}
                  /> */}
                          </View>
                        ):(
                          <View style={{flex:1}}>
                            {item?.type=='searchable'?(
                                      <View style={{marginBottom:1}}>
                                        {item.disable_input==1 ? (
                                          <View>
                                            {item.value?(
                                              <View style={{
                                                padding: 6, marginTop: 2, flexDirection: 'row',
                                                backgroundColor: 'white', borderColor: 'silver',
                                                borderWidth: 0, borderRadius: 5, width: '100%'
                                              }}>
    
                                                <Text style={{ color: 'black', width: '90%', fontSize: 15, fontWeight: 'bold' }}> 
                                                {item.value}</Text>
                                                <Icon onPress={() => {
                                                  item.value = ''
                                                  item.data = {}
                                                  setloading(true)
                                                  refreshGetData()
    
                                                }} name='close-circle-outline' size={25} style={{ color: 'red' }}></Icon>
    
                                              </View>
                                            ):('')}

                                            
                                            </View>
                                          
                                        ) : (

                                          <View>
                                            {item.values?(
                                              <View style={{
                                                padding: 6, marginTop: 2,
                                                backgroundColor: 'white', borderColor: 'silver',
                                                borderWidth: 0, borderRadius: 5
                                              }}>

                                                {item.values.map((itm, index)=>{
                                                  return(
                                                    <View style={{flexDirection:'row', borderColor:'silver', borderWidth:.5,borderRadius:5, padding:3, marginBottom:5}}>
                                                      <Text style={{ color: 'black', fontSize: 12, fontWeight: 'bold', marginRight:10,width:'90%'}}> 
                                                {itm}</Text>
                                                <Icon onPress={() => {
                                                  console.log(index)
                                                  item.values.splice(index,1)
                                                  

                                                  setloading(true)
                                                  refreshGetData()
    
                                                }} name='close-circle-outline' size={20} style={{ color: 'red' }}></Icon>
                                                      </View>
                                                  )
                                                })}
    
                                                {/* <Text style={{ color: 'black', width: '90%', fontSize: 15, fontWeight: 'bold' }}> 
                                                {item.value}</Text>
                                                <Icon onPress={() => {
                                                  item.value = ''
                                                  item.data = {}
                                                  setloading(true)
                                                  refreshGetData()
    
                                                }} name='close-circle-outline' size={25} style={{ color: 'red' }}></Icon>
     */}
                                              </View>
                                            ):('')}

<SearchableDropDown zIndex={999}
                                            onItemSelect={(kitem) => {
                                              // alert('select dealer')
                                              // console.log('clicked',kitem)
                                              if(item.multi_select){
                                                if(item?.values){
                                                }else{
                                                  item.values=[]
                                                }
                                                  if (item.values.includes(kitem.id)){

                                                  }else{
                                                  item.values.push(kitem.id)
                                                  item.data = kitem
                                                  console.log('clicked', item.data)
                                                  setloading(true)
                                                  refreshGetData()
                                                  }

                                                

                                              }else{
                                                item.value = kitem.id
                                                item.data = kitem
                                                item.disable_input = 1
                                                console.log('clicked', item.data)
                                                setloading(true)
                                                refreshGetData()
                                              }
                                             


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
                                            items={item.options}
                                            // defaultIndex={2}
                                            resetValue={false}
                                            textInputProps={
                                              {
                                                placeholder: item.label,
                                                underlineColorAndroid: "transparent",
                                                style: {
                                                  // padding: 8,
                                                  borderWidth: .3,
                                                  borderColor: '#ccc',
                                                  borderRadius: 5,
                                                  color: "black"
                                                },
                                                onTextChange: text => {
                                                  getfiltersdata(text)

                                                }
                                              }
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
                             ) : (

                              <View style={{ flex: 1, flexDirection: 'row' }}>
                                {item?.type === 'date' || item?.type === 'time' ? (
                                  <View style={{ flex: 1, flexDirection: 'row' }}>
                                    {/* <Button title="Open" onPress={() => setOpen(true)} style={mstyle.PrimaryButton} /> */}
                                    <DatePicker
                                      mode={item?.type == 'date' ? 'date' : 'time'}
                                      modal
                                      open={open}
                                      date={item?.value ? item?.value : moment().toDate()}
                                      onConfirm={text => {
                                        item.value = text
                                        // console.log(item)
                                        setOpen(false)
                                      }}
                                      onCancel={() => {
                                        setOpen(false)
                                      }}
                                    />

                                    <Icon
                                      onPress={() => setOpen(true)}
                                      name={item?.type == 'date' ? "calendar-outline" : "alarm-outline"}
                                      size={32}
                                      color={Colors.DEFAULT_GREEN}
                                      style={{ paddingVertical: 8, paddingRight: 8 }}
                                    />

                                    {item?.type == 'time' ? (
                                      <Text onPress={() => setOpen(true)}
                                        style={mstyle.inputText}>{moment(item.value).format('hh:mm a')}</Text>
                                    ) : (
                                      <Text onPress={() => setOpen(true)}
                                        style={mstyle.inputText}>{moment(item.value).format('Do MMM-YYYY')}</Text>
                                    )}

                                  </View>
                                ) : (
                                  // <View>
                                  item?.len ? (<TextInput
                                    placeholder={`${item.placeholder}                                                         `}
                                    keyboardType={item?.keyboard ? item?.keyboard : ''}
                                    placeholderTextColor={'gray'}
                                    selectionColor={Colors.DEFAULT_GREY}
                                    style={mstyle.inputText}
                                    maxLength={item?.len}
                                    multiline={item?.type == 'textarea' ? true : false} numberOfLines={item?.type === 'textarea' ? 6 : 1}

                                    onChangeText={text => {
                                      refreshGetData()

                                      if (item?.len == 10) {
                                        let num = text.replace("/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/", '')
                                        if (isNaN(num)) {
                                          alert(`Enter Valid ${item.label}`)
                                        } else {
                                          if (text.split('', 1) > 5) {
                                            item.value = text
                                          } else {
                                            alert(`Enter Valid ${item.label}`)
                                          }
                                        }
                                      }
                                    }
                                    }
                                    onFocus={text => {

                                    }}
                                    // value={item?.value}
                                    defaultValue={item?.value}
                                  />) : (
                                    <TextInput
                                      placeholder={`${item.placeholder}                                                         `}
                                      keyboardType={item?.keyboard ? item?.keyboard : ''}
                                      placeholderTextColor={'gray'}
                                      selectionColor={Colors.DEFAULT_GREY}
                                      style={mstyle.inputText}
                                      multiline={item?.type == 'textarea' ? true : false} numberOfLines={item?.type === 'textarea' ? 6 : 1}
                                      onChangeText={text => {
                                        item.value = text
                                        refreshGetData()
                                        // // console.log(item)
                                      }}
                                      // value={item?.value}
                                      defaultValue={item?.value}
                                    />
                                  )


                                  // </View>
                                )}

                              </View>

                            )}
                            </View>
                        )}

                      </View>
                    </View>
                  </View>
                )}


                {/* <Separator height={12} /> */}
              </View>
            )}


          </View>

        )}


      </View>
    </View>

  )
}

export default MYinputs