import React, { Component } from 'react'
import { StyleSheet, Text, KeyboardAvoidingView, View } from 'react-native'

import Messages from '../components/Messages'
import SendMessages from '../components/SendMessages'
import Channels from './Channels'
import Header from '../components/Header';

interface Props {}
export default class App extends Component<Props> {
  render() {
    return (
      <Channels>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled
        >
          <Header />
          <Messages />
          <SendMessages />
        </KeyboardAvoidingView>
      </Channels>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: 50,
    paddingBottom: 50,
    fontFamily: 'Raleway',
  },
})
