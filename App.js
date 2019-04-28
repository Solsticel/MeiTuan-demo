
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flowa
 */

import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View ,RefreshControl } from 'react-native';
import AppNavigator from './src/AppNavigator'
// type Props = {};
export default class App extends Component {
  constructor(){
    super()
    this.state = {
      val:'111'
    }
  }

  render() {
    return (
        <AppNavigator />
    );
  }

}



