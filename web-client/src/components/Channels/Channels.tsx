import * as React from 'react'
import styled from 'styled-components'
import { ChannelContext } from '~/containers/contexts/ChannelContext'
import Channel from './Channel/Channel'

interface Props {
  children: JSX.Element[] | JSX.Element
}

const ChannelList = styled.ul`
  margin: 0;
  padding: 0;
`

const AddChannel = styled.button`
  margin: 0 10px;
  border: none;
  cursor: pointer;
  height: 100%;
  width: 30px;
  outline: none;

  &:hover {
    color: grey;
  }
`

interface ChannelState {
  openChannels: string[]
  selected: string | null
}

const INITIAL_STATE: ChannelState = {
  openChannels: ['all'],
  selected: 'all',
}

const Channels: React.SFC<Props> = ({ children }): JSX.Element => {
  const [channels, setChannels] = React.useState<ChannelState>(INITIAL_STATE)

  console.log('Channels: ', channels)
  function addChannel(): void {
    const selected = window.prompt('Uuden kanavan nimi?')
    if (selected) {
      const openChannels = [...channels.openChannels]
      openChannels.push(selected)
      setChannels({ selected, openChannels })
    }
  }

  function deleteChannel(
    e: React.MouseEvent<HTMLButtonElement>,
    channel: string
  ): void {
    const index = channels.openChannels.indexOf(channel)
    const openChannels = [...channels.openChannels]
    openChannels.splice(index, 1)
    setChannels(prev => ({
      selected: channel === prev.selected ? null : prev.selected,
      openChannels,
    }))
    e.stopPropagation()
  }

  return (
    <ChannelContext.Provider value={channels.selected}>
      <ChannelList>
        {channels.openChannels.map(channel => (
          <Channel
            name={channel}
            active={channel === channels.selected}
            onClick={() => {
              setChannels(prev => ({
                openChannels: prev.openChannels,
                selected: channel,
              }))
            }}
            key={channel}
            deleteChannel={deleteChannel}
          />
        ))}
        <AddChannel onClick={addChannel}>
          <i className="fas fa-plus" style={{ fontSize: '18px' }} />
        </AddChannel>
      </ChannelList>
      {children}
    </ChannelContext.Provider>
  )
}

export default Channels
