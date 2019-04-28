import React, { Component } from 'react'
import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity, ScrollView, RefreshControl,Dimensions } from 'react-native'
import NavigationItems from '../../util/NavigationItems'
import DetailCell from '../order/DetailCell'
import { Heading2, Paragraph } from '../../util/Text'
import color from '../../util/color'

class MineScene extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <View style={{ flexDirection: 'row' }}>
        <NavigationItems
          icon={require('../../img/mine/icon_navigation_item_set_white.png')}
          onPress={() => {

          }}
        />
        <NavigationItems
          icon={require('../../img/mine/icon_navigation_item_message_white.png')}
          onPress={() => {

          }}
        />
      </View>
    ),
    headerStyle: {
      backgroundColor: color.primary,
      elevation: 0,
      borderBottomWidth: 0,
    },
  })


  constructor(props) {
    super(props)

    this.state = {
      isRefreshing: false,
      heightState:false
    }
  }

  onHeaderRefresh() {
    this.setState({ isRefreshing: true })

    setTimeout(() => {
      this.setState({ isRefreshing: false })
    }, 2000)
  }

  renderCells() {
    let cells = []
    let dataList = this.getDataList()
    for (let i = 0; i < dataList.length; i++) {
      let sublist = dataList[i]
      for (let j = 0; j < sublist.length; j++) {
        let data = sublist[j]
        let cell = <DetailCell image={data.image} title={data.title} subtitle={data.subtitle} key={data.title} />
        cells.push(cell)
      }
      cells.push( <View key={i} style={{height:14,backgroundColor:color.paper}}/>)
    }

    return (
      <View style={{ flex: 1 }}>
        {cells}
      </View>
    )
  }

  renderHeader() {
    return (
      <View style={styles.header}>
        <Image style={styles.avatar} source={require('../../img/mine/avatar.png')} />
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <Heading2 style={{ color: 'white' }}>Solstice</Heading2>
            <Image style={{ marginLeft: 4 }} source={require('../../img/mine/beauty_technician_v15.png')} />
          </View>
          <Paragraph style={{ color: 'white', marginTop: 4 }}>个人信息 ></Paragraph>
        </View>
      </View>
    )
  }
  _scrollBeginDrag = ()=>{
    this.setState({
      heightState: true
    })
  }
  _scrollEndDrag = ()=>{
    this.setState({
      heightState: false
    })
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: color.paper }}>
        <View 
        style={{ 
          position: 'absolute',
          top:0,
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height /2 ,
          backgroundColor: color.primary
           }} />
        <ScrollView
        onScrollBeginDrag = {this._scrollBeginDrag}
        onScrollEndDrag = {this._scrollEndDrag}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={() => this.onHeaderRefresh()}
              tintColor='gray'
            />}
            >
          {this.renderHeader()}
          <View style={{backgroundColor:color.paper,height:14}}/>
          {this.renderCells()}
        </ScrollView>
      </View>
    )
  }

  getDataList() {
    return (
      [
        [
          { title: '我的钱包', subtitle: '办信用卡', image: require('../../img/mine/icon_mine_wallet.png') },
          { title: '余额', subtitle: '￥95872385', image: require('../../img/mine/icon_mine_balance.png') },
          { title: '抵用券', subtitle: '63', image: require('../../img/mine/icon_mine_voucher.png') },
          { title: '会员卡', subtitle: '2', image: require('../../img/mine/icon_mine_membercard.png') }
        ],
        [
          { title: '好友去哪', image: require('../../img/mine/icon_mine_friends.png') },
          { title: '我的评价', image: require('../../img/mine/icon_mine_comment.png') },
          { title: '我的收藏', image: require('../../img/mine/icon_mine_collection.png') },
          { title: '会员中心', subtitle: 'v15', image: require('../../img/mine/icon_mine_membercenter.png') },
          { title: '积分商城', subtitle: '好礼已上线', image: require('../../img/mine/icon_mine_member.png') }
        ],
        [
          { title: '客服中心', image: require('../../img/mine/icon_mine_customerService.png') },
          { title: '关于美团', subtitle: '我要合作', image: require('../../img/mine/icon_mine_aboutmeituan.png') }
        ]
      ]
    )
  }

}


const styles = StyleSheet.create({
  icon: {
    width: 27,
    height: 27,
  },
  header: {
    backgroundColor: color.primary,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#51D3C6'
  }
})


export default MineScene
