import React, { createContext } from 'react'

const ChannelContext = createContext('Kanava 1')

export default ChannelContext

export const withChannelContext = (Component: any) => (
  React.forwardRef((props, ref) => (
    <ChannelContext.Consumer>
      {channel => <Component channel={channel} {...props} ref={ref}/>}
    </ChannelContext.Consumer>
  ))
)
