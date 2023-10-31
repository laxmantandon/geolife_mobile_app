import { BackHandler } from 'react-native';
import { PermissionsAndroid } from 'react-native'

const LocationPermission = () => {
    try{
        const grantedlocation =  PermissionsAndroid.request( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
         
         {
           title: "App Location Permission",
           message:"App needs access to your Location ",
           buttonNeutral: "Ask Me Later",
           buttonNegative: "Cancel",
           buttonPositive: "OK"
         }
         );
         if (grantedlocation === PermissionsAndroid.RESULTS.GRANTED) {
           // console.log("Location permission given");
         } else {
           // console.log("Location permission Already have");
         }
       } catch (err) {
        BackHandler.exitApp()
        LocationPermission()
       console.warn(err);
        }    
}

export default LocationPermission