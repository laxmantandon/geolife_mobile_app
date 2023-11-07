import { PermissionsAndroid } from 'react-native'

const StoragePermission = () => {
  try{
      const grantedstorage =  PermissionsAndroid.request( PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
       
       {
         title: "App Storage Permission",
         message:"App needs access to your storage ",
         buttonNeutral: "Ask Me Later",
         buttonNegative: "Cancel",
         buttonPositive: "OK"
       }
       );
       if (grantedstorage === PermissionsAndroid.RESULTS.GRANTED) {
         // console.log("storage permission given");
       } else {
         // console.log("storage permission Already have");
       }
     } catch (err) {
     console.warn(err);
      }    
}
export default StoragePermission