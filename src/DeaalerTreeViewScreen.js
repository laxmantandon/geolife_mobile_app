import { View, Text, FlatList, Pressable, TextInput, Linking } from 'react-native'
import React, { useState } from 'react'
import Card from './components/Card'
import FabButton from './components/FabButton'
import mstyle from './mstyle'
import { Colors } from './contants'
import { useEffect } from 'react'
import { AuthenicationService } from './services'
import Icon from 'react-native-vector-icons/Ionicons';
// import TreeView from './TreeView'
import TreeView from 'react-native-final-tree-view'

const DeaalerTreeViewScreen = ({ navigation }) => {

  const [data, setdata] = useState([])
  const [serachingData, setserachingData] = useState(true)
  const [treeData, settreeData] = useState([])

  const getTreeData = (parent) => {
    let req = {
      'doctype': 'Geo Mitra',
      'parent': parent,
      'label':'Geo Mitra',
      'tree_method':'frappe.desk.treeview.get_children'

    }
    AuthenicationService.GetTreeData(req).then(x => {
      console.log(x,'Tree DAta')
      settreeData(x.message)
      console.log(treeData,'seted Tree Data')

      // return x
    })
  }

  const searchFilterFunction = (text) => {
    setserachingData(true)
    let req = {
      "text": text
    }
    // // console.log(text)
    AuthenicationService.searchdealerData(req)
      .then(x => {
        setserachingData(false)
        console.log(x)

        if (x.status == true) {
          m = []
          m.push(x.tree)
          // console.log(treeData[0])
          // settreeData(m)
          let mapped_array = []
          x.data.forEach(a => {
            mapped_array.push({ "value": "9685062116", "title": `${a.dealer_name}`, "mobile_number": a.mobile_number, "whatsapp": a.mobile_number, "call": a.mobile_number })
          })
          setdata(mapped_array)
        } else {
        }
      })
  }


  useEffect(() => {
    // getData()
    getTreeData()
    // searchFilterFunction("")
  }, [])

  const family = [
    {
      id: 'Grandparent',
      name: 'Geo Mitra 01',
      age: 78,
      children: [
        {
          id: 'Me',
          name: 'Geo Mitra 02',
          age: 30,
          children: [
            {
              id: 'Erick',
              name: 'Geo Mitra 03',
              age: 10,
            },
            {
              id: 'Rose',
              name: 'Geo Mitra 04',
              age: 12,
            },
          ],
        },
      ],
    },
  ]

  function getIndicator(isExpanded, hasChildrenNodes) {
    if (!hasChildrenNodes) {
      return (<Icon name='caret-back-outline' size={25} style={{color:'black'}} />)
    } else if (isExpanded) {
      return (<Icon name='caret-down-outline' size={25} style={{color:'black'}}/>)
    } else {
      return (<Icon name='caret-forward-outline' size={25} style={{color:'black'}}/>)
    }
  }




  return (
    <View style={mstyle.container1}>

      {/* <View style={mstyle.inputContainer}>
        <View style={mstyle.inputSubContainer}>

          <TextInput
            placeholder={'Type something'}
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            style={mstyle.inputText}
            onChangeText={text => {
              searchFilterFunction(text)
            }}
          />
        </View>
      </View> */}

      <View style={{backgroundColor:'white',padding: 1, paddingVertical:10, margin:7, borderRadius:7}}>
     
        <TreeView
          data={treeData} // defined above
          renderNode={({ node, level, isExpanded, hasChildrenNodes }) => {
            console.log(hasChildrenNodes)
        

            
            console.log(level)
            return (
            
                <View style={{ flexDirection:'row', backgroundColor: 'white', margin: 5, marginTop: 5, 
                borderRadius: 7, elevation: 4, padding: 10, marginLeft:level==0?5:(level+1)*15 }}>
                <View>
                  <Text>
                    {getIndicator(isExpanded, hasChildrenNodes)}
                  </Text>
                  </View>
                
                <View style={{}}>
                <Text
                  style={{
                    color:'black', fontSize:14, fontWeight:'600'
                  }}
                >
                   {node.sales_person_name} <Text>({node.name})</Text>
                </Text>
{
  node.children?(<Text
    style={{
      color:'grey', fontSize:12,fontWeight:'400', paddingTop:4
    }}
  >
   Get Children {`-->`}
  </Text>):('')
}
                

                  </View>

                  <Pressable onPressIn={()=>{
                    navigation.navigate('Customer',{item:node})
                  }} style={{marginLeft:'auto'}}>
                    <Text>
                     Get Dealers
                    </Text>
                  </Pressable>
        </View>
                
             
            )
          }}
        />

      </View>


      {/* <FlatList
        refreshing={serachingData}
        onRefresh={() => {
          searchFilterFunction("")
        }}
        data={data}
        renderItem={renderItem} /> */}

      {/* <Pressable onPress={() => { navigation.navigate('AddCustomer') }}>
        <FabButton />
      </Pressable> */}


    </View>
  )
}

export default DeaalerTreeViewScreen