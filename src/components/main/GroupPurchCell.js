import React,{ Component } from 'react';
import { View, Text, TouchableOpacity,StyleSheet, Image, Dimensions } from 'react-native'




class GroupPurchCellGroupPurchCell extends Component {
    state = {  }
    render() { 
        let info = this.props.info
        let { title, price, subtitle } = info
        let imgurl = info.imageUrl.replace('w.h','160.0')
        return ( 
            <TouchableOpacity style={groupStyle.container} onPress={() => this.props.onPress(info)}>
                <Image style={groupStyle.icon} source={{uri:imgurl}}/>

                <View style={groupStyle.rightContainer}>
                    <Text style={groupStyle.h2}>{title}</Text>
                    <Text style={[groupStyle.p,{marginTop:8}]}>{subtitle}</Text>
                    <View style={{flex:1,justifyContent:'flex-end'}}>
                    <Text style={[groupStyle.h2,groupStyle.price]}>{price}元</Text>
                    </View>
                </View>
            </TouchableOpacity>
         );
    }
}

const groupStyle = StyleSheet.create({
    container:{
        flexDirection: 'row',
        padding: 8,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#e0e0e0',
        backgroundColor:'white',
    },
    icon:{
        width:80,
        height:80,
        borderRadius: 5,
    },
    rightContainer:{
        flex:1,
        paddingLeft: 20,
        paddingRight: 10,
    },
    price:{
        color:'#06C1AE'
    },
    h2: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#222222',
    },
    p: {
        fontSize: 13,
        color: '#777777',
    },
})
 
export default GroupPurchCellGroupPurchCell;