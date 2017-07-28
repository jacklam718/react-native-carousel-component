// @flow

import React, { Component } from 'react';
import type { ReactElement } from 'react';
import { View, StyleSheet } from 'react-native';

const CIRCLE_SIZE = 4;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
  },
  circle: {
    margin: 2,
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },
  full: {
    backgroundColor: '#fff',
  },
  empty: {
    backgroundColor: '#fff5',
  },
});

type Props = {
  style?: any;
  count: number;
  selectedIndex: number;
}

const defaultProps = {
  style: null,
};

function Circle({ isSelected }: { isSelected: boolean }): ReactElement {
  const extraStyle = isSelected ? styles.full : styles.empty;
  return (
    <View style={[styles.circle, extraStyle]} />
  );
}

class PageControl extends Component {
  static defaultProps = defaultProps

  props: Props

  render() {
    const {
      style,
      count,
      selectedIndex,
    } = this.props;

    const images = [];
    for (let i = 0; i < count; i += 1) {
      const isSelected = selectedIndex === i;
      images.push(<Circle key={i} isSelected={isSelected} />);
    }

    return (
      <View style={[styles.container, style]}>
        <View style={styles.innerContainer}>
          {images}
        </View>
      </View>
    );
  }
}

export default PageControl;
