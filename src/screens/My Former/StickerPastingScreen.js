import { View, StyleSheet,  Pressable,  FlatList, ScrollView, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import MYinputs from '../..//components/MYinputs';
import mstyle from '../../mstyle';
import Buttons from '../../components/Buttons';
import submitReqData from '../../services/FormData';
import { AuthenicationService } from '../../services';


const StickerPastingScreen = () => {
  const [data, setdata] = useState(['Farmer 01', 'Farmer 02', 'Farmer 03'])
  const [formdata, setformdata] = useState([
    { label: 'Select Farmer', placeholder:'Note : About Alert', key: 'farmer', value:'',
     type: 'select', options:data },

      { label: 'Farmer name', value: '', type: 'text', key: 'farmer_name', },
      { label: 'Capture sticker picture with farmer', value: [], type: 'image', key: 'image', },
  ])
  // if (item) {
  //   console.log(item)

  //   for (let i in formdata) {
  //     for (let n in item.item) {
  //       console.log('item value', item.item[n])
  //       if (formdata[i].key === n) {
  //         formdata[i].value = item.item[n]
  //       }
  //     }
  //   }
  // }

  useEffect(() => {
    getData()    
  }, [])
 
  const getData = (text)=>{
    AuthenicationService.searchfarmerData(text).then(response => {
      console.log(response)
      if (response?.status== true) {
        setdata(response?.data)
      }else{
      }
    })
  }
  


  const submit =()=>{
    console.log(formdata)
    let req = submitReqData(formdata);
      // setIsLoading(true);

    AuthenicationService.sticker_pasting(req).then(response => {
      // setIsLoading(false);
      console.log(response)
      if (response?.status== true) {
      navigation.goBack()
      }else{
        ToastAndroid.showWithGravityAndOffset(
      'Oops! Something went wrong check internet connection',
      ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    );
       
      }
    })

  }

  const update =()=>{
    console.log(formdata)
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
            <Pressable>
            <Buttons title={'Submit '} onPress={()=>{submit()}} loading={false}/>
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
export default StickerPastingScreen