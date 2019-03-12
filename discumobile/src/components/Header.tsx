import React, { Component } from 'react'
import { Text } from 'react-native'
import { withChannelContext } from '../containers/contexrts/ChannelContext'

interface Props {
  channel: string
}

class Header extends Component {
  render() {
    const title = 'DISCU'
    const { channel } = this.props

    return (
      <Text style={{ fontFamily: 'Raleway' }}>{`${title}#${channel}`}</Text>
    )
  }
}

export default withChannelContext(Header)
