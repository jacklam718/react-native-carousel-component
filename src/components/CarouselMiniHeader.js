// @flow

import React from 'react';
import type { ReactElement } from 'react';
import { Animated, StyleSheet, PixelRatio } from 'react-native';

const styles = StyleSheet.create({
  miniHeader: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: 12,
    top: 0,
    right: 12,
    paddingVertical: 9,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#E1E1E1',
  },
});

type Props = {
  style?: any;
  children: any;
}

const defaultProps = {
  style: null,
};

export default function CarouselMiniHeader({ children, style }: Props): ReactElement {
  return (
    <Animated.View
      numberOfLines={1}
      style={[styles.miniHeader, style]}
    >
      {children}
    </Animated.View>
  );
}

CarouselMiniHeader.defaultProps = defaultProps;
