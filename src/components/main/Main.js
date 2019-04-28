import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet, Text, View, FlatList,Image, Dimensions} from 'react-native';
import NavigationItems from '../../util/NavigationItems'
import HomeMenuView from './HomeMenuView';
import api from '../../api'
import HomeGridItem from './HomeGridItem'
import GroupPurchCell from './GroupPurchCell'

export default class Main extends Component {
  static navigationOptions = ()=>({
    headerStyle:{
      backgroundColor:'#06C1AE'
    },
    headerTitle:(                                   //头部搜索栏
      <TouchableOpacity style={styles.searchBar}>
        <Image style={styles.search_icon} source={require('../../img/home/search_icon.png')}/>
        <Text>搜索</Text>
      </TouchableOpacity>
    ),
    headerLeft:(            
      <NavigationItems                  //左侧文字居中
      onPress={()=>{
        alert('press header')
      }}
      title='福州'
      />
    ),
    headerRight:(
      <NavigationItems                   // 右侧图片居中
       icon = {require('../../img/mine/icon_navigation_item_message_white.png')}
      />
    )
  })
  constructor(props){
    super(props)
    this.state = {
      dataList:[],
      refreshing:false,
    }
  }
  requestData = async()=>{
    try {
      let response = await fetch(api.discount)
      let json = await response.json();
      this.setState({
        discounts:json
      })
    } catch(err) {
      alert('ERROR' + err)
    }
  }
  requestRecommed = async()=>{
    try{
      this.setState({refreshing:true})
      let response = await fetch(api.recommend)
      let json = await response.json()
      let dataList = json.data.map((info)=>
        {
          return {
            id: info.id,
            imageUrl: info.squareimgurl,
            title: info.mname,
            subtitle: `[${info.range}]${info.title}`,
            price: info.price
          }
        }
      )
      this.setState({
        dataList:dataList,
        refreshing:false
      })

    } catch (err){
      this.setState({refreshing:false})
      alert('error' + err)
    }
  }
  //  FlatList 头部数据信息，全局列表刷新
  renderHeader = ()=>{               
    return(
      <View>
        <HomeMenuView                       //主页头部菜单列表
        menuInfo={api.menuInfo}
        onMenuSelected={                    //跳转到子页面
          (index)=>{
            this.props.navigation.navigate('test',{index:index})
          }
        }
        />
        {/* 间隔 */}
        <View style={{height:14,backgroundColor:'#f3f3f3'}}></View>
        {/* 网格 */}
        <View style={styles.gridContainer}>
        {
          api.discount.data.map((info,index)=>(
            <HomeGridItem 
            key={index}
            info={info}
            />
          ))
        }
        </View>
        {/* 间隔 */}
        <View style={{height:14,backgroundColor:'#f3f3f3'}}></View>
        {/* 猜你喜欢 */}
        <View style={styles.recommedHeader}>
          <Text style={{fontSize:14,color:'#222222'}}>猜你喜欢</Text>
        </View>
      </View>
    )
  }

  onCellSelected = (info)=>{
    this.props.navigation.navigate('test', { index:'FlatList详情' })
  }
  // FlatList数据源
  renderItem = (info) =>{
    return (
      <GroupPurchCell 
      info={info.item}
      onPress={this.onCellSelected}
      />          //rowData.item 表示里面的数据
    )
  }
  componentDidMount(){
    this.requestRecommed()
    // this.requestData();
    // console.log(api.discount)
    // let json = api.discount.json();

  }
  render() {
    return (
      // 菜单
      <View style={styles.container}>
      {/* 使用flatlist只会部分列表刷新，想要全部刷新将头部信息放到ListHeaderComponent中，并用return返回即可 */}
          <FlatList 
          ListHeaderComponent={()=>this.renderHeader()}
          data={this.state.dataList}             //数据源   必须设置一个唯一标识符key，通过服务端返回
          renderItem={this.renderItem}                //字数据方法
          keyExtractor={(item,index)=>item.title}             //表示唯一标识
          onRefresh={this.requestRecommed}            //上拉刷新功能
          refreshing={this.state.refreshing}          //绑定刷新
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  searchBar:{
    flexDirection: 'row',
    width:Dimensions.get('window').width*0.7,
    height:30,
    borderRadius: 19,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor:'white',
  },
  search_icon:{
    height: 20,
    width:20,
    margin:5,
  },
  gridContainer :{
    flexDirection:'row',
    flexWrap: 'wrap',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderColor: '#e0e0e0',
  },
  recommedHeader:{
    height:35,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor:'#e0e0e0',
    backgroundColor:'white',
    paddingLeft: 20,
    paddingVertical: 10,  // 纵向内边距
  },

});
