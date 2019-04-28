import React,{ Component } from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'


class HomeMenuItem extends Component {
    state = {  }
    render() { 
        let { title, icon, onPress} = this.props
        return (  
            <TouchableOpacity style={styles.container} onPress={onPress}> 
                <Image source={icon} style={styles.icon}/>
                <Text>{title}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        // flex: 1,
        justifyContent:'center',
        alignItems: 'center',
        width:Dimensions.get('window').width / 5,
        height:Dimensions.get('window').width / 5,
    },
    icon:{
        height:Dimensions.get('window').width / 9,
        width:Dimensions.get('window').width / 9,
        margin:5,
    }
})
 
export default HomeMenuItem;