import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import DetailCell from './DetailCell'
import api from '../../api'
import GroupPurchaseCell from '../main/GroupPurchCell'
import OrderMenuItem from './OrderMenuItem'

export default class Order extends Component {
  static navigationOptions = ()=>({
    headerTitle:'订单'
  })
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      refreshState: RefreshState.Idle,
    }
  }

  componentDidMount() {
    this.requestData()
  }

  requestData = async () => {
    try {
      this.setState({ refreshState: RefreshState.HeaderRefreshing })

      let response = await fetch(api.recommend)
      let json = await response.json()

      let dataList = json.data.map((info) => {
        return {
          id: info.id,
          imageUrl: info.squareimgurl,
          title: info.mname,
          subtitle: `[${info.range}]${info.title}`,
          price: info.price
        }
      })


      dataList.sort(() => { return 0.5 - Math.random() })

      this.setState({
        data: dataList,
        refreshState: RefreshState.NoMoreData,
      })
    } catch (error) {
      this.setState({
        refreshState: RefreshState.Failure,
      })
    }
  }

  keyExtractor = (item, index) => {
    return item.id.toString()
  }
  _renderHeader = ()=>{
    return (
      <View style={styles.container}>
        <DetailCell title='我的订单' subtitle='全部订单' style={{height:38}}/>
        <View style={{flexDirection:'row'}}>
        <OrderMenuItem title='待付款' icon={require('../../img/order/order_tab_need_pay.png')}/>
        <OrderMenuItem title='待使用' icon={require('../../img/order/order_tab_need_use.png')}/>
        <OrderMenuItem title='待评价' icon={require('../../img/order/order_tab_need_review.png')}/>
        <OrderMenuItem title='退款/售后' icon={require('../../img/order/order_tab_needoffer_aftersale.png')}/>
        </View>
        <View style={{height:20,backgroundColor:'#F3F3F3'}}/>
        <DetailCell title='我的收藏' subtitle='查看全部' style={{height:38}}/>
      </View>
    )
  }
  renderCell = (rowData) => {
    return (
      <GroupPurchaseCell
        info={rowData.item}
        onPress={() => {
          this.props.navigation.navigate('GroupPurchase', { info: rowData.item })
        }}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <RefreshListView
          data={this.state.data}
          ListHeaderComponent={this._renderHeader}
          renderItem={this.renderCell}
          keyExtractor={this.keyExtractor}
          refreshState={this.state.refreshState}
          onHeaderRefresh={this.requestData}
        />
      </View>
    )
  }


}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  itemContainer: {
    flexDirection: 'row',
  },
})

