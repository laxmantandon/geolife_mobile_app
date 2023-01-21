// In App.js in a new project

import * as React from 'react';
import { View,Image, Text, Button, TextInput, FlatList, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MydayScreen from './src/MydayScreen';
import ActivityScreen from './src/ActivityScreen';
import ExpenseScreen from './src/ExpenseScreen';
import CustomerScreen from './src/CustomerScreen';
import DayplanScreen from './src/DayplanScreen';
import ActivityDetailsScreen from './src/ActivityDetailsScreen';
import ExpenseDetailsScreen from './src/ExpenseDetailsScreen';
import MyFarmerScreen from './src/screens/My Former/MyFarmerScreen';
import LoginScreen from './src/LoginScreen';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import MyFarmerListScreen from './src/screens/My Former/MyFarmerListScreen';
import DoorToDoorScreen from './src/screens/My Former/DoorToDoorScreen';
import StickerPastingScreen from './src/screens/My Former/StickerPastingScreen';
import EventsScreen from './src/screens/My Former/EventsScreen';
import CreateEventScreen from './src/screens/My Former/CreateEventScreen';
import UploadPhotosScreen from './src/screens/My Former/UploadPhotosScreen';
import CallFarmerScreen from './src/screens/My Former/CallFarmerScreen';
import PravaktaScreen from './src/screens/My Former/PravaktaScreen';
import RaiseCropAlertScreen from './src/screens/My Former/RaiseCropAlertScreen';
import WhatsappFarmerScreen from './src/screens/My Former/WhatsappFarmerScreen';
import SeminarEventDetailsScreen from './src/screens/My Former/Crop Seminar/SeminarEventDetailsScreen';
import CropSeminarScreen from './src/screens/My Former/Crop Seminar/CropSeminarListScreen';
import MyDealersScreen from './src/screens/My Dealers/MyDealersScreen';
import AddFarmerScreen from './src/AddFarmerScreen';
import SplashScreen from 'react-native-splash-screen';
import CameraPermission from './src/services/permissionservices';
import mstyle from './src/mstyle';
import Card from './src/components/Card';
import { Colors, Fonts } from './src/contants';
import Icon from 'react-native-vector-icons/Ionicons';


// SplashScreen.hide();
CameraPermission()


function HomeScreen({ navigation }) {
  const [data, setdata] = React.useState([
    { title: 'My Tasks', route: 'Myday',icon:'ios-list-outline', color:'red' },
    { title: 'My day', route: 'Myday',icon:'ios-sunny-outline', color:'gold' },
    { title: 'My farmer', route: 'Myfarmer',icon:'ios-person-outline' , color:'black' },
    { title: 'Crop Seminar', route: 'CropSeminar',icon:'ios-list' , color:'green' },
    { title: 'My dealers', route: 'Mydealers',icon:'ios-list' , color:'blue' }
  ])

  const [task, settask] = React.useState([
    { title: 'Some task are pending', subtitle: 'some details about task' },
    {
      title: 'Farmer Screen farmer details not updated',
      subtitle: 'Add mobile number or other contact details '
    },
    { title: 'Some task are pending', subtitle: 'some details about task' },
    { title: 'Some task are pending', subtitle: 'some details about task' },
    { title: 'Some task are pending', subtitle: 'some details about task' },
    { title: 'Some task are pending', subtitle: 'some details about task' },
    { title: 'Some task are pending', subtitle: 'some details about task' },
    { title: 'Some task are pending', subtitle: 'some details about task' },
    { title: 'Some task are pending', subtitle: 'some details about task' },
    { title: 'Some task are pending', subtitle: 'some details about task' },
    { title: 'Some task are pending', subtitle: 'some details about task' },
    { title: 'Some task are pending', subtitle: 'some details about task' },

  ])


  return (
    <View style={mstyle.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.SECONDARY_WHITE}
        translucent
      />
      <ScrollView>
                  <View
                  style={mstyle.ListContainer} >
                 
                  <Image style={{ margin: "auto", backgroundColor: 'silver', height: 60, width: 60, borderRadius: 50 }} 
                  source={{ uri: '' }} />

                  <View style={mstyle.detailContainer}>
                    <View style={mstyle.titleContainer}>
                      <Text style={mstyle.listListTitle} numberOfLines={1}>
                        UserName
                      </Text>
                      <Text style={{ color: 'green',fontSize:25,fontWeight:'600', fontFamily: Fonts.POPPINS_MEDIUM,
            }} numberOfLines={2}>Working time ......</Text>
                    </View>
                    
                  </View>
                </View>
        <View>
          <FlatList
            data={data}
            numColumns={2}
            renderItem={(item) => {
              return (
                <Pressable style={{ flex: 1, }} onPress={() => { navigation.navigate(item.item.route) }}>
                  {/* <Icon name='ios-checkmark-circle' size={30}  style={{paddingTop:5,paddingLeft:20}}/>

                  <Card item={item} /> */}
                                    <View
                  style={mstyle.ListContainer} >
                 
                 <Icon name={item.item.icon} size={22}  style={{paddingTop:5,paddingLeft:20,color:item.item.color}}/>

                  <View style={mstyle.detailContainer}>
                    <View style={mstyle.titleContainer}>
                      <Text style={mstyle.listListTitle} numberOfLines={1}>
                        {item.item.title}
                      </Text>
                      
                    </View>
                    
                  </View>
                </View>
                </Pressable>
              )
            }} />
        </View>

        <Text style={mstyle.title}>Current Task</Text>

        <View>
          <FlatList
            data={task}
            renderItem={(item) => {
              return (
                <Pressable style={{ flex: 1,flexDirection:'row' }} onPress={() => { navigation.navigate(item.route) }}>
                  <Icon name='ios-checkmark-circle' size={22}  style={{paddingTop:18,paddingLeft:20}}/>
                  <Card item={item} />
                </Pressable>

              )
            }} />
        </View>

      </ScrollView>

    </View>
  );
}

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App({navigation}) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" >
        <Stack.Screen name="Home" component={HomeScreen} 
        // options={() => ({
        //   headerShown: true,
        //   headerLeft: () => (
        //     <View style={{ flexDirection: 'row' }}>
        //       <Pressable
        //         onPress={() => { }}>
        //         {/* <Icon name="arrow-back" color="#212121" size={25} /> */}
        //       </Pressable>
        //     </View>
        //   ),
        //   headerTitle: "Dashboard"
        // })}
        options={( navigation ) => ({
          headerStyle: {
            height: 45,
            elevation: 5,
            shadowOpacity: 100,
          },
          headerTitleAlign: 'left',
          // headerLeft: () => (
          //   // <TouchableOpacity>
          //   //   <Icon name="menu" size={25} style={{ paddingLeft: 10, color: 'black', fontWeight: '500' }} 
          //   //   onPress={() => navigation.openDrawer()} />

          //   // </TouchableOpacity>
          // ),
          headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity>
                <Icon name="notifications-outline" size={20} style={{ paddingLeft: 0, color: 'black', paddingRight: 10 }}
                  onPress={() => navigation.navigate('Notifications')} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="headset" size={20} style={{ paddingLeft: 0, color: 'black', paddingRight: 10 }} 
                onPress={() => navigation.navigate('Help')} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="ios-person-circle-outline" size={20} style={{ paddingLeft: 0, color: 'black', paddingRight: 10 }} 
                onPress={() => navigation.navigate('Help')} />
              </TouchableOpacity>
            </View>


          ),
          headerTitle: () => (
            // <Text style={{fontWeight:'600', fontSize:17 ,color:'blue'}}>YTMonetize</Text>
            <Image
              source={require('./src/assets/images/logo.png')}
              style={{width: 105,height:45,}}
              resizeMode="contain"
            />
          ),
        })}
        
        
        
        
        />
        <Stack.Screen name="Login" component={LoginScreen} options={() => ({ headerShown: false })} />
        <Stack.Screen name="Details" component={DetailsScreen} />

        {/* My farmer screen */}
        <Stack.Screen name='Myfarmer' component={MyFarmerScreen} />
        <Stack.Screen name='AddFarmer' component={AddFarmerScreen} />
        <Stack.Screen name='Myfarmerlist' component={MyFarmerListScreen} />
        <Stack.Screen name='DoortoDoor' component={DoorToDoorScreen} />
        <Stack.Screen name='StickerPastingScreen' component={StickerPastingScreen} />
        <Stack.Screen name='EventsScreen' component={EventsScreen} />
        <Stack.Screen name='CreateEventScreen' component={CreateEventScreen} />
        <Stack.Screen name='UploadPhotosScreen' component={UploadPhotosScreen} />
        <Stack.Screen name='PravaktaScreen' component={PravaktaScreen} />
        <Stack.Screen name='RaiseCropAlertScreen' component={RaiseCropAlertScreen} />
        <Stack.Screen name='WhatsappFarmerScreen' component={WhatsappFarmerScreen} />
        <Stack.Screen name='CallFarmerScreen' component={CallFarmerScreen} />


        {/* My Crop Seminar screen */}
        <Stack.Screen name='CropSeminar' component={CropSeminarScreen} />
        <Stack.Screen name='SeminarEventDetailsScreen' component={SeminarEventDetailsScreen} />

        {/* My My Dealers screen */}
        <Stack.Screen name='Mydealers' component={MyDealersScreen} />

        {/* My day Screen */}
        <Stack.Screen name="Myday" component={MydayScreen} />
        <Stack.Screen name="Activity" component={ActivityScreen} />
        <Stack.Screen name="ActivityDetails" component={ActivityDetailsScreen} />
        <Stack.Screen name="Expense" component={ExpenseScreen} />
        <Stack.Screen name="ExpenseDetails" component={ExpenseDetailsScreen} />
        <Stack.Screen name="Customer" component={CustomerScreen} />
        <Stack.Screen name="Dayplan" component={DayplanScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;