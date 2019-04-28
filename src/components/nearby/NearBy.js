import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Image,Dimensions} from 'react-native';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view'
import NearByListView from './NearByListView'

export default class NearBy extends Component {
  static navigationOptions = ()=>({
    // headerTitle:'附近'
    headerLeft:(
      <TouchableOpacity style={{flexDirection:'row',alignItems:'center',padding:10}}>
        <Image 
        style={{width:13,height:16}}
        source={require('../../img/public/icon_food_merchant_address.png')}
        />
        <Text style={{fontSize:15,color:'#333333'}}>福州 鼓楼</Text>
      </TouchableOpacity>
    ),
    headerRight:(
      <TouchableOpacity style={styles.searchBar}>
        <Image 
        style={styles.searchIcon}
        source={require('../../img/home/search_icon.png')}
        
        />
        <Text style={styles.p}>找附近的吃喝玩乐</Text>
      </TouchableOpacity>
    )
  })
  constructor(props){
    super(props)
    this.state = {
      delayShow: false
    }
  }
  componentDidMount() {
    //增加一个延时
      setTimeout(() => {
        this.setState({
        delayShow: true
        })
      },1)
    }
  render() {
    let titles = ['享美食','住酒店','爱玩乐','全部']
    let types = [
      ['热门', '面包甜点', '小吃快餐', '川菜', '日本料理', '韩国料理', '台湾菜', '东北菜'],
      ['热门', '商务出行', '公寓民宿', '情侣专享', '高星特惠'],
      ['热门', 'KTV', '足疗按摩', '洗浴汗蒸', '电影院', '美发', '美甲'],
      []
    ]
    return (
        <ScrollableTabView 
      style={styles.container}
      tabBarBackgroundColor='white'             //整个颜色
      tabBarActiveTextColor='#FE566D'         //选中当前的颜色
      tabBarInactiveTextColor='#555555'       //非当前的颜色
      tabBarTextStyle={styles.tabBarText}     //导航文本样式
      tabBarUnderlineStyle={styles.tabBarUnderLine}   //选中下划线样式
      >
        {titles.map((title,i)=>(
          <NearByListView 
           tabLabel={title}
           key={i}
           types={types[i]}                              //导航下子选项
           navigation={this.props.navigation}            // 导航列表
          /> 
        ))}
      </ScrollableTabView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  searchBar:{
    flexDirection: 'row',
    width:Dimensions.get('window').width*0.65,
    height:30,
    borderRadius: 19,
    justifyContent:'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor:'#eeeeee',
    marginRight:20,
  },
  p: {
    fontSize: 13,
    color: '#777777',
  },
  searchIcon:{
    width:20,
    height:20,
    margin:5,
  },
  tabBarText:{
    fontSize:14,
    marginTop: 13,
  },
  tabBarUnderLine:{
    backgroundColor:'#fe566d'
  },
});
