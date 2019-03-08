import * as React from 'react'
import styled from 'styled-components'

interface Props {
  name: string
  active: boolean
  onClick: () => void
  deleteChannel: (e: React.MouseEvent<HTMLButtonElement>, s: string) => void
}

interface ChannelItemProps {
  active: boolean
}

const ChannelItem = styled.li`
  list-style-type: none;
  display: inline-block;
  padding: 5px 10px;
  border: 1px solid black;
  background-color: ${(props: ChannelItemProps) =>
    props.active ? 'grey' : 'white'};
  cursor: default;
`

const DeleteButton = styled.button`
  padding: 0;
  font-size: 12px;
  margin-left: 5px;
  border: none;
  background: none;
  cursor: pointer;
`

const Channel: React.SFC<Props> = ({
  name,
  active,
  onClick,
  deleteChannel,
}): JSX.Element => (
  <ChannelItem active={active} onClick={onClick}>
    {name}{' '}
    <DeleteButton onClick={e => deleteChannel(e, name)}>
      <i className="fas fa-times" />
    </DeleteButton>
  </ChannelItem>
)

export default Channel
