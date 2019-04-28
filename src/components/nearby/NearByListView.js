import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Image,Dimensions} from 'react-native';
import { Paragraph } from '../../util/Text'
import NearByHeaderItem from './NearByHeaderItem'
import api from '../../api'
import GroupPurchCell from '../main/GroupPurchCell'
import RefreshListView,{ RefreshState } from 'react-native-refresh-list-view'

class NearByListView extends Component {
    constructor(props){
        super(props)
        this.state = {
            typeIndex:0,
            page:1,
            data:[],
            refreshState:RefreshState.Idle,     //闲置状态
            nextPage:false,
            
        }
    }
    componentDidMount(){
        this.initFirstPage()
    }

    requestData = async () => {
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
        if(!this.state.nextPage){
          dataList.sort(() => { return 0.5 - Math.random() })       //打乱数据
        } else {
          this.setState({
            nextPage:false
          })
        }
    
        return dataList
      }

    initFirstPage = async()=>{        //上滑初始化列表
        try {
            this.setState({ refreshState: RefreshState.HeaderRefreshing })
            let dataList = await this.requestData()
            dataList = dataList.slice(0,10)
            dataList.sort(() => { return 0.5 - Math.random() })
            this.setState({
              data: dataList.slice(0,10),
              refreshState: RefreshState.Idle,
              page:1,               // 初始化将翻页页数设为1
            })
          } catch (error) {
            this.setState({
              refreshState: RefreshState.Failure,
            })
          }
    }
    requestNextPage = async()=>{          //下滑刷新列表
        try {
            this.setState({ refreshState: RefreshState.FooterRefreshing })
            let dataList = await this.requestData()
            dataList = dataList.slice(this.state.page*10,this.state.page*10+10);       //翻页取10条数据
            this.setState({
              data: [...this.state.data,...dataList],                //往后面添加数据
              refreshState: this.state.data.length > 20 ? RefreshState.NoMoreData : RefreshState.Idle,
              page:this.state.page+1,                                 //页数加1
            })
          } catch (error) {
            this.setState({
              refreshState: RefreshState.Failure,
            })
          }
    }
    _renderHeaderView = ()=>{
        return (
            <NearByHeaderItem                         // 附近头部菜单选项
                titles={this.props.types}
                selectedIndex={this.state.typeIndex}
                onSelected={(index) => {
                if (index != this.state.typeIndex) {           //如果选中的不是当前的type，更新数据
                    this.setState({ typeIndex: index })
                    this.initFirstPage()
                }
                }}
            />
        )
    }
    renderItem = (info)=>{          //  子数据事件
        return (
            <GroupPurchCell 
            info={info.item}
            onPress={() => {
                this.props.navigation.navigate('test',{index:'附近详情'})
              }}
            />          //rowData.item 表示里面的数据
        )
    }
    keyExtractor = (item, index) => {
      return item.id.toString() + Math.random()
    }
    render() { 
        return ( 
            <RefreshListView 
            ListHeaderComponent={this._renderHeaderView}        //头部列表组件
            data={this.state.data}                              //源数据
            renderItem={this.renderItem}                        //子数据事件
            keyExtractor={this.keyExtractor}                 //唯一标识
            onHeaderRefresh={this.initFirstPage}                //上滑刷新
            refreshState={this.state.refreshState}              //' loading 状态
            onFooterRefresh={this.requestNextPage}              //下滑刷新事件
            />
         );
    }
}
 
export default NearByListView;