import React from 'react'
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native'

interface Props {
  onPress: () => void
  style: any
  title: string
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'white',
  },
  touchable: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    paddingLeft: 10,
    borderRadius: 10,
  },
})

export const TouchButton = ({ title, onPress, style }: Props): JSX.Element => {
  return (
    <View style={{ ...styles.container, ...style}}>
      <TouchableHighlight onPress={onPress} style={styles.touchable} activeOpacity={0.6} underlayColor="white">
        <Text>{title}</Text>
      </TouchableHighlight>
    </View>
  )
}
