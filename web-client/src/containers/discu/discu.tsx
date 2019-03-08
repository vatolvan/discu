import * as React from 'react'
import styled from 'styled-components'

import Messages from '~/components/Messages/Messages'
import SendMessage from '~/components/SendMessage/SendMessage'
import TopBar from '~/components/TopBar/TopBar'
import Channels from '~/components/Channels/Channels'

const Discu = styled.div`
  margin: 0.5% 1%;
`

const discu: React.SFC = (): JSX.Element => (
  <Discu>
    <TopBar />
    <Channels>
      <Messages />
      <SendMessage />
    </Channels>
  </Discu>
)

export default discu
