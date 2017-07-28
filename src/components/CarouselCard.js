// @flow

import React, { Component } from 'react';
import type { ReactElement } from 'react';
import { View, Text, ScrollView, StyleSheet, Animated } from 'react-native';

import CarouselMiniHeader from './CarouselMiniHeader';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 2,
    marginHorizontal: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: -1,
    lineHeight: 32,
    marginVertical: 20,
  },
  description: {
    fontSize: 17,
    lineHeight: 25,
  },
  contentContainer: {
    padding: 26,
    paddingBottom: 60,
  },
  actions: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 1,
    margin: 10,
    paddingVertical: 10,
    borderTopColor: '#eeeeee',
    backgroundColor: 'white',
  },
});

type Props = {
  title?: string;
  titleStyle?: any;
  description?: string;
  descriptionStyle?: any;
  contentContainerStyle?: any;
  miniHeaderStyle?: any;
  style?: any;
  actions: Array<ReactElement>;
  actionsStyle?: any;
  children?: any;
  showMiniHeader?: boolean;
}

const defaultProps = {
  title: null,
  titleStyle: null,
  description: null,
  descriptionStyle: null,
  contentContainerStyle: null,
  miniHeaderStyle: null,
  style: null,
  actions: null,
  actionsStyle: null,
  children: null,
  showMiniHeader: true,
};

type State = {
  scrollTop: Object;
}

class CarouselCard extends Component {
  props: Props

  state: State

  static defaultProps = defaultProps

  constructor(props: Props) {
    super(props);

    this.state = {
      scrollTop: new Animated.Value(0),
    };

    (this: any).onScroll = this.onScroll.bind(this);
  }

  onScroll({ nativeEvent }) {
    this.state.scrollTop.setValue(nativeEvent.contentOffset.y);
  }

  render() {
    const {
      style,
      title,
      titleStyle,
      description,
      descriptionStyle,
      actions,
      actionsStyle,
      contentContainerStyle,
      miniHeaderStyle,
      children,
      showMiniHeader,
    } = this.props;

    const carouselTitle = title ? (
      <Text style={[styles.title, titleStyle]}>
        {title}
      </Text>
    ) : null;

    const carouselDescription = description ? (
      <Text style={[styles.description, descriptionStyle]}>
        {description}
      </Text>
    ) : null;

    const carouselMiniHeader = (title && showMiniHeader) ? (
      <CarouselMiniHeader
        style={[
          miniHeaderStyle,
          {
            opacity: this.state.scrollTop.interpolate({
              inputRange: [0, 150, 200],
              outputRange: [0, 0, 1],
              extrapolate: 'clamp',
            }),
          },
        ]}
      >
        <Text>{title}</Text>
      </CarouselMiniHeader>
    ) : null;

    const carouselActions = actions ? (
      <View style={[styles.actions, actionsStyle]}>
        {actions}
      </View>
    ) : null;

    return (
      <View style={[styles.container, style]}>
        <ScrollView
          contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
          onScroll={this.onScroll}
          scrollEventThrottle={100}
          showsVerticalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
        >
          {carouselTitle}
          {carouselDescription}
          {children}
        </ScrollView>
        {carouselMiniHeader}
        {carouselActions}
      </View>
    );
  }
}

export default CarouselCard;
