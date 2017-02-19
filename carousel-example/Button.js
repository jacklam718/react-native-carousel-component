// @flow

import React, { type ReactElement } from 'react';
import { Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

const styles = StyleSheet.create({
  button: {
    // width: WIDTH * 0.8,
    width: null,
    height: 50,
    borderRadius: 50,
    borderWidth: 0,
    backgroundColor: '#009688',
    justifyContent: 'space-around',
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 15,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '100',
  },
});

type Props = {
  text: any;
  onPress?: () => void;
}

export default function Button({ text, onPress }: Props): ReactElement {
  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

Button.defaultProps = {
  onPress: () => {},
};
