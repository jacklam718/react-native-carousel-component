// @flow

import React, { Component, type ReactElement } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import ViewPager from './ViewPager';
import CarouselHeader from './CarouselHeader';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewPager: {
    margin: 10,
    overflow: 'visible',
    backgroundColor: 'black',
  },
  title: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
});

type Props = {
  style?: any;
  viewPagerStyle?: any;
  selectedIndex?: number;
  onSelectedIndexChange?: (index: number) => void;
  cards?: Array<ReactElement>;
  header?: ReactElement;
  headerContentStyle?: any;
  title?: string;
  titleStyle?: any;
  titleContentStyle?: any;
  subTitle?: string,
  subTitleStyle?: any;
  leftItem?: Object;
  rightItem?: Object;
}

const defaultProps = {
  header: null,
  headerContentStyle: null,
  title: null,
  titleStyle: null,
  titleContentStyle: null,
  subTitle: null,
  subTitleStyle: null,
  leftItem: null,
  rightItem: null,
  style: null,
  viewPagerStyle: null,
  selectedIndex: 0,
  onSelectedIndexChange: () => {},
  cards: [],
};

class CarouselComponent extends Component {
  props: Props

  static defaultProps = defaultProps

  renderHeader() {
    if (this.props.header) {
      return this.props.header;
    }

    const {
      leftItem,
      rightItem,
      title,
      titleStyle,
      subTitle,
      subTitleStyle,
      headerContentStyle,
      titleContentStyle,
    } = this.props;

    return (
      <CarouselHeader
        style={styles.header}
        leftItem={leftItem}
        rightItem={rightItem}
      >
        <View style={[styles.headerContent, headerContentStyle]}>
          <Text style={[styles.title, titleContentStyle]}>
            <Text style={[styles.title, titleStyle]}>
              {title}
            </Text>
            {'\n'}
            <Text style={[styles.subTitle, subTitleStyle]}>
              {subTitle}
            </Text>
          </Text>
        </View>
      </CarouselHeader>
    );
  }

  render() {
    const {
      cards,
      selectedIndex,
      onSelectedIndexChange,
      style,
      viewPagerStyle,
    } = this.props;

    const carouselHeader = this.renderHeader();

    return (
      <View style={[styles.container, style]}>
        {carouselHeader}

        <ViewPager
          style={[styles.viewPager, viewPagerStyle]}
          count={cards.length}
          selectedIndex={selectedIndex}
          onSelectedIndexChange={onSelectedIndexChange}
          bounces
        >
          {cards}
        </ViewPager>
      </View>
    );
  }
}

export default CarouselComponent;
