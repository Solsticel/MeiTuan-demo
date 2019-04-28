import React,{ Component } from 'react';
import { View, Text, TouchableOpacity,StyleSheet, Image, Dimensions, ScrollView} from 'react-native'
import HomeMenuItem from './HomeMenuItem'
import PageControl from 'react-native-page-control'

export default class HomeMenuView extends Component{
    constructor(props){
        super(props)
        this.state = {
            scrollPage: 0,
        }
    }
    componentDidMount(){

    }
    _onScroll = (e)=>{
        let x = e.nativeEvent.contentOffset.x;              //X方向偏移量
        console.log(e.nativeEvent)
        let currentPage = Math.round(x / Dimensions.get('window').width)  //向下取整，偏移量除以屏幕宽度，判断是否翻到下一页
        if(this.state.scrollPage != currentPage){                          //如果没有翻页，则不更新怕个
            this.setState({
                scrollPage:currentPage
            })
        }
    }
    render() {
        let { menuInfo, onMenuSelected } = this.props
        let pageCount = Math.ceil(menuInfo.length / 10 )
        let menuElements = menuInfo.map((info,index) =>(
            <HomeMenuItem 
            key={index}
            icon={info.icon}
            title={info.title}                          // 文字➕图标
            onPress={()=>{
                onMenuSelected(index)                   //将下标传回去
            }}
            />
        ))
        let menuViews = []       // 菜单列表分页
        for(let i = 0;i < pageCount; i++){
            let elementsPerPage = menuElements.slice(i*10,i*10+10)
            let menuView = (
              <View style={styles.itemView} key={i}>
                {elementsPerPage}
              </View>
            )
            menuViews.push(menuView)
        }

        return (
            <View style={styles.container}> 
            <ScrollView               //设置纵向滚动
            horizontal                // 默认纵向，设置横向滚动
            pagingEnabled              // 设置可以翻页
            showsHorizontalScrollIndicator={false}   //隐藏底部滚动条
            onScroll={this._onScroll}      //滚动监听
            >
                {menuViews}                    
            </ScrollView>
            <PageControl                   //滚动翻页插件
            style={styles.PageControl}
            numberOfPages={pageCount}        // 总页数
            currentPage={this.state.scrollPage}                 //当前的页码
            pageIndicatorTintColor='gray'     //当前的颜色
            currentPageIndicatorTintColor='#06C1AE'     // 被选中状态的颜色
            />
            </View>
        )
        
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white'
    },
    itemView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // justifyContent:'center',
        // alignItems: 'center',
        width:Dimensions.get('window').width,
        // height:Dimensions.get('window').height / 5,
      },
      title:{
        fontSize:15,
        color:'white',
        margin:8
      },
      icon:{
          width:27,
          height:27,
          margin:8,
      },
      PageControl:{
          margin:10,
      },
})