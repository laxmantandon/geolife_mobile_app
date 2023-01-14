// In App.js in a new project

import * as React from 'react';
import { View, Text, Button } from 'react-native';
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

function HomeScreen({ navigation }) {
  return (
     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Go to Myday"
        onPress={() => navigation.navigate('Myday')}
      />

      <Button
        title="Go to My Farmer"
        onPress={() => navigation.navigate('Myfarmer')}
      />

      <Button
        title="Go to Crop Seminar"
        onPress={() => navigation.navigate('CropSeminar')}
      />
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

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" >
      <Stack.Screen name="Home" component={HomeScreen} options={() => ({
        headerShown: true,
            headerLeft: () => (
              <View style={{flexDirection:'row'}}>
                <Pressable
                onPress={() =>{}}>
                {/* <Icon name="arrow-back" color="#212121" size={25} /> */}
              </Pressable>
              </View>
            ),
            headerTitle: "Dashboard"
          })}/>
        <Stack.Screen name="Login" component={LoginScreen} options={() => ({ headerShown: false })}/>
        <Stack.Screen name="Details" component={DetailsScreen} />

{/* My farmer screen */}
        <Stack.Screen name='Myfarmer' component={MyFarmerScreen} />
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