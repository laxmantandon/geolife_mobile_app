import * as React from 'react';
import { useEffect } from 'react';
import { View, Image, Text, Button, TextInput, FlatList, StatusBar, ScrollView, TouchableOpacity, ToastAndroid, BackHandler, Alert, ActivityIndicator, ImageBackground } from 'react-native';
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
import CreateSeminarScreen from './src/screens/My Former/Crop Seminar/CreateSeminarScreen';
import FreeSampleBeneficiariesScreen from './src/screens/My Former/Crop Seminar/FreeSampleBeneficiariesScreen';
import AttendanceScreen from './src/screens/My Former/Crop Seminar/AttendanceScreen';
import PreActivityScreen from './src/screens/My Former/Crop Seminar/PreActivityScreen';
import PostActivityScreen from './src/screens/My Former/Crop Seminar/PostActivityScreen';
import { AuthenicationService } from './src/services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Buttons from './src/components/Buttons';
import { AuthContext } from './src/components/context';
import FarmerDetails from './src/screens/My Former/FarmerDetails';
import DayplanDetailsScreen from './src/DayplanDetailsScreen';
import CustomerDetailsScreen from './src/CustomerDetailsScreen';
import AddPaymentScreen from './src/AddPaymentScreen';
import ProductScreen from './src/ProductScreen';
import StartSession from './src/StartSession';
import ReturnOrderScreen from './src/ReturnOrderScreen';
import FramerProductKitScreen from './src/screens/My Former/FramerProductKitScreen';
import VideoScreen from './src/VideoScreen';
import { BarChart } from "react-native-gifted-charts";
import moment from 'moment';
import { useState } from 'react';
import QuizScreen from './src/QuizScreen';
import 'react-native-gesture-handler';
import { DrawerToggleButton, createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentScreen } from './src/DrawerScreen';
import FarmerOrdersScreen from './src/screens/My Former/FarmerOrdersScreen';
import OrderDetailsScreen from './src/screens/My Former/OrderDetailsScreen';
import DealerPaymentScreen from './src/screens/My Dealers/DealerPaymentScreen';
import DealerProfileScreen from './src/screens/My Dealers/DealerProfileScreen';
import FarmerMeetingScreen from './src/screens/My Former/FarmerMeetingScreen';
import CropProjectScreen from './src/screens/My Former/CropProjectScreen';
import ActivityDealerDetailsScreen from './src/ActivityDealerDetailsScreen';
import ViewImageScreen from './src/screens/My Former/ViewImageScreen';
import FarmerMeetingListScreen from './src/screens/My Former/FarmerMeetingListScreen';
import FarmerMeetingAttendanceScreen from './src/screens/My Former/FarmerMeetingAttendanceScreen';
import LocationPermission from './src/services/LocationPermission';
import DeaalerTreeViewScreen from './src/DeaalerTreeViewScreen';
import StoragePermission from './src/services/StoragePermission';
// SplashScreen.hide();
CameraPermission()
StoragePermission()
LocationPermission()



const Drawer = createDrawerNavigator();

function MyDGODrawer({navigation}) {
  return (
    <Drawer.Navigator initialRouteName='Home1' drawerContent={props => <DrawerContentScreen {...props} />}>
      <Drawer.Screen name="Home1" component={HomeScreen} options={({ navigation }) => ({
        headerStyle: {
          height: 80,
          elevation: 5,
          shadowOpacity: 100,
          backgroundColor: 'white',
        },
        headerTitleAlign: 'left',
        headerLeft: () => (

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => { navigation.openDrawer() }}>
              <Icon name='ios-menu-outline' size={30} style={{ color: 'black', paddingLeft: 12, paddingTop: 8 }} />
            </TouchableOpacity>

            <Image
              source={require('./src/assets/images/logo.png')}
              style={{ width: 105, height: 45, }}
              resizeMode="contain"
            />
          </View>
        ),
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
        headerTitle: () => null
        // (
        //   // <Text style={{fontWeight:'600', fontSize:17 ,color:'blue'}}>YTMonetize</Text>
        //   <Image
        //     source={require('./src/assets/images/logo.png')}
        //     style={{width: 105,height:45,}}
        //     resizeMode="contain"
        //   />
        // ),
      })} />
    </Drawer.Navigator>
  );
}
function HomeScreen({ navigation }) {
  SplashScreen.hide();
  LocationPermission()

  const [isLoading, setisLoading] = useState(false)
  const [Loading, setLoading] = useState(false)
  const [data, setdata] = React.useState([
    // { title: 'My Tasks', route: 'Myday', icon: 'ios-list-outline', color: 'red' },
    // { title: 'My Self', route: 'Myday', icon: 'ios-sunny-outline', color: 'gold' },
    // { title: 'My farmer', route: 'Myfarmer', icon: 'ios-person-outline', color: 'black' },
    // { title: 'Crop Seminar', route: 'CropSeminar', icon: 'ios-list', color: 'green' },
    // { title: 'My dealers', route: 'Mydealers', icon: 'ios-list', color: 'blue' }
  ])

  const [dashboarddata, setdashboarddata] = React.useState([
    // { title: 'My Tasks', route: 'Myday', icon: 'ios-list-outline', color: 'red' },
    { subtitle: "In A Month", value: "0/0", title: 'Present Days',  icon: 'ios-sunny-outline', color: '#90EE90' , },
    { subtitle: "Total Done", value: "0", title: 'BCNP Kit Booking',  icon: 'ios-person-outline', color: 'skyblue' ,route:"FarmerOrdersScreen" },
    { subtitle: "In 15 Days", value: "0/0", title: 'Dealer Not Visit',  icon: 'ios-list', color: Colors.LIGHT_GREEN ,route:"Activity" },
    { subtitle: "Total app downloads", value: "0", title: 'TFP Downloads',  icon: 'ios-list', color: Colors.LIGHT_RED ,route:"DoortoDoor" },
    { subtitle: "My former list", value: "0", title: 'My Farmers',  icon: 'ios-list', color: '#B0E0E6' ,route:"Myfarmerlist" },
    { subtitle: "All dealer appointed by me", value: "0", title: 'My Dealers',  icon: 'ios-list', color: Colors.LIGHT_GREY ,route:"Customer", value:1 },
    // { subtitle: "My Performance", value: "15/45", title: 'Target vs Achievement ',  icon: 'ios-list', color: Colors.LIGHT_YELLOW , },
    { subtitle: "BCNP Incentive", value: "0/0", title: 'BCNP Incentive',  icon: 'ios-list', color: Colors.LIGHT_YELLOW , },
  ])
  const [loggedIn, setloggedIn] = React.useState(false)
  const [attendance, setattendance] = useState([])
  const [user, setuser] = React.useState([])
  if (loggedIn == false) {
    AsyncStorage.getItem("user_info").then((value) => {
      // // console.log(value)
      setloggedIn(true)
      const usrd = JSON.parse(value)
      if (usrd) {
        setuser(usrd)
      } else {
        navigation.navigate('Login')
      }
    })
  }


  const [task, settask] = React.useState([
    // { title: 'Sample Task' , subtitle:'Details Description of task' }
  ])

  const backButtonPressd = () => {
    Alert.alert('Hold on!', 'Are you sure you want to exit?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      { text: 'YES', onPress: () => BackHandler.exitApp() },
    ]);
  }

  const [session, setsession] = useState()
  const [sessionTime, setsessionTime] = useState(0)


  const getcurrentTime = () => {
    setTimeout(async () => {
      AsyncStorage.getItem("user_session").then((value) => {
        // setsession(JSON.parse(value))
        let duration = moment.duration(moment(new Date()).diff(moment(JSON.parse(value)).add(1, 'second')))
        if (duration){
          setsessionTime(duration.asHours())
        if(duration.hours() >=24){
          navigation.navigate('SessionScreen')
        }
      }else{
        navigation.navigate('SessionScreen')
      }
      })
      getcurrentTime()
      // // console.log('session', value)
      // let mn = JSON.parse(value)
      // mn++
      // setsession(mn)
      // setsessionTime(mn)

    }, 1000);

    //  return  duration.asMinutes()
  }

  useEffect(() => {
    navigation.getState().routes[0].name
    const backAction = () => {
      backButtonPressd()
      return true;

    };

    getcurrentTime()

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    // getTask()
    getTask()
    // getAttendance()
    return () => backHandler.remove();


  }, [])

  const [loading, setloading] = React.useState(true)
  const image = { uri: 'https://media.istockphoto.com/id/1284379612/photo/indian-farmer-spreading-fertilizer-in-the-green-banana-field.jpg' }

  getTask = async () => {
    getAttendance()
    setloading(true)
    AuthenicationService.get_users_task(null).then(r => {
      // console.log('RRRRR', r)

      let my_tasks = []
      if (r.status == true) {
        r.data.forEach(d => {
          my_tasks.push({ 'subtitle': d.priority, 'title': d.description, 'icon': 'chevron-forward-outline', 'icon_color': d.status == 'Open' ? Colors.DEFAULT_RED : Colors.SECONDARY_GREEN })
        })
        settask(my_tasks)
        let dashboarddata1 = dashboarddata
        dashboarddata1[2].value = r.dashboard?.dealer_not_visit?r.dashboard?.dealer_not_visit:'0'
        dashboarddata1[1].value = r.dashboard?.kit_booking?r.dashboard?.kit_booking:'0'
        dashboarddata1[0].value = r.dashboard?.present_days?r.dashboard?.present_days:'0'
        dashboarddata1[3].value = r.dashboard?.tft_downloads?r.dashboard?.tft_downloads:'0'
        dashboarddata1[4].value = r.dashboard?.farmer_connected?r.dashboard?.farmer_connected:'0'
        dashboarddata1[5].value = r.dashboard?.new_dealer?r.dashboard?.new_dealer:'0'
        // dashboarddata1[6].value = r.dashboard?.target_achievement?r.dashboard?.target_achievement:'0'
        dashboarddata1[6].value = r.dashboard?.incentive?r.dashboard?.incentive:'0'

       

        setdashboarddata(dashboarddata1)
        // setloading(false)
        // console.log(r.dashboard?.dealer_not_visit)

        if (dashboarddata[4].value){
          setloading(false)
        }else{
          setTimeout(async () => {
            setloading(false)
          },4000)
          
        }

      } else {
        setloading(false)

      }
    }).catch(e => {
      // // console.log(e);
      setloading(false)

    })

  }

  const chart_data = [
  //   { value: 4.50, label: 'Sun', frontColor: 'green' },
  // { value: 8.0, label: 'Mon', },
  // { value: 9.0, label: 'Tue', },
  // { value: 7.0, label: 'Wed', },
  // { value: 8.0, label: 'Thu', },
  // { value: 9.0, label: 'Fri', },
  // { value: 7.0, label: 'Sat', },
  // { value: 8.0, label: 'Mon', },
  // { value: 9.0, label: 'Tue', },
  // { value: 7.0, label: 'Wed', },
  // { value: 8.0, label: 'Thu', },
  // { value: 9.0, label: 'Fri', },
  // { value: 7.0, label: 'Sat', }
  ]


const getAttendance = async () => {
    setloading(true)
    AuthenicationService.get_users_Attendance(null).then(r => {
      console.log('attendance', r)
      setloading(false)
      if (r.status == true) {
        setattendance(r.data)
      } else {
        setattendance(chart_data)
      }
    }).catch(e => {
      // // console.log(e);
    })

  }
  return (
    <View style={mstyle.container1}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'white'}
        translucent
      />
      <ScrollView>
        {/* 
<FlatList
        horizontal={true}
        data={data}
        style={{height:100}}
        renderItem={(item) => {
          return (
            <Pressable style={{ flex: 1,height:200 }} onPress={() => { navigation.navigate(item.item.route) }}>
                  <ImageBackground 
                          source={require('./src/assets/images/01.jpg')}
                          resizeMode="cover" style={{flex: 1,
                            justifyContent: 'center',
                            marginHorizontal:5, borderRadius:8,}}>
                        <View style={{height:200,width:150, 
                          marginHorizontal:5,  borderRadius:8,
                          }} >
                          <View style={{paddingTop:100}}>
                          <Icon name={item.item.icon} size={22} style={{ paddingTop: 5, paddingLeft: 20, color: item.item.color }} />

                            <View style={mstyle.titleContainer}>
                              <Text style={mstyle.listListTitle} numberOfLines={1}>
                                {item.item.title}
                              </Text>

                            </View>

                          </View>
                        </View>
                  </ImageBackground>
            </Pressable>
          )
        }}
        /> */}

        <View>
          <View
            style={[mstyle.ListContainer]} >

            {/* <Image style={{ margin: "auto", backgroundColor: 'silver', height: 60, width: 60, borderRadius: 50 }} 
                  source={{ uri: '' }} /> */}

            <View style={[mstyle.detailContainer]}>
              <View style={[mstyle.titleContainer, { width: '85%' }]}>
                <Text style={mstyle.listListTitle} numberOfLines={1}>
                  {user.first_name} {user.last_name}
                </Text>
                <Text style={{
                  color: 'gray', fontSize: 12, fontWeight: '600', fontFamily: Fonts.POPPINS_MEDIUM,
                }} numberOfLines={2}>{user.mobile_no}</Text>
                <Text onPress={() => { getcurrentTime() }} style={{
                  color: 'green', fontSize: 15, fontWeight: '700', fontFamily: Fonts.POPPINS_MEDIUM,
                }} numberOfLines={1}>Working time <Text style={{ fontSize: 25, fontWeight: 'bold' }}> {sessionTime.toString().substring(0, sessionTime>=10?3:2)}{(((sessionTime.toString().substring(2, 4))*.60).toFixed(2)).toString().substring(0, (((sessionTime.toString().substring(2, 4))*.60).toFixed(2))>=10 ?2:1 )} </Text> Hours

                </Text>
              </View>
              <View style={{ width: '15%' }}>
                <Pressable title='Check Out' onPress={() => {
                  // getTask()
                  navigation.navigate('SessionScreen')
                }} >

                  <Icon name='power' size={25}
                    style={{
                      textAlign: 'center', color: 'red', backgroundColor: Colors.LIGHT_RED,
                      paddingHorizontal: 10, paddingVertical: 10, borderRadius: 50
                    }} />
                  {/* <Text>Check out user</Text> */}
                </Pressable>


              </View>

            </View>
          </View>

        

          <FlatList
            refreshing={loading}
            onRefresh={() => { getTask() }}
            data={data}
            numColumns={2}

            ListHeaderComponent={()=>{
              return(

                <View style={{ marginHorizontal: 4 }}>

                <FlatList
                  data={dashboarddata}
                  numColumns={4}
                  renderItem={(item) => {
                    return (
                      <Pressable style={{ flex: 1, }}  onPressIn={() => { if (item.item?.route){
                        if(item.item.value){
                          navigation.navigate(item.item?.route, {item:1})

                        }else{
                          navigation.navigate(item.item?.route)

                        }
                      } }}>
                      
                        <View style={{flex: 1,
                          backgroundColor: item.item.color,
                          // borderColor: 'black',
                          // borderWidth: .3,
                          // borderBottomColor: Colors.SECONDARY_WHITE,
                          // borderBottomWidth: 1,
                          paddingLeft: 7,
                          paddingVertical: 7,
                          borderRadius: 10,
                          marginHorizontal: 4,
                          marginVertical: 5,
                          elevation: 8
                        }} >
                          <View>
                            <Text style={{ fontSize: 15, textAlign: 'center',color:'black',fontWeight:'bold' }}>
                              {item.item?.value}
                            </Text>
                          </View>
    
                          <View style={{ }} >
                            {/* <Icon name={item.item.icon} size={22} style={{ paddingTop: 5,  color: 'black',bottom:1,alignSelf:'center'}} /> */}
                            <View style={[mstyle.detailContainer,{marginHorizontal:1}]}>
                              
                              {/* <View style={[mstyle.titleContainer,{borderColor:'black', borderWidth:1}]}> */}
                                <Text style={{
                                  flex: 1, fontSize: 12, color: 'black',
                                  fontFamily: Fonts.POPPINS_MEDIUM,
                                  fontWeight: 'bold',textAlign:'center'
                                }} numberOfLines={2}>
                                  {item.item.title}
                                </Text>
                                {/* </View> */}
                                {/* {item.item?.subtitle ? (
                                  <Text style={[mstyle.listListTitle, { flex: 1, fontSize: 12, color: 'gray', }]} numberOfLines={2}>
                                    {item.item?.subtitle}
                                  </Text>
                                ) : ('')
                                } */}
    
    
    
                            </View>
                          </View>
                        </View>
                      </Pressable>
                    )
                  }}
                />
    
              </View>
                
              )
            }}
            renderItem={(item) => {
              return (
                <Pressable style={{ flex: 1, }} onPress={() => { navigation.navigate(item.item.route) }}>
                  <View
                    style={mstyle.ListContainer} >
                    <Icon name={item.item.icon} size={22} style={{ paddingTop: 5, paddingLeft: 20, color: item.item.color }} />
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
            }}

            ListFooterComponent={() => {
              return (
                <View>
                  {attendance ?(
                    <View style={mstyle.ListContainer}>
                    <BarChart data={attendance}
                      frontColor="#177AD5"
                      barBorderRadius={4}
                      barWidth={22}
                      noOfSections={5}
                      yAxisThickness={0}
                      xAxisThickness={0}
                      labelWidth={30}
                      labelsExtraHeight={15}
                      spacing={20}
                    />

                  </View>
                  ):(
                    ''
                  )}

                <View style={{ backgroundColor: 'white', borderRadius: 4, margin: 8, elevation: 5, paddingBottom: 10 }} >
                <Text style={mstyle.title}>Current Task</Text>
                <FlatList
                  data={task}
                  renderItem={(item) => {
                    return (
                      <Pressable style={{ flex: 1, flexDirection: 'row' }}
                        // onPress={() => { getTask() }}
                      >
                        {/* <Icon name='chevron-forward-outline' size={22} style={{ paddingTop: 18, paddingLeft: 10 }} /> */}
                        <Card item={item} />
                      </Pressable>
      
                    )
                  }}
                  ListEmptyComponent={(item) => {
                    return (
                      <View style={{ flex: 1, alignSelf: 'center', paddingTop: 50 }}
                      //  onPress={() => { navigation.navigate(item.route) }}
                      >
      
                        <Text style={{ color: 'gray', fontSize: 14, textAlign: 'center' }}>No Data In List Please Refresh</Text>
                        <Pressable onPress={() => { getTask() }} >
                          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
      
                            <Text style={{
                              color: Colors.DEFAULT_GREEN, backgroundColor: Colors.LIGHT_GREEN,
                              paddingHorizontal: 20, paddingVertical: 6, fontSize: 16,
                              borderRadius: 7, fontWeight: '500'
                            }}>
                              <Icon name='refresh-circle-outline' size={18}
                                style={{ paddingTop: 18, paddingHorizontal: 10 }} />
                              Refresh</Text>
      
                          </View>
      
                        </Pressable>
                      </View>
      
                    )
                  }} />
              </View>

              </View>
            //     <View style={{ backgroundColor: 'white', borderRadius: 4, margin: 8, elevation: 5, paddingBottom: 10 }} >
            //       <Text style={mstyle.title}>Current Task</Text>
            //       <FlatList
            //         refreshing={loading}
            //         onRefresh={() => { getTask() }}
            //         data={task}
            //         renderItem={(item) => {
            //           return (
            //             <Pressable style={{ flex: 1, flexDirection: 'row' }}
            //             //  onPress={() => { navigation.navigate(item.route) }}
            //             >
            //               {/* <Icon name='chevron-forward-outline' size={22} style={{ paddingTop: 18, paddingLeft: 10 }} /> */}
            //               <Card item={item} />
            //             </Pressable>

            //           )
            //         }}
            //         ListEmptyComponent={(item) => {
            //           return (
            //             <View style={{ flex: 1, alignSelf: 'center', paddingTop: 50 }}
            //             //  onPress={() => { navigation.navigate(item.route) }}
            //             >

            //               <Text style={{ color: 'gray', fontSize: 14, textAlign: 'center' }}>No Data In List Please Refresh</Text>
            //               <Pressable onPress={() => { getTask() }} >
            //                 <View style={{ flexDirection: 'row', alignSelf: 'center' }}>

            //                   <Text style={{
            //                     color: Colors.DEFAULT_GREEN, backgroundColor: Colors.LIGHT_GREEN,
            //                     paddingHorizontal: 20, paddingVertical: 6, fontSize: 16,
            //                     borderRadius: 7, fontWeight: '500'
            //                   }}>
            //                     <Icon name='refresh-circle-outline' size={18}
            //                       style={{ paddingTop: 18, paddingHorizontal: 10 }} />
            //                     Refresh</Text>

            //                 </View>

            //               </Pressable>
            //             </View>

            //           )
            //         }} />
            //     </View>

              )
            }}
          />


          
          
        </View>


     




      </ScrollView>
    </View>
  );
}

function DetailsScreen({ navigation }) {
  const [data, setdata] = React.useState([
    // { title: 'My Tasks', route: 'Myday', icon: 'ios-list-outline', color: 'red' },
    { title: 'My Self', route: 'Myday', icon: 'ios-sunny-outline', color: 'gold' },
    { title: 'My farmer', route: 'Myfarmer', icon: 'ios-person-outline', color: 'black' },
    { title: 'Crop Seminar', route: 'CropSeminar', icon: 'ios-list', color: 'green' },
    // { title: 'My dealers', route: 'Mydealers', icon: 'ios-list', color: 'blue' }
  ])
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <FlatList
        data={data}
        numColumns={2}
        renderItem={(item) => {
          return (
            <Pressable style={{ flex: 1, }} onPress={() => { navigation.navigate(item.item.route) }}>
              <View
                style={mstyle.ListContainer} >
                <Icon name={item.item.icon} size={22} style={{ paddingTop: 5, paddingLeft: 20, color: item.item.color }} />
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
        }}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App({ navigation }) {
  const [loggedIn, setloggedIn] = React.useState(null)
  const [user, setuser] = React.useState([])
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };

    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    sign_In: async (userdata) => {
      // // console.log('from app ', userdata)
      // setUserToken('fgkj');
      // setIsLoading(false);
      const userToken = String(`token ${userdata.api_key}:${userdata.secret}`);
      const userName = userdata.mobile_no;

      try {
        await AsyncStorage.setItem('user_info', JSON.stringify(userdata));

        // await AsyncStorage.setItem('user_info', userToken);
      } catch (e) {
        // // console.log(e);
      }
      // // console.log('user token: ', userToken);
      dispatch({ type: 'LOGIN', id: userName, token: userToken });
    },
    signOut: async () => {
      // setUserToken(null);
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem('user_info');
      } catch (e) {
        // // console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },

  }), []);

  React.useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('user_info');
      } catch (e) {
        // // console.log(e);
      }
      // // console.log('user token: ', userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <AuthContext.Provider value={{ authContext }}>
        {loginState.userToken !== null ? (

          <Stack.Navigator   >
            <>
              <Stack.Screen name="SessionScreen" component={StartSession} options={() => ({ headerShown: false })} />
              <Stack.Screen name="VideoScreen" component={VideoScreen} options={() => ({ headerShown: false })} />
              <Stack.Screen name="QuizScreen" component={QuizScreen} options={() => ({ headerShown: false })} />
              <Stack.Screen name="Home" component={MyDGODrawer} options={() => ({ headerShown: false })} />
              <Stack.Screen name="Login" component={LoginScreen} options={() => ({ headerShown: false })} />

              {/* My dealer screen */}
              <Stack.Screen name='MydealerHome' component={MyDealersScreen}
                options={({ navigation }) => ({
                  headerStyle: {
                    height: 80,
                    elevation: 5,
                    shadowOpacity: 100,
                    backgroundColor: 'white',
                  },
                  headerTitleAlign: 'left',
                  headerLeft: () => (

                    <View style={{ flexDirection: 'row' }}>
                      {/* <TouchableOpacity onPress={() => {navigation.openDrawer() }}>
                    <Icon name='menu-outline' size={30} style={{color:'black', paddingLeft:10, paddingTop:8}} />
                  </TouchableOpacity> */}
                   
                      <Image
                        source={require('./src/assets/images/logo.png')}
                        style={{ width: 105, height: 45, }}
                        resizeMode="contain"
                      />
                    </View>
                  ),
                  headerRight: () => (
                    <View style={{ flexDirection: 'row' }}>
                      {/* <TouchableOpacity>
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
                    </TouchableOpacity> */}
                    </View>


                  ),
                  headerTitle: () => null
                  // (
                  //   // <Text style={{fontWeight:'600', fontSize:17 ,color:'blue'}}>YTMonetize</Text>
                  //   <Image
                  //     source={require('./src/assets/images/logo.png')}
                  //     style={{width: 105,height:45,}}
                  //     resizeMode="contain"
                  //   />
                  // ),
                })}
              />
              <Stack.Screen name='DealerProfile' component={DealerProfileScreen} options={() => ({ headerTitle: "My profile" })} />
              <Stack.Screen name='FarmerMeetingScreen' component={FarmerMeetingScreen} options={() => ({ headerTitle: "New Farmer Meeting" })} />
              <Stack.Screen name='FarmerMeetingList' component={FarmerMeetingListScreen} options={() => ({ headerTitle: "Farmer Meeting List" })} />
              <Stack.Screen name='FarmerMeetingAttendanceScreen' component={FarmerMeetingAttendanceScreen} options={() => ({ headerTitle: "Farmer Attendance List" })} />
              {/* My farmer screen */}
              <Stack.Screen name='CropProject' component={CropProjectScreen} options={() => ({ headerTitle: "Crop project" })} />
              <Stack.Screen name='Myfarmer' component={MyFarmerScreen} options={() => ({ headerTitle: "My Farmer" })} />
              <Stack.Screen name='AddFarmer' component={AddFarmerScreen} options={() => ({ headerTitle: "New Farmer" })} />
              <Stack.Screen name='Myfarmerlist' component={MyFarmerListScreen} options={() => ({ headerTitle: "Farmer List" })} />
              <Stack.Screen name='FarmerDetails' component={FarmerDetails} options={() => ({ headerTitle: "Farmer Details" })} />
              <Stack.Screen name='FarmerOrdersScreen' component={FarmerOrdersScreen} options={() => ({ headerTitle: "Advance Booking Orders", })} />
              <Stack.Screen name='OrderDetails' component={OrderDetailsScreen} options={() => ({ headerTitle: "Farmer Orders Details", })} />
              <Stack.Screen name='FarmerProductKit' component={FramerProductKitScreen} options={() => ({ headerTitle: "Farmer Product Kit" })} />
              <Stack.Screen name='DoortoDoor' component={DoorToDoorScreen} options={() => ({ headerTitle: "Door To Door Visit" })} />
              <Stack.Screen name='StickerPastingScreen' component={StickerPastingScreen} options={() => ({ headerTitle: "Sticker Pasting" })} />
              <Stack.Screen name='EventsScreen' component={EventsScreen} options={() => ({ headerTitle: "Events" })} />
              <Stack.Screen name='CreateEventScreen' component={CreateEventScreen} options={() => ({ headerTitle: "New Event" })} />
              <Stack.Screen name='UploadPhotosScreen' component={UploadPhotosScreen} options={() => ({ headerTitle: "Upload Photos" })} />
              <Stack.Screen name='PravaktaScreen' component={PravaktaScreen} options={() => ({ headerTitle: "Pravakta" })} />
              <Stack.Screen name='RaiseCropAlertScreen' component={RaiseCropAlertScreen} options={() => ({ headerTitle: "Crop Alert" })} />
              <Stack.Screen name='WhatsappFarmerScreen' component={WhatsappFarmerScreen} options={() => ({ headerTitle: "Whatsapp" })} />
              <Stack.Screen name='CallFarmerScreen' component={CallFarmerScreen} options={() => ({ headerTitle: "Call" })} />


              {/* My Crop Seminar screen */}
              <Stack.Screen name='CropSeminar' component={CropSeminarScreen} options={() => ({ headerTitle: "Crop Seminar" })} />
              <Stack.Screen name='SeminarEventDetailsScreen' component={SeminarEventDetailsScreen} options={() => ({ headerTitle: "Seminar Event Details" })} />
              <Stack.Screen name='CreateSeminar' component={CreateSeminarScreen} options={() => ({ headerTitle: "New Seminar" })} />
              <Stack.Screen name='FreeSampleBeneficiaries' component={FreeSampleBeneficiariesScreen} options={() => ({ headerTitle: "Free Sample Beneficiaries" })} />
              <Stack.Screen name='AttendanceScreen' component={AttendanceScreen} options={() => ({ headerTitle: "Attendance" })} />
              <Stack.Screen name='PreActivityScreen' component={PreActivityScreen} options={() => ({ headerTitle: "Pre Activity" })} />
              <Stack.Screen name='PostActivityScreen' component={PostActivityScreen} options={() => ({ headerTitle: "Post Activity" })} />

              {/* <Stack.Screen name='RaiseCropAlertScreen' component={RaiseCropAlertScreen} /> */}

              <Stack.Screen name='ViewImageScreen' component={ViewImageScreen} options={() => ({ headerTitle: "View Image" })} />


              {/* My Dealer screen */}
              <Stack.Screen name='DealerPaymentScreen' component={DealerPaymentScreen} options={() => ({ headerTitle: "Payments" })} />

              {/* My day Screen */}
              <Stack.Screen name="Myday" component={MydayScreen} options={() => ({ headerTitle: "My Self" })} />
              <Stack.Screen name="Activity" component={ActivityScreen} options={() => ({ headerTitle: "Activity" })} />
              <Stack.Screen name="ActivityDetails" component={ActivityDetailsScreen} options={() => ({ headerTitle: "Add Activity" })} />
              <Stack.Screen name="ActivityDealerDetails" component={ActivityDealerDetailsScreen} options={() => ({ headerTitle: "Add Activity" })} />
              <Stack.Screen name="Expense" component={ExpenseScreen} options={() => ({ headerTitle: "Expenses" })} />
              <Stack.Screen name="ExpenseDetails" component={ExpenseDetailsScreen} options={() => ({ headerTitle: "Add Expenses" })} />
              <Stack.Screen name="Customer" component={CustomerScreen} options={() => ({ headerTitle: "Customer" })} />
              <Stack.Screen name="Dealertree" component={DeaalerTreeViewScreen} options={() => ({ headerTitle: "My Team Tree" })} />
              <Stack.Screen name="CustomerDetails" component={CustomerDetailsScreen} options={() => ({ headerTitle: "Customer Details" })} />
              <Stack.Screen name="AddPayment" component={AddPaymentScreen} options={() => ({ headerTitle: "Add Payment Details" })} />
              <Stack.Screen name="ProductScreen" component={ProductScreen} options={() => ({ headerTitle: "Products" })} />
              <Stack.Screen name="Dayplan" component={DayplanScreen} options={() => ({ headerTitle: "Day Plan" })} />
              <Stack.Screen name="DayplanDetailsScreen" component={DayplanDetailsScreen} options={() => ({ headerTitle: "Add Day Plan" })} />
              <Stack.Screen name="ReturnOrder" component={ReturnOrderScreen} options={() => ({ headerTitle: "Return Sales order" })} />

            </>
          </Stack.Navigator>

        ) : (
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={() => ({ headerShown: false })} />
            <Stack.Screen name="Home" component={MyDGODrawer} options={() => ({ headerShown: false })} />
          </Stack.Navigator>

        )

        }

      </AuthContext.Provider>

    </NavigationContainer>
  );
}

export default App;