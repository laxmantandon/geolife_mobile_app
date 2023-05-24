import { View, StyleSheet,  Pressable,  FlatList, ScrollView, ToastAndroid, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import MYinputs from '../../../components/MYinputs';
import mstyle from '../../../mstyle';
import Buttons from '../../../components/Buttons';
import { AuthenicationService } from '../../../services';
import submitReqData from '../../../services/FormData';


const CreateSeminarScreen = ({navigation}) => {
  const [loading, setIsLoading] = useState(false)
  const [villages, setvillages] = useState([])
  const [venue, setvenue] = useState([])
  const [bkcenter, setbkcenter] = useState([])
  const [formdata, setformdata] = useState([
    { label: 'Select Village', value: [], type: 'select', key: 'village', options:villages },

    { label: 'Seminar Date', value: new Date(), type: 'date', key: 'seminar_date'  },
    { label: 'Seminar Time', value: new Date(), type: 'time', key: 'seminar_time' },
    { label: 'Enter Seminar Venue', value: '', placeholder:'Enter Seminar Venue',  key: 'venue' },

    { label: 'Automated Message', placeholder:'Type Your Automated Message', key: 'message', value:'',type: 'textarea', },
    { label: 'Address', placeholder:'H.no -123, Building Name, village, Near by area', key: 'address', value:'',type: 'textarea', },
    { label: 'Pincode', placeholder:'Ex. - 492001', key: 'pincode', value:'', keyboard:'numeric' },

    { label: 'Nearest BK Center', value: '', index:'', type: 'select', key: 'bk_center', options:[] },

     { label: 'My Image', value: [], type: 'image', key: 'image', },

    //  { label: 'Speeker Didi Name',placeholder:'Enter name', value: "" ,  key: 'speeker_name' },
    //  { label: 'Speeker Didi Mobile', placeholder: 'Enter mobile number',value:'',  key: 'mobile_no', keyboard:'numeric' },

    ])
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

  useEffect(() => {
    getSeminarMasters()
    setTimeout(()=> {
      getSeminarMasters()
      clearTimeout();
    }, 500)
    // getVillages()    
  }, [])
 
  const getSeminarMasters = ()=>{
    // // console.log('SEMINAR MASTERS CALLED')
    req=null
    AuthenicationService.get_seminar_masters(req).then(r => {
      // console.log('SEMINAR MASTERS', r)
      if (r?.status== true) {
        // setIsLoading(false)

        let bk=[]
        for (let m in r?.data["bk_center"] ){
          // console.log(r?.data["bk_center"][m].name)
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
      // console.log(e)
    })
  }

  const submit = () => {
    // // console.log(formdata)
    if(!loading){
      setIsLoading(true);
      let req = submitReqData(formdata);
      if (!req.pincode) {
        alert("Please add Pincode")
        setIsLoading(false);
        return
      }
      if (!req.seminar_date) {
        alert("Please select Seminar date")
        setIsLoading(false);
        return
      }

      if (!req.seminar_time) {
        alert("Please select Seminar time")
        setIsLoading(false);
        return
      }

      if (!req.village) {
        alert("Please select Seminar time")
        setIsLoading(false);
        return
      }
      req.speeker_name = bkcenter[formdata[7].index]['speaker_didi']
      req.mobile_no =  bkcenter[formdata[7].index]['mobile_number']
      req.seminar_date =req.seminar_date.toISOString().split('T')[0]
      req.seminar_time =req.seminar_time.toTimeString().slice(0,5)
      setIsLoading(true);
      
      // // console.log('REQUEST', req)
  
      AuthenicationService.create_crop_seminar(req).then(r => {
        setIsLoading(false);
        // // console.log(r)
        if (r?.status == true) {
          ToastAndroid.showWithGravityAndOffset(
            'New Seminar created Successfully',
            ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
          );
          navigation.goBack()
          
        } else {
          ToastAndroid.showWithGravityAndOffset(
            r.message,
            ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
          );
  
        }
      })
  
    }
    
  }



  return (
      <View style={mstyle.container1}>
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