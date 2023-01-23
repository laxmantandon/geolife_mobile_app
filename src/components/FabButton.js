import { View, Text } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../contants';

const FabButton = () => {
  return (
    <View style={{width: 60,  
        height: 60,   
        borderRadius: 30,            
        backgroundColor: Colors.LIGHT_GREEN,                                    
        position: 'absolute',                                          
        bottom: 10,                                                    
        right: 10,
        elevation: 5}}>

        
        <Icon name='add-circle-outline' size={45} style={{color:Colors.DEFAULT_GREEN, position: 'absolute',                                          
        bottom: 5,                                                    
        right: 5,}}/>
       
    </View>
  )
}

export default FabButton