import { createStackNavigator,createBottomTabNavigator, createAppContainer } from 'react-navigation'
import React,{Component} from 'react'
import { Button } from 'react-native'
import TabBarItem from './util/TabBarItem'
import color from './util/color'
import Main from './components/main/Main'
import NearBy from './components/nearby/NearBy'
import Order from './components/order/Order'
import Mine from './components/mine/Mine'
import Test from './Test'

class AppNavigator extends Component {
  constructor() {
    super()

  }

  render() {
    return (
      <AppContainer />
    )
  }
}


const AppBottomNavigator = createBottomTabNavigator({
    Main :{
        screen: createStackNavigator({ Main: Main}),
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: '团购',
            tabBarIcon: ({ focused, tintColor }) => (
              <TabBarItem
                tintColor={tintColor}
                focused={focused}
                normalImage={require('./img/tabbar/tabbar_homepage.png')}
                selectedImage={require('./img/tabbar/tabbar_homepage_selected.png')}
              />
            )
          }),
    },
    NearBy :{
        screen: createStackNavigator({ NearBy: NearBy}),
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: '附近',
            tabBarIcon: ({ focused, tintColor }) => (
              <TabBarItem
                tintColor={tintColor}
                focused={focused}
                normalImage={require('./img/tabbar/tabbar_merchant.png')}
                selectedImage={require('./img/tabbar/tabbar_merchant_selected.png')}
              />
            )
          }),
    },
    Order :{
        screen: createStackNavigator({ Order: Order}),
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: '订单',
            tabBarIcon: ({ focused, tintColor }) => (
              <TabBarItem
                tintColor={tintColor}
                focused={focused}
                normalImage={require('./img/tabbar/tabbar_order.png')}
                selectedImage={require('./img/tabbar/tabbar_order_selected.png')}
              />
            )
          }),
    },
    Mine :{
        screen: createStackNavigator({ Mine: Mine}),
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: '我的',
            tabBarIcon: ({ focused, tintColor }) => (
              <TabBarItem
                tintColor={tintColor}
                focused={focused}
                normalImage={require('./img/tabbar/tabbar_mine.png')}
                selectedImage={require('./img/tabbar/tabbar_mine_selected.png')}
              />
            )
          }),
    },
},{
    lazy:true,
    
    tabBarOptions: {
        activeTintColor: color.primary,
        inactiveTintColor: color.gray,
        style: { backgroundColor: '#ffffff' },
      },
})



AppBottomNavigator.navigationOptions = {
  header: null,
};

const appNavigator = createStackNavigator(
  {
    AppBottomNavigator: { screen: AppBottomNavigator },
    test: { screen: Test },
  },
  {
    defaultNavigationOptions: {
      headerBackTitle: null,
      headerTintColor: '#333333',
      showIcon: true,
    },
  }
)

const AppContainer = createAppContainer(appNavigator);

export default AppNavigator;

