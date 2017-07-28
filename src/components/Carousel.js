// @flow

import React, { Component } from 'react';
import type { ReactElement } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import ViewPager from './ViewPager';
import CarouselHeader from './CarouselHeader';
import PageControl from './PageControl';

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
  showPageControl: boolean;
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
  showPageControl: true,
  cards: [],
};

class CarouselComponent extends Component {
  static defaultProps = defaultProps

  props: Props

  constructor(props: Props) {
    super(props);

    this.state = {
      selectedIndex: props.selectedIndex,
    };

    (this: any).selectedIndexChange = this.selectedIndexChange.bind(this);
  }

  componentWillReceiveProps(nexProps) {
    if (this.props.selectedIndex !== nexProps.selectedIndex) {
      this.setState({ selectedIndex: nexProps.selectedIndex });
    }
  }

  selectedIndexChange(index: number): void {
    const { onSelectedIndexChange } = this.props;
    // callback
    onSelectedIndexChange(index);
    this.setState({ selectedIndex: index });
  }

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
      showPageControl,
      cards,
    } = this.props;

    const pageControl = showPageControl ? (
      <PageControl
        count={cards.length}
        selectedIndex={this.state.selectedIndex}
      />
    ) : null;

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
          {pageControl}
        </View>
      </CarouselHeader>
    );
  }

  render() {
    const {
      cards,
      style,
      viewPagerStyle,
    } = this.props;

    return (
      <View style={[styles.container, style]}>
        {this.renderHeader()}

        <ViewPager
          style={[styles.viewPager, viewPagerStyle]}
          count={cards.length}
          selectedIndex={this.state.selectedIndex}
          onSelectedIndexChange={this.selectedIndexChange}
          bounces
        >
          {cards}
        </ViewPager>
      </View>
    );
  }
}

export default CarouselComponent;
