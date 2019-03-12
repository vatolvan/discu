import React, { Component } from 'react'
import { View } from 'react-native'
import Dialog from 'react-native-dialog'

interface Props {
  show: boolean
  onSubmit: (s: string) => void
  onCancel: () => void
}

class AddChannelDialog extends Component<Props> {
  state = {
    name: '',
  }

  render() {
    const { show, onSubmit, onCancel } = this.props
    const { name } = this.state

    return (
      <View>
        <Dialog.Container visible={show}>
          <Dialog.Title>Add channel</Dialog.Title>
          <Dialog.Input
            autoFocus={true}
            onChangeText={(name: string) => this.setState({ name })}
            value={name}
          />
          <Dialog.Button
            label="Cancel"
            onPress={() => {
              this.setState({ name: '' })
              onCancel()
            }}
          />
          <Dialog.Button label="Add channel" onPress={() => onSubmit(name)} />
        </Dialog.Container>
      </View>
    )
  }
}

export default AddChannelDialog
