import React, { Component } from 'react'
import {
  TextInput,
  View,
  StyleSheet,
  Keyboard,
  EmitterSubscription,
} from 'react-native'
import { db } from '../config'
import { TouchButton } from './TouchButton'
import { withChannelContext } from '../containers/contexrts/ChannelContext';

const messagesRef = db.ref('messages/')

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
})

interface State {
  text: string
  keyboardShown: boolean
}

interface Props {
  channel: string
}

class SendMessages extends Component<Props> {
  keyboardDidShowListener: EmitterSubscription | null = null
  keyboardDidHideListener: EmitterSubscription | null = null

  state: State = {
    text: '',
    keyboardShown: false,
  }

  componentDidMount(): void {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardWillShow',
      () => this.setState({ keyboardShown: true })
    )
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardWillHide',
      () => setTimeout(() => this.setState({ keyboardShown: false }), 50)
    )
  }

  sendMessage = (): void => {
    const { text } = this.state
    const { channel } = this.props;

    if (!text || text === '' || !channel) return

    const time = Date.now()
    const writer = 'Ville Tolvanen'

    messagesRef.child(channel).push({ time, writer, text })
    this.setState({ text: '' })
  }

  render(): JSX.Element {
    const { text, keyboardShown } = this.state

    return (
      <View
        style={{
          ...styles.container,
          backgroundColor: 'grey',
          flexDirection: 'row',

          paddingTop: 2,
          paddingBottom: keyboardShown ? 2 : 30,
          paddingLeft: 3,
          paddingRight: 3,
        }}
      >
        <TextInput
          placeholder="Type your message here"
          style={{
            height: 40,
            padding: 10,
            backgroundColor: 'white',
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            width: '80%',
          }}
          value={text}
          onChangeText={text => this.setState({ text })}
          onSubmitEditing={this.sendMessage}
        />
        <TouchButton
          onPress={this.sendMessage}
          style={{
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
          }}
          title="Send"
        />

        {/* <Button
          title="Send"
          color="white"
          onPress={this.sendMessage}
          underLayColor="white"
          style={{ borderColor: 'black', borderWidth: 1, width: '20%', color: 'white', backgroundColor: 'white' }}
        /> */}
      </View>
    )
  }
}

export default withChannelContext(SendMessages)
