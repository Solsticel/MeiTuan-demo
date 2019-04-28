import React,{ Component } from 'react';
import { View, Text, TouchableOpacity,StyleSheet, Image } from 'react-native'

export default class NavigationItems extends Component{
    constructor(props){
        super()
    }
    render() {
        let { title, icon } = this.props
        let titleElement = title && <Text style={styles.title}>{title}</Text>
        let iconElement = icon && <Image style={styles.icon} source={icon}/>
        return (
             <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
                 {titleElement}
                 {iconElement}
             </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
      },
      title:{
        fontSize:15,
        color:'white',
        margin:8
      },
      icon:{
          width:27,
          height:27,
          margin:8,
      },
})