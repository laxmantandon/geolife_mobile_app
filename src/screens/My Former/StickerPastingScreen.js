import { View, StyleSheet,  Pressable,  FlatList, ScrollView, ToastAndroid,Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import MYinputs from '../..//components/MYinputs';
import mstyle from '../../mstyle';
import Buttons from '../../components/Buttons';
import submitReqData from '../../services/FormData';
import { AuthenicationService } from '../../services';
import SearchableDropDown from 'react-native-searchable-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';


const StickerPastingScreen = ({navigation}) => {
  const [data, setdata] = useState([])
  const [formdata, setformdata] = useState([
    // { label: 'Select Farmer', placeholder:'Note : About Alert', key: 'farmer', value:'',
    //  type: 'select', options:data },

      // { label: 'Farmer name', value: '', type: 'text', key: 'farmer_name', },
      { label: 'Capture sticker picture with farmer', value: [], type: 'image', key: 'image', },
  ])

  const [selectedItems, setselectedItems] = useState('')
  const [loading, setIsLoading] = useState(false)
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
    getData("")    
  }, [])
 
  const getData = (text)=>{
    let req = {
      "text": text
    }
    // // console.log(text)
    AuthenicationService.searchfarmerData(req)
      .then(x => {
        // // console.log('MMMMMM', x.data)
        // if (x.status == true) {
        //   let mapped_array = []
        //   x.data.forEach(a => {
        //     mapped_array.push({ "id": a.first_name, "name": a.mobile_number })
        //   })
        //   setdata(mapped_array)
        // } else {
        // }
      }).catch(e => {
        // console.log(e)
      })
  } 
  


  const submit =()=>{
    // // console.log(formdata)
    let req = submitReqData(formdata);
      setIsLoading(true);
      req.farmer_name=selectedItems.id
      // console.log(req)
    AuthenicationService.sticker_pasting(req).then(r => {
      // console.log('EEEEE', r)
      setIsLoading(false);
      // // console.log(response)
      if (r?.status== true) {
      navigation.goBack()
      ToastAndroid.showWithGravityAndOffset(
        'Sticker Pasting Successfully Submited',
        ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
      );
      }else{
        ToastAndroid.showWithGravityAndOffset(
      'Oops! Something went wrong check internet connection',
      ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    );
       
      }
    }).catch(e => {
      setIsLoading(false);
      // console.log(e)
    })

  }

  const update =()=>{
    // // console.log(formdata)
  }



  return (
    <View style={mstyle.container1}>
       <View style={mstyle.inputContainer1}>
      {selectedItems?(
        <View style={{
          padding: 8, marginTop: 2, flexDirection: 'row',
          backgroundColor: 'white', borderColor: 'silver',
          borderWidth: 1, borderRadius: 5, width: '100%'
          }}>

          <Text style={{ color: 'black', width: '90%', fontSize: 15, fontWeight: 'bold' }}> {selectedItems.name}</Text>
          <Icon onPress={() => { setselectedItems() }} name='close-circle-outline' size={25} style={{ color: 'red' }}></Icon>

        </View>
      ):(
          <SearchableDropDown
            onItemSelect={(item) => {
              // formdata[0].value = item.name
              // console.log(formdata[0].value)
              // const items = this.state.selectedItems;
              // items.push(item)
              setselectedItems(item)
              // this.setState({ selectedItems: items });
            }}
            containerStyle={{}}
            onRemoveItem={(item, index) => {
              const items = selectedItems.filter((sitem) => sitem.id !== item.id);
              setselectedItems(items)
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
            items={data}
            defaultIndex={2}
            resetValue={false}
            textInputProps={
              {
                placeholder: "Search Farmer",
                underlineColorAndroid: "transparent",
                style: {
                    padding: 12,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                    color: "black"
                },
                onTextChange: text => 
                {
                  let req = {
                    "text": text
                  }
                  AuthenicationService.searchfarmerData(req)
                    .then(x => {
                        if (x.status == true) {
                          let mapped_array = []
                          x.data.forEach(a => {
                            mapped_array.push({ "name": `${a.first_name} ${a.last_name} (${a.mobile_number})` , "id": a.mobile_number })
                          })
                          setdata(mapped_array)
                        } else {
                        }
                      })
                      .catch(error => {
                        // console.log(error)
                      })
                }
              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
        />
      )}
      </View>
      
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
            <Buttons title={'Submit '}  loading={loading}/>
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