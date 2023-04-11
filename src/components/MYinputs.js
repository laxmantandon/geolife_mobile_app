import { View, Text, TextInput, Button, Pressable, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import mstyle from '../mstyle'
import { Colors } from '../contants'
import Separator from './Separator'
import CameraPermission from '../services/permissionservices'
import { launchCamera } from 'react-native-image-picker'
import ImageView from "react-native-image-viewing";
import SelectDropdown from 'react-native-select-dropdown'
// import Feather from 'react-native-vector-icons/Feather';

import { Display } from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'
import DatePicker from 'react-native-date-picker'
import Card from './Card'
import moment from 'moment'



const MYinputs = ({ item }) => {
  // console.log('FROM MY INPUT',  item)

  const [visible, setIsVisible] = useState(false);
  const [captureimage, setcaptureimage] = useState([])
  const [open, setOpen] = useState(false)

  const startCamera = () => {

    CameraPermission()
    let options = {
      includeBase64: true,
      mediaType: 'photo',
      saveToPhotos: true,
      quality: 0.3


    };

    launchCamera(options, (response) => {
      // console.log(response.assets);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        // const source = { uri: response.uri };
        // console.log('response', JSON.stringify(response.assets[0].base64));
        const basse64image = 'data:image/jpeg;base64,' + JSON.stringify(response?.assets[0].base64)
        setcaptureimage([])
        // item?.value=basse64image
        // captureimage=basse64image

        // captureimage=basse64image

        item.value.push(basse64image)
        // console.log(''item.value)

        setcaptureimage(item.value)


        // console.table(JSON.stringify(response))

        // this.setState({
        //   filePath: response,
        //   fileData: response.data,
        //   fileUri: response.uri
        // });
      }
    });

  }
  return (
    <View >
      <View style={[mstyle.inputContainer1, {
        backgroundColor: 'white', marginTop:8

      }]}>
        {item?.type === 'checkbox' ? (
          <Pressable style={{ flex: 1, flexDirection: 'row' }}
            onPress={() => { item?.value === true ? item.value = false : item.value = true }}
          >
            <Icon name={item?.value === true ? 'ios-checkmark-circle' : 'ios-checkmark-circle'}
              size={22} style={{ paddingTop: 18, paddingLeft: 20, color: item?.value === true ? 'green' : 'silver' }} />
            <Text style={mstyle.content}>{item.label}</Text>

          </Pressable>
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
                        <Pressable style={{ margin: 2 }}
                          onPress={() => { setIsVisible(true) }}
                        >
                          <Image style={{ width: 80, height: 100, backgroundColor: 'silver' }} source={{ uri: item.value[index] }} />

                        </Pressable>
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

                <Pressable onPress={() => startCamera()} style={{ width: 50, height: 50, marginTop: 10 }} >
                  <Icon name='camera' size={30} style={{ backgroundColor: Colors.LIGHT_GREEN, color: 'green', borderRadius: 50, padding: 10 }} />
                  {/* <Image style={{ width: 50, height: 50 }}
              source={{ uri: 'https://www.nicepng.com/png/detail/127-1276180_photo-album-icon-png-icon-logo-png-album.png' }}
            /> */}
                </Pressable>
              </View>
            ) : (
              <View>
                <View style={mstyle.inputContainer}>
                  <View >

                    {item?.type === 'select' ? (
                      <View style={{ flex: 1, flexDirection: 'row' }}>

                        <SelectDropdown
                          data={item?.options}
                          defaultValue={item?.value}
                          defaultButtonText={item?.label}
                          buttonStyle={{
                            backgroundColor: 'white',
                            width: '100%', height: Display.setHeight(6)
                          }}
                          buttonTextStyle={{ fontSize: 14,  }}
                          dropdownStyle={[mstyle.inputContainer]}
                          selectedRowStyle={{ backgroundColor: Colors.DEFAULT_WHITE }}
                          rowTextStyle={{ fontSize: 14 }}

                          onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index)
                            item.value = selectedItem
                            item.index = index

                          }}
                          buttonTextAfterSelection={(selectedItem, index) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem
                          }}
                          rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item
                          }}
                        />

                        {/* <Feather
                    name="phone"
                    size={18}
                    color={Colors.DEFAULT_GREY}
                  /> */}
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
                              date={item?.value}
                              onConfirm={text => {
                                item.value = text
                                console.log(item)
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
                          <View>

                            <TextInput
                              placeholder={`${item.placeholder}                                                         `}
                              keyboardType={item?.keyboard ? item?.keyboard : ''}
                              placeholderTextColor={'gray'}
                              selectionColor={Colors.DEFAULT_GREY}
                              style={mstyle.inputText}
                              // maxLength={10}
                              multiline={item?.type == 'textarea' ? true : false} numberOfLines={item?.type === 'textarea' ? 6 : 1}
                              onChangeText={text => {
                                item.value = text
                                // console.log(item)
                              }}
                              // value={item?.value}
                              defaultValue={item?.value}
                            />

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
    </View>

  )
}

export default MYinputs