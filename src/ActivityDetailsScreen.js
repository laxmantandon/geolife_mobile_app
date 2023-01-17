import { View, Text, TextInput, StyleSheet, Button, PermissionsAndroid, Image, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import ImagePicker, { launchCamera } from 'react-native-image-picker';
import CameraPermission from './services/permissionservices';
import Icon from 'react-native-vector-icons/Ionicons';


const countries = ["Option 01", "Option 02", "Option 03", "Option 04"]



const ActivityDetailsScreen = ({item}) => {
  const [activity_type, setactivity_type] = useState(["Option 01", "Option 02", "Option 03", "Option 04"])
  const [name, setname] = useState(null)
  const [note, setnote] = useState(null)
  const [image, setimage] = useState(null)
  const [type, settype] = useState(null)
  const [captureImages, setcaptureImages] = useState(null)

  

  useEffect(() => {
    if (item){
      // requestCameraPermission()
      setname(item.title)
      setimage(item.image)
      setnote(item.note)
      settype(item.type)
    }
  
  }, [])

  const requestCameraPermission = () =>{
    try{
       const grantedcamera =  PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        
        {
          title: "App Camera Permission",
          message:"App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
        );
        if (grantedcamera === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Camera permission given");
        } else {
          console.log("Camera permission denied");
        }
      } catch (err) {
      console.warn(err);
        }
    
  }

  const startCamera = () => {
    // requestCameraPermission()
    CameraPermission()
    let options = {
      includeBase64:true,
      mediaType:'photo',
      saveToPhotos:true
      
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
        console.log('response', JSON.stringify(response.assets[0].base64));
        const basse64image = JSON.stringify( response.assets[0].base64)
        setcaptureImages(basse64image)
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
    <ScrollView style={{flex:1, backgroundColor:'white'}}>
      <View style={styles.inputbox}>
          <Text style={{ fontSize: 15}}>Activity Type</Text>
          {/* <TextInput placeholder="jhyG45fthj" onChangeText={(val)=>{setrefer(val)}} style={styles.InputStyle} /> */}

        <SelectDropdown
          data={activity_type}
          defaultValue={type}
          defaultButtonText={'Select Activity Type'}
          buttonStyle={{
            borderColor:'white',
                    width:'100%',
                    shadowColor: 'rgba(0,0,0,0.4)',
                    shadowOffset: {width: 1, height: 2 },
                    shadowOpacity: 0.34,
                    shadowRadius: 6.27,
                    elevation: 2
        }}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
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
      </View>

      <View style={{ paddingBottom: 20, paddingLeft: 10 }}>
          <Text style={{ fontSize: 15}}>Name</Text>
          <TextInput placeholder="jhyG45fthj" onChangeText={(val)=>{setname(val)}} style={styles.InputStyle} />
      </View>

      <View style={{ paddingBottom: 10, paddingLeft: 10 }}>
          <Text style={{ fontSize: 15 }}>Notes</Text>
          <TextInput placeholder="jhyG45fthj" multiline={true} numberOfLines={6} onChangeText={(val)=>{setnote(val)}} style={styles.InputStyle} />
      </View>

      {captureImages ?(<Image source={{ uri: 'data:image/jpeg;base64,' + captureImages }} style={styles.images} />):('')}

      <View>
        <Pressable onPress={()=> startCamera() }>
          {/* <Icon name="camera" size={50} /> */}
          <Image  
            style={{width:100, height:100}} 
            source={{uri :'https://www.nicepng.com/png/detail/127-1276180_photo-album-icon-png-icon-logo-png-album.png'}} />

        </Pressable>
      </View>
      
      <View>
        <Button title='Submit'> </Button>
      </View>


    </ScrollView>
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
    paddingHorizontal:10 ,
    paddingVertical:15
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