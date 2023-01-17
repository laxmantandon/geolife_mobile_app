import { View, Text, TextInput, Button, Pressable, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import mstyle from '../mstyle'
import { Colors } from '../contants'
import Separator from './Separator'
import CameraPermission from '../services/permissionservices'
import { launchCamera } from 'react-native-image-picker'
import ImageView from "react-native-image-viewing";
import SelectDropdown from 'react-native-select-dropdown'
import Feather from 'react-native-vector-icons/Feather';



const MYinputs = ({ item }) => {
  console.log(item)

  const [visible, setIsVisible] = useState(false);

  const startCamera = () => {
    // requestCameraPermission()
    CameraPermission()
    let options = {
      includeBase64: true,
      mediaType: 'photo',
      saveToPhotos: true

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
        const basse64image = JSON.stringify(response.assets[0].base64)
        // item?.value=basse64image
        // captureimage=basse64image

        // captureimage=basse64image
        item.value.push(basse64image)
        // console.log(item.value)


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
    <View>
      <Text style={mstyle.content}>{item.label}</Text>

      {item?.type == 'image' ? (
        <View style={{ paddingHorizontal: 20, paddingVertical: 10, flex: 1, flexDirection: 'row' }} >
          {item?.value ? (<View>
            <FlatList
              data={item.value}
              renderItem={(img) => {
                return (
                  <Pressable
                  // onPress={() => navigation.navigate('ActivityDetails')}
                  >
                    <Image style={{ width: 100, height: 100, }} source={{ uri: 'data:image/jpeg;base64,' + img }} />

                  </Pressable>
                )
              }} />
            <ImageView
              images={item.value}
              imageIndex={0}
              visible={visible}
              onRequestClose={() => setIsVisible(false)}
            />
          </View>) : (<Text>No Images</Text>)}



          <Separator width={10} />

          <Pressable onPress={() => startCamera()} style={{ width: 60, height: 100 }} >
            <Image style={{ width: 50, height: 50, top: 25, bottom: 25 }}
              source={{ uri: 'https://www.nicepng.com/png/detail/127-1276180_photo-album-icon-png-icon-logo-png-album.png' }}
            />
          </Pressable>
        </View>
      ) : (
        <View>
          <View style={mstyle.inputContainer}>
            <View style={mstyle.inputSubContainer}>

              {item?.type === 'select' ? (
                <View style={{flex:1 ,flexDirection:'row'}}>
                  
                  <SelectDropdown
                    data={item?.options}
                    defaultValue={item?.value}
                    defaultButtonText={item?.label}
                    buttonStyle={{
                      backgroundColor: Colors.LIGHT_GREY,
                      width:'100%',
                    }}
                    buttonTextStyle={{fontSize:15}}
                    dropdownStyle={[mstyle.inputContainer]}
                    selectedRowStyle={{backgroundColor:Colors.LIGHT_GREY}}
                    rowTextStyle={{fontSize:15}}

                    onSelect={(selectedItem, index) => {
                      console.log(selectedItem, index)
                      item.value = selectedItem

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

<Feather
                    name="phone"
                    size={18}
                    color={Colors.DEFAULT_GREY}
                    style={{ marginRight: 10 }}
                  />
                </View>
              ) : (



                <TextInput
                  placeholder={item.placeholder} keyboardType={item?.keyboard ? item?.keyboard : ''}
                  placeholderTextColor={Colors.DEFAULT_GREY}
                  selectionColor={Colors.DEFAULT_GREY}
                  style={mstyle.inputText}
                  // maxLength={10}
                  multiline={item?.type == 'textarea' ? true : false} numberOfLines={item?.type == 'textarea' ? 6 : 1}
                  onChangeText={text => {
                    item.value = text
                    console.log(item)
                  }}
                  // value={item?.value}
                  defaultValue={item?.value}
                />

              )}

            </View>
          </View>
        </View>
      )}


      <Separator height={15} />

    </View>
  )
}

export default MYinputs