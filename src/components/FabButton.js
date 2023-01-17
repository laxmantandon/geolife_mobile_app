import { View, Text } from 'react-native'
import React from 'react'

const FabButton = () => {
  return (
    <View style={{width: 60,  
        height: 60,   
        borderRadius: 30,            
        backgroundColor: 'blue',                                    
        position: 'absolute',                                          
        bottom: 10,                                                    
        right: 10,
        elevation: 5}}>
        <Text style={{color:'white', position: 'absolute',                                          
        bottom: 20,                                                    
        right: 15,}}>Add</Text>
    </View>
  )
}

export default FabButton