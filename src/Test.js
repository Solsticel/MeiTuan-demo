import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';


class Test extends Component {
    state = {  }
    render() { 
        return ( 
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <View>
                    <Text>test{this.props.navigation.state.params.index||''}页面</Text>
                </View>
            </View>
         );
    }
}
 
export default Test;