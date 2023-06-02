import { View, Text } from 'react-native'
import React from 'react'
import DatePicker from 'react-native-date-picker'
import Icon from 'react-native-vector-icons/Ionicons'
import { Colors } from '../contants'
import { useState } from 'react'
import moment from 'moment'
import mstyle from '../mstyle'



const DateInput = ({item}) => {
    const [open, setOpen] = useState(false)

    return (
        <View style={[mstyle.inputContainer,{flexDirection:'row'}]}>
            <View style={{ flexDirection: 'row' }}>
                {/* <Button title="Open" onPress={() => setOpen(true)} style={mstyle.PrimaryButton} /> */}
                <DatePicker
                    mode={item?.type == 'date' ? 'date' : 'time'}
                    modal
                    open={open}
                    date={item?.value}
                    onConfirm={text => {
                        item.value = text
                        // console.log(item)
                        setOpen(false)
                    }}
                    onCancel={() => {
                        setOpen(false)
                    }}
                />
                <Icon
                    onPress={() => setOpen(true)}
                    name={item?.type == 'date' ? "calendar-outline" : "alarm-outline"}
                    size={22}
                    color={Colors.DEFAULT_GREEN}
                    style={{ paddingVertical: 8, paddingRight: 8 }}
                />
            </View>
            <Text onPress={() => setOpen(true)}
                style={mstyle.inputText}>{moment(item.value).format('Do MMM-YYYY')}</Text>
        </View>
    )
}

export default DateInput