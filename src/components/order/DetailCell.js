
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, PixelRatio} from 'react-native';
import { Heading3,Paragraph } from '../../util/Text' 
import color from '../../util/color' 


class DetailCell extends Component {
    render() { 
        let { title,subtitle,style } = this.props
        let icon = this.props.image && <Image style={styles.icon} source={this.props.image} />
        return ( 
          <View style={styles.container}>          
            <TouchableOpacity>
                <View style={[styles.content,style]}>
                  <Heading3>{title}</Heading3>
                  <View style={{flex:1,backgroundColor:'blue'}}       //表示占据标题副标题外所有空间
                  />       
                  <Paragraph style={{color:'#999999'}}>{subtitle}</Paragraph>
                  <Image style={styles.arrow} source={require('../../img/public/cell_arrow.png')}/>
                </View>
                <View  style={styles.line}/>
            </TouchableOpacity>
          </View>
         );
    }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
    },
    content: {
      height: 44,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 15,
      paddingRight: 10,
    },
    icon: {
      width: 25,
      height: 25,
      marginRight: 10,
    },
    subtitleContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    arrow: {
      width: 14,
      height: 14,
      marginLeft: 5,
    },
    line: {
        width: Dimensions.get('window').width,
        height: 1 / PixelRatio.get(),
        backgroundColor: color.border,
      },
  })
 
export default DetailCell;