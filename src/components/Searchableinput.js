import { View, Text, TextInput } from 'react-native'
import React from 'react'
import mstyle from '../mstyle'
import { Colors } from '../contants'

const Searchableinput = ({data}) => {
    // console.log(data)

    const searchFilterFunction = (text) => {
        // console.log(text)
        const res = data.filter(obj => Object.values(obj).some(val => val.includes(text)));
        // console.log(res)
        // setdata(res)
        data=res
    }

    return (
        <View>
            <View style={mstyle.inputContainer}>
            <View style={mstyle.inputSubContainer}>

            <TextInput
            placeholder={'Type something'}
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            style={mstyle.inputText}
               
                onChangeText={text => {
                    searchFilterFunction(text)
                    // // console.log(item)
                }}
                // value={item?.value}
            />
            </View>
            </View>
        </View>
    )
}

export default Searchableinput