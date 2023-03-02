import { View, StyleSheet,  Pressable,  FlatList, ScrollView, ToastAndroid, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import MYinputs from '../../../components/MYinputs';
import mstyle from '../../../mstyle';
import Buttons from '../../../components/Buttons';
import { AuthenicationService } from '../../../services';
import submitReqData from '../../../services/FormData';


const CreateSeminarScreen = ({navigation}) => {
  const [loading, setIsLoading] = useState(true)
  const [villages, setvillages] = useState([])
  const [venue, setvenue] = useState([])
  const [bkcenter, setbkcenter] = useState([])
  const [formdata, setformdata] = useState([
    { label: 'Select Village', value: [], type: 'select', key: 'village', options:villages },

    { label: 'Date', value: new Date(), type: 'date', key: 'seminar_date'  },
    { label: 'Time', value: new Date(), type: 'time', key: 'seminar_time' },
    { label: 'Enter Seminar Venue', value: '',  key: 'venue' },

    { label: 'Automated Message', placeholder:'', key: 'message', value:'',type: 'textarea', },
    { label: 'Address', placeholder:'Address', key: 'address', value:'',type: 'textarea', },
    { label: 'Pincode', placeholder:'492001', key: 'pincode', value:'', },

    { label: 'Nearest BK Center', value: '', index:'', type: 'select', key: 'bk_center', options:[] },

     { label: 'My Image', value: [], type: 'image', key: 'image', },

     { label: 'Speeker Didi Name',placeholder:'Enter name', value: "" ,  key: 'speeker_name' },
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
    setTimeout(()=> {
      getSeminarMasters()
      clearTimeout();
    }, 500)
    // getVillages()    
  }, [])
 
  const getSeminarMasters = ()=>{
    // console.log('SEMINAR MASTERS CALLED')
    req=null
    AuthenicationService.get_seminar_masters(req).then(r => {
      console.log('SEMINAR MASTERS', r)
      if (r?.status== true) {
        setIsLoading(false)

        let bk=[]
        for (let m in r?.data["bk_center"] ){
          console.log(r?.data["bk_center"][m].name)
          bk.push(r?.data["bk_center"][m].name)
        }

        setvillages(r?.data["villages"])
        setvenue(r?.data["venues"])
        setbkcenter(r?.data["bk_center"])
        // setformdata(formdata)
        
        formdata[0].options = r?.data["villages"]
        formdata[3].options = r?.data["venues"]
        formdata[7].options = bk

        
        // setdata(response?.data)
        // setbkcenter()
        // setvenue()
        // setvillages()
      }else{
        // navigation.goBack()
      }
    }).catch(e => {
      console.log(e)
    })
  }

  const submit = () => {
    // console.log(formdata)
    let req = submitReqData(formdata);
    req.seminar_date =req.seminar_date.toISOString().split('T')[0]
    req.seminar_time =req.seminar_time.toTimeString().slice(0,5)
    setIsLoading(true);
    // req.image = "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII"
    // console.log('REQUEST', req)

    AuthenicationService.create_crop_seminar(req).then(r => {
      setIsLoading(false);
      // console.log(r)
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
      <View style={mstyle.container}>
      {/* <Pressable style={{ margin: 10 }} onPress={() => { getSeminarMasters() }}>
        <Buttons title={'Get Seminar Masters'} />
      </Pressable> */}
        <FlatList
        // onRefresh={()=>{getSeminarMasters()}}
        // refreshing={loading}
        data={formdata}
        renderItem={({ item, index }) => {
          return (
            <View>
              <MYinputs item={item} />

              <Text>{formdata[7].value}</Text>
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
export default CreateSeminarScreen