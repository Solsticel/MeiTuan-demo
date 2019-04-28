import React,{ Component } from 'react';
import { View, Text, TouchableOpacity,StyleSheet, Image, Dimensions } from 'react-native'



class HomeGridItem extends Component {
    state = {  }
    render() { 
        let { info } = this.props;  // 拿到网格传过来的数据
        let title = info.maintitle;
        let color = info.typeface_color;
        let subtitle = info.deputytitle
        let imgUrl = info.imageurl.replace('w.h','120.0')
        return ( 
            <TouchableOpacity style={styles.container}>
                <View>
                    <Text style={{fontSize:15,color:'red',marginBottom:10}}>{title}</Text>
                    <Text style={{fontSize: 14, color:'#333333'}}>{subtitle}</Text>
                </View>
                <Image style={styles.icon} source={{uri:imgUrl}}/> 
            </TouchableOpacity>
         );
    }
}
 

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: Dimensions.get('window').width / 2 - StyleSheet.hairlineWidth,
        height:Dimensions.get('window').width / 4,
        backgroundColor:'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderRightWidth: StyleSheet.hairlineWidth,
        borderColor: '#e0e0e0',
    },
    icon:{
        width: Dimensions.get('window').width / 5,
        height: Dimensions.get('window').width / 5,
        // backgroundColor: 'blue',
        marginLeft: 10,
    },
})

export default HomeGridItem;