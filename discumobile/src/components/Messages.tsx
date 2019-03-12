import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView } from 'react-native'
import { Message } from '../types/Message'
import moment from 'moment'
import { db } from '../config'
import { withChannelContext } from '../containers/contexrts/ChannelContext'

interface Props {
  channel: string
}

const messagesRef = db.ref('/messages')

const styles = StyleSheet.create({
  messages: {
    paddingLeft: 2,
    paddingRight: 2,
    color: 'blue',
    borderWidth: 1,
    fontFamily: 'Raleway',
  },
  writer: {
    fontWeight: 'bold',
    fontFamily: 'Raleway',
  },
})

class Messages extends Component<Props> {
  state = {
    messages: [],
  }

  fetchMessages = (channel: string) => {
    messagesRef.child(channel).on('value', snapshot => {
      if (!snapshot) return
      const data = snapshot.val()
      const messages = data ? Object.values(data) : []
      this.setState({ messages })
    })
  }

  componentDidUpdate(prevProps: Props) {
    const { channel } = this.props

    if (!channel || prevProps.channel === channel) return
    if (prevProps.channel) messagesRef.child(prevProps.channel).off();

    this.fetchMessages(channel);
  }

  componentDidMount() {
    this.fetchMessages('all');
  }

  render(): JSX.Element {
    const { messages } = this.state

    const msgs = messages.map((msg: Message) => (
      <Text key={msg.time}>
        <Text style={{ fontFamily: 'Raleway' }}>
          {moment(msg.time).format('HH:mm:ss')}
        </Text>{' '}
        <Text style={styles.writer}>{msg.writer}</Text>{' '}
        <Text style={{ fontFamily: 'Raleway' }}>{msg.text}</Text>
      </Text>
    ))

    return <ScrollView style={styles.messages}>{msgs}</ScrollView>
  }
}

export default withChannelContext(Messages)
