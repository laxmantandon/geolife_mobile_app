import { View, StyleSheet,  Pressable,  FlatList, ScrollView, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import MYinputs from '../../../components/MYinputs';
import mstyle from '../../../mstyle';
import Buttons from '../../../components/Buttons';
import { AuthenicationService } from '../../../services';
import submitReqData from '../../../services/FormData';


const CreateSeminarScreen = () => {
  const [loading, setIsLoading] = useState(true)
  const [villages, setvillages] = useState([])
  const [venue, setvenue] = useState([])
  const [bkcenter, setbkcenter] = useState([])
  const [formdata, setformdata] = useState([
    { label: 'Select Village', value: [], type: 'select', key: 'village', options:villages },

    { label: 'Date', value: new Date(), type: 'date', key: 'seminar_date'  },
    { label: 'Time', value: new Date(), type: 'time', key: 'seminar_time' },
    { label: 'Select The Venue', value: '', type: 'select', key: 'venue', options:venue },

    { label: 'Automated Message', placeholder:'', key: 'message', value:'',type: 'textarea', },

    { label: 'Nearest BK Center', value: '', type: 'select', key: 'bk_center', options:bkcenter },

     { label: 'My Image', value: [], type: 'image', key: 'image', },

     { label: 'Speeker Didi Name',placeholder:'Enter name', value: '',  key: 'speeker_name' },
     { label: 'Speeker Didi Mobile', placeholder: 'Enter mobile number',value:'',  key: 'mobile_no', keyboard:'numeric' },


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
    getSeminarMasters()
    // getVillages()    
  }, [])
 
  const getSeminarMasters = ()=>{
    req=null
    AuthenicationService.get_seminar_masters(req).then(r => {
      // console.log(r)
      if (r?.status== true) {
        setIsLoading(false)

        setvillages(r.data["villages"])
        setvenue(r.data["venues"])
        setbkcenter(r.data["bk_center"])
        formdata[0].options = r.data["villages"]
        formdata[3].options = r.data["venues"]
        formdata[5].options = r.data["bk_center"]
        // setdata(response?.data)
        // setbkcenter()
        // setvenue()
        // setvillages()
      }else{
        navigation.goBack()
      }
    })
  }

  const submit = () => {
    // console.log(formdata)
    let req = submitReqData(formdata);
    req.seminar_date =req.seminar_date.toISOString().split('T')[0]
    req.seminar_time =req.seminar_time.toTimeString().slice(0,5)
    setIsLoading(true);
    console.log('REQUEST', req)

    AuthenicationService.create_crop_seminar(req).then(r => {
      setIsLoading(false);
      console.log(r)
      if (r?.status == true) {
        navigation.goBack()
      } else {
        ToastAndroid.showWithGravityAndOffset(
          r.message,
          ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
        );

      }
    })

  }

  const update =()=>{
    // console.log(formdata)
  }



  return (
      <ScrollView style={mstyle.container}>
        <FlatList
        onRefresh={()=>{getSeminarMasters()}}
        refreshing={loading}
        data={formdata}
        renderItem={({ item, index }) => {
          return (
            <View>
              <MYinputs item={item} />
            </View>
          )
        }}

        ListFooterComponent={()=>{
          return(
            <Pressable style={{margin:10}} onPress={()=>{submit()}}> 
            <Buttons title={'Submit'}  loading={loading}/>
          </Pressable>
          )
        }}
        />
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
export default CreateSeminarScreen