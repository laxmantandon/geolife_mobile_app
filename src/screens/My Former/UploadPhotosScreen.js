import { View, StyleSheet,  Pressable,  FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import MYinputs from '../..//components/MYinputs';
import mstyle from '../../mstyle';
import Buttons from '../../components/Buttons';
import submitReqData from '../../services/FormData';
import { AuthenicationService } from '../../services';


const UploadPhotosScreen = ({navigation, route: {
  params: { item },
},}) => {
  const [formdata, setformdata] = useState([
    { label: 'Note', placeholder:'Note :Note', key: 'note', value:'',
     type: 'textarea', },
      { label: 'My Image', value: [], type: 'image', key: 'image', },
  ])
  const [loading, setIsLoading] = useState(false)
  // console.log('IIIIIIIIIII', item.value.item.crop.name)

  const submit =()=>{
    let req = submitReqData(formdata)
    req = {
      name: item.value.item.crop.name,
      is_upload_photos: "Yes",
      image: req.image[0],
      note: req.note
    }
    console.log('REQ', req)
      setIsLoading(true);
      // console.log(req)
    AuthenicationService.update_crop_seminar(req).then(r => {
      // console.log('EEEEE', r)
      setIsLoading(false);
      // console.log(response)
      if (r?.status== true) {
      navigation.goBack()
      }else{
        ToastAndroid.showWithGravityAndOffset(
      'Oops! Something went wrong check internet connection',
      ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    );
       
      }
    }).catch(e => {
      setIsLoading(false);
      console.log(e)
    })

  }

  const update =()=>{
    // console.log(formdata)
  }



  return (
    <View style={mstyle.container}>
      <FlatList
        data={formdata}
        renderItem={({ item, index }) => {
          return (
            <Pressable>
              <MYinputs item={item} />
            </Pressable>
          )
        }}

        ListFooterComponent={()=>{
          return(
            <Pressable onPress={()=>{submit()}}>
            <Buttons title={'Upload'}  loading={loading}/>
          </Pressable>
          )
        }}
        
        />

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
export default UploadPhotosScreen