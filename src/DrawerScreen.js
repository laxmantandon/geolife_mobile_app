import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Linking ,Image, Alert} from 'react-native';
import {Drawer,Text,} from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';


export function DrawerContent(props) {

    return (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <DrawerItem
            label="Help"
            onPress={() => Linking.openURL('https://mywebsite.com/help')}
          />
        </DrawerContentScrollView>
      );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        // backgroundColor:'gray',
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 0,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 12,
        lineHeight: 12,
        backgroundColor:'gold',
        color:'black',
        padding:3,
        paddingHorizontal:8,
        borderRadius:3,
        textAlign:'center',
        fontWeight: 'bold',
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 0,
    },
    bottomDrawerSection: {
        marginBottom: 1,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      modalText:{
        fontSize:14,
        // fontWeight:'bold',
        textAlign:'center',
        marginBottom:20
      },
});