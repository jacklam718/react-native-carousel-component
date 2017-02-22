// @flow

import React, { Component } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import AnimatedOverlay from 'react-native-animated-overlay';
import CarouselComponent from './CarouselComponent';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    width: WIDTH,
    height: HEIGHT,
  },
});

class CarouselComponentWrapper extends CarouselComponent {
  renderScene(route, navigator) {
    if (!route.show) {
      return <AnimatedOverlay overlayShow={this.props.show} opacity={1} duration={500} />;
    }
    return super.renderScene(route, navigator);
  }

  render() {
    return (
      <View style={styles.container} >
        <AnimatedOverlay
          overlayShow={this.props.show}
          opacity={1}
          duration={500}
        />

        {super.render()}
      </View>
    );
  }
}

export default CarouselComponentWrapper;
