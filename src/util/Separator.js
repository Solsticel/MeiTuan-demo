import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import color from './color'


class Separator extends Component {
  render() {
    return (
      <View style={[styles.line, this.props.style]} />
    )
  }
}


const styles = StyleSheet.create({
  line: {
    width: screen.width,
    height: screen.onePixel,
    backgroundColor: color.border,
  },
})


export default Separator
