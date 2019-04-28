import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Image,Dimensions, PixelRatio} from 'react-native';
import { Paragraph } from '../../util/Text'
import color from '../../util/color'

class NearByHeaderItem extends Component {
    componentDidMount(){
        
    }
    render() { 
        return ( 
            <View style={styles.container}>
                {this.props.titles.map((title,i)=>(
                    <TouchableOpacity 
                    key={i}
                    style={[{ backgroundColor: this.props.selectedIndex == i ? '#FE566D' : 'white' }, styles.item]}  //判断当前选中的item
                    onPress={() => {this.props.onSelected(i)}
                    }>
                        <Paragraph style={{ color: this.props.selectedIndex == i ? 'white' : '#555555' }}>
                            {title}
                        </Paragraph>
                    </TouchableOpacity>
                ))}
            </View>
         );
    }
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    item: {
      width: Dimensions.get('window').width / 4 - 10,
      marginLeft: 8,
      marginTop: 5,
      marginBottom: 5,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 15,
      borderWidth: 1 / PixelRatio.get(),
      borderColor: color.border,
    },
  })
 
export default NearByHeaderItem;