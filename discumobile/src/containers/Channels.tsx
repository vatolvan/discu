import React, { Component } from 'react'
import { View, Button, Text } from 'react-native'
import SideMenu from 'react-native-side-menu'
import Dialog from 'react-native-dialog'
import ChannelContext from './contexrts/ChannelContext'
import AddChannelDialog from '../components/AddChannel'

export default class Channels extends Component {
  state = {
    channels: ['all'],
    currentChannel: 'all',
    showAddChannel: false,
  }

  updateChannel = (currentChannel: string) => {
    this.setState({ currentChannel })
  }

  addChannel = (channel: string) => {
    const { channels } = this.state
    const newChannels = [...channels]
    newChannels.push(channel)
    console.log(channel);
    console.log(channels);
    this.setState({ channels: newChannels, currentChannel: channel, showAddChannel: false })
  }

  render() {
    const { children } = this.props
    const { currentChannel, channels, showAddChannel } = this.state

    const menu = (
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
          paddingTop: 60,
          paddingLeft: 20,
        }}
      >
        <Text>Kanavat</Text>
        {channels.map(channel => (
          <View key={channel}>
            <Button
              style={{ color: 'red' }}
              title={channel}
              onPress={() => this.updateChannel(channel)}
            />
          </View>
        ))}
        <Button
          title="+"
          style={{ borderWidth: 1 }}
          onPress={() => this.setState({ showAddChannel: true })}
        />
        <AddChannelDialog
          show={showAddChannel}
          onSubmit={this.addChannel}
          onCancel={() => this.setState({ showAddChannel: false })}
        />
      </View>
    )

    return (
      <SideMenu isOpen={false} menu={menu} openMenuOffset={150}>
        <ChannelContext.Provider value={currentChannel}>
          {children}
        </ChannelContext.Provider>
      </SideMenu>
    )
  }
}
