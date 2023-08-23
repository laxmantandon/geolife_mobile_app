/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import OneSignal from 'react-native-onesignal';


OneSignal.setAppId('2890622f-7504-4d49-a4ed-9e69becefa4a');

OneSignal.promptForPushNotificationsWithUserResponse();


OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
    // console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
    let notification = notificationReceivedEvent.getNotification();
    // console.log("notification: ", notification);
    const data = notification.additionalData
    // console.log("additionalData: ", data);
    // Complete with null means don't show a notification.
    notificationReceivedEvent.complete(notification);
  });
  
  //Method for handling notifications opened
  OneSignal.setNotificationOpenedHandler(notification => {
    // console.log("OneSignal: notification opened:", notification);
  });


AppRegistry.registerComponent(appName, () => App);
