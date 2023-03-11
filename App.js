// In App.js in a new project

import * as React from 'react';
import { useEffect } from 'react';
import { View, Image, Text, Button, TextInput, FlatList, StatusBar, ScrollView, TouchableOpacity, ToastAndroid, BackHandler, Alert, ActivityIndicator } from 'react-native';
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

// SplashScreen.hide();
CameraPermission()


function HomeScreen({ navigation }) {
  SplashScreen.hide();
  console.log(AuthenicationService.gettoken())

  const [data, setdata] = React.useState([
    { title: 'My Tasks', route: 'Myday', icon: 'ios-list-outline', color: 'red' },
    { title: 'My day', route: 'Myday', icon: 'ios-sunny-outline', color: 'gold' },
    { title: 'My farmer', route: 'Myfarmer', icon: 'ios-person-outline', color: 'black' },
    { title: 'Crop Seminar', route: 'CropSeminar', icon: 'ios-list', color: 'green' },
    { title: 'My dealers', route: 'Mydealers', icon: 'ios-list', color: 'blue' }
  ])
  const [loggedIn, setloggedIn] = React.useState(false)
  const [user, setuser] = React.useState([])
  if (loggedIn == false) {
    AsyncStorage.getItem("user_info").then((value) => {
      console.log(value)
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

  useEffect(() => {
    navigation.getState().routes[0].name
    const backAction = () => {
      backButtonPressd()
      return true;

    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    getTask()

    return () => backHandler.remove();

  }, [])

  const [loading, setloading] = React.useState(true)
  getTask = async () => {
    setloading(true)
    AuthenicationService.get_users_task(null).then(r => {
      console.log('RRRRR', r)
      setloading(false)

      let my_tasks = []
      if (r.status == true) {
        r.data.forEach(d => {
          my_tasks.push({ 'subtitle': d.priority, 'title': d.description })
        })
        settask(my_tasks)
      } else {

      }
    }).catch(e => {
      console.log(e);
    })

  }

  return (
    <View style={mstyle.container1}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.SECONDARY_WHITE}
        translucent
      />

      <View>
        <FlatList
          data={data}
          numColumns={2}
          ListHeaderComponent={() => {
            return (
              <View
                style={[mstyle.ListContainer, { width: '100%' }]} >

                {/* <Image style={{ margin: "auto", backgroundColor: 'silver', height: 60, width: 60, borderRadius: 50 }} 
                  source={{ uri: '' }} /> */}

                <View style={[mstyle.detailContainer, { width: '90%' }]}>
                  <View style={mstyle.titleContainer}>
                    <Text style={mstyle.listListTitle} numberOfLines={1}>
                      {user.first_name} {user.last_name}
                    </Text>
                    <Text style={{
                      color: 'gray', fontSize: 12, fontWeight: '600', fontFamily: Fonts.POPPINS_MEDIUM,
                    }} numberOfLines={2}>{user.mobile_no}</Text>
                    <Text style={{
                      color: 'green', fontSize: 25, fontWeight: '600', fontFamily: Fonts.POPPINS_MEDIUM,
                    }} numberOfLines={2}>Working time ......</Text>
                  </View>
                  <View style={{ width: '15%' }}>
                    <Pressable title='Check Out' onPress={() => {
                      AsyncStorage.clear()
                      navigation.navigate('Login')
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
                <Text style={mstyle.title}>Current Task</Text>
                <FlatList
                  refreshing={loading}
                  onRefresh={() => { getTask() }}
                  data={task}
                  renderItem={(item) => {
                    return (
                      <Pressable style={{ flex: 1, flexDirection: 'row' }}
                      //  onPress={() => { navigation.navigate(item.route) }}
                      >
                        <Icon name='chevron-forward-outline' size={22} style={{ paddingTop: 18, paddingLeft: 10 }} />
                        <Card item={item} />
                      </Pressable>

                    )
                  }}
                  ListEmptyComponent={(item) => {
                    return (
                      <View style={{ flex: 1 , alignSelf:'center', paddingTop:50}}
                      //  onPress={() => { navigation.navigate(item.route) }}
                      >
                        <Text style={{color:'gray', fontSize:14,textAlign:'center'}}>No Data In List Please Refresh</Text>
                        <Pressable onPress={() => { getTask() }} >
                          <View style={{ flexDirection: 'row', alignSelf:'center'}}>

                            <Text style={{
                              color: Colors.DEFAULT_GREEN, backgroundColor: Colors.LIGHT_GREEN,
                              paddingHorizontal: 20, paddingVertical: 6, fontSize:16,
                              borderRadius:7, fontWeight:'500'
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

            )
          }}

        />
      </View>




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
      console.log('from app ', userdata)
      // setUserToken('fgkj');
      // setIsLoading(false);
      const userToken = String(`token ${userdata.api_key}:${userdata.secret}`);
      const userName = userdata.mobile_no;

      try {
        await AsyncStorage.setItem('user_info', JSON.stringify(userdata));

        // await AsyncStorage.setItem('user_info', userToken);
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'LOGIN', id: userName, token: userToken });
    },
    signOut: async () => {
      // setUserToken(null);
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem('user_info');
      } catch (e) {
        console.log(e);
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
        console.log(e);
      }
      console.log('user token: ', userToken);
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
                options={(navigation) => ({
                  headerStyle: {
                    height: 45,
                    elevation: 5,
                    shadowOpacity: 100,
                  },
                  headerTitleAlign: 'left',
                  headerLeft: () => (
                    <Image
                      source={require('./src/assets/images/logo.png')}
                      style={{ width: 105, height: 45, }}
                      resizeMode="contain"
                    />
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
                })}
              />
              <Stack.Screen name="Login" component={LoginScreen} options={() => ({ headerShown: false })} />

              {/* My farmer screen */}
              <Stack.Screen name='Myfarmer' component={MyFarmerScreen} options={() => ({ headerTitle: "My Farmer" })} />
              <Stack.Screen name='AddFarmer' component={AddFarmerScreen} options={() => ({ headerTitle: "New Farmer" })} />
              <Stack.Screen name='Myfarmerlist' component={MyFarmerListScreen} options={() => ({ headerTitle: "Farmer List" })} />
              <Stack.Screen name='FarmerDetails' component={FarmerDetails} options={() => ({ headerTitle: "Farmer Details" })} />
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



              {/* My My Dealers screen */}
              <Stack.Screen name='Mydealers' component={MyDealersScreen} options={() => ({ headerTitle: "My Dealers" })} />

              {/* My day Screen */}
              <Stack.Screen name="Myday" component={MydayScreen} options={() => ({ headerTitle: "My Day" })} />
              <Stack.Screen name="Activity" component={ActivityScreen} options={() => ({ headerTitle: "Activity" })} />
              <Stack.Screen name="ActivityDetails" component={ActivityDetailsScreen} options={() => ({ headerTitle: "Activity Details" })} />
              <Stack.Screen name="Expense" component={ExpenseScreen} options={() => ({ headerTitle: "Expenses" })} />
              <Stack.Screen name="ExpenseDetails" component={ExpenseDetailsScreen} options={() => ({ headerTitle: "Expenses Details" })} />
              <Stack.Screen name="Customer" component={CustomerScreen} options={() => ({ headerTitle: "Customer" })} />
              <Stack.Screen name="CustomerDetails" component={CustomerDetailsScreen} options={() => ({ headerTitle: "Customer Details" })} />
              <Stack.Screen name="Dayplan" component={DayplanScreen} options={() => ({ headerTitle: "Day Plan" })} />
              <Stack.Screen name="DayplanDetailsScreen" component={DayplanDetailsScreen} options={() => ({ headerTitle: "Add Day Plan" })} />

            </>
          </Stack.Navigator>

        ) : (
          <Stack.Navigator>

            <Stack.Screen name="Login" component={LoginScreen} options={() => ({ headerShown: false })} />
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
              options={(navigation) => ({
                headerStyle: {
                  height: 45,
                  elevation: 5,
                  shadowOpacity: 100,
                },
                headerTitleAlign: 'left',
                headerLeft: () => (
                  <Image
                    source={require('./src/assets/images/logo.png')}
                    style={{ width: 105, height: 45, }}
                    resizeMode="contain"
                  />
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
              })}
            />

          </Stack.Navigator>

        )

        }

      </AuthContext.Provider>

    </NavigationContainer>
  );
}

export default App;