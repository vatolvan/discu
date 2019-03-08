import * as React from 'react'
import { AuthContext } from '~/containers/contexts/AuthContext'
import styled from 'styled-components'

const TopBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const SignOutButton = styled.button`
  border: none;
  background: none;
  height: 40px;
  margin: 10px;
  cursor: pointer;
`

const TopBar: React.SFC = (): JSX.Element => {
  const { logOut } = React.useContext(AuthContext)

  return (
    <TopBarContainer>
      <h1>DISCU</h1>
      <SignOutButton onClick={logOut}>Kirjaudu ulos</SignOutButton>
    </TopBarContainer>
  )
}

export default TopBar
