import { Text, View } from 'react-native'
import React, { Component } from 'react'

export class EmptyScreen extends Component {
  render() {
    return (
        <View>
        <Text>No Data to show here</Text>
        </View>
    )
  }
}

export default EmptyScreen