import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Image, Dimensions} from 'react-native';
import { Heading3,Paragraph } from '../../util/Text' 
import color from '../../util/color' 


class OrderMenuItem extends Component {
    state = {  }
    render() { 
        let { title,icon, onPress } = this.props
        return ( 
            <TouchableOpacity style={styles.container} onPress={onPress}>
                <Image 
                resizeMode='contain'      //  撑满
                source={icon} 
                style={styles.icon}/>
                <Heading3>
                    {title}
                </Heading3>
            </TouchableOpacity>
         );
    }
}

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',         //居中
      alignItems: 'center',
      width: Dimensions.get('window').width / 4,
      height: Dimensions.get('window').width / 5,
    },
    icon: {
      width: 30,
      height: 30,
      margin: 5,
    }
  })
 
export default OrderMenuItem;