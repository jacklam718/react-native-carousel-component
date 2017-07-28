// @flow

import React, { Component } from 'react';
import type { ReactElement } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ViewPagerAndroid,
  Platform,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  card: {
    backgroundColor: 'transparent',
  },
});

type Props = {
  count: number;
  selectedIndex: number;
  onSelectedIndexChange?: (index: number) => void;
  bounces?: boolean;
  style?: any;
  children: any;
};

const defaultProps = {
  bounces: true,
  style: null,
  onSelectedIndexChange: () => {},
};

type State = {
  width: number;
  height: number;
  selectedIndex: number;
  initialSelectedIndex: number;
  scrollingTo: ?number;
};

class ViewPager extends Component {
  props: Props

  state: State

  static defaultProps = defaultProps


  constructor(props: Props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      selectedIndex: this.props.selectedIndex,
      initialSelectedIndex: this.props.selectedIndex,
      scrollingTo: null,
    };

    (this: any).handleHorizontalScroll = this.handleHorizontalScroll.bind(this);
    (this: any).adjustCardSize = this.adjustCardSize.bind(this);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.selectedIndex !== this.state.selectedIndex) {
      if (Platform.OS === 'ios') {
        // this.scrollView.scrollTo({
        //   x: nextProps.selectedIndex * this.state.width,
        //   animated: true,
        // });
        this.setState({ scrollingTo: nextProps.selectedIndex });
      } else {
        this.scrollView.setPage(nextProps.selectedIndex);
        this.setState({ selectedIndex: nextProps.selectedIndex });
      }
    }
  }

  adjustCardSize(e: any) {
    this.setState({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
    });
  }

  handleHorizontalScroll(e: any) {
    let selectedIndex = e.nativeEvent.position;
    if (selectedIndex === undefined) {
      selectedIndex = Math.round(
        e.nativeEvent.contentOffset.x / this.state.width,
      );
    }
    if (selectedIndex < 0 || selectedIndex >= this.props.count) {
      return;
    }
    if (this.state.scrollingTo !== null && this.state.scrollingTo !== selectedIndex) {
      return;
    }
    if (this.props.selectedIndex !== selectedIndex || this.state.scrollingTo !== null) {
      this.setState({ selectedIndex, scrollingTo: null });
      this.props.onSelectedIndexChange(selectedIndex);
    }
  }

  renderContent(): Array<ReactElement> {
    const { width, height } = this.state;
    const style = Platform.OS === 'ios' && styles.card;

    return React.Children.map(this.props.children, (child, i) => (
      <View style={[style, { width, height }]} key={`r_${i}`}>
        {child}
      </View>
    ));
  }

  renderIOS() {
    return (
      <ScrollView
        ref={(scrollView) => { this.scrollView = scrollView; }}
        contentOffset={{
          x: this.state.width * this.state.initialSelectedIndex,
          y: 0,
        }}
        style={[styles.scrollView, this.props.style]}
        horizontal
        pagingEnabled
        bounces={!!this.props.bounces}
        scrollsToTop={false}
        onScroll={this.handleHorizontalScroll}
        scrollEventThrottle={100}
        automaticallyAdjustContentInsets={false}
        directionalLockEnabled
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onLayout={this.adjustCardSize}
      >
        {this.renderContent()}
      </ScrollView>
    );
  }

  renderAndroid() {
    return (
      <ViewPagerAndroid
        ref={(scrollView) => { this.scrollView = scrollView; }}
        initialPage={this.state.initialSelectedIndex}
        onPageSelected={this.handleHorizontalScroll}
        style={styles.container}
      >
        {this.renderContent()}
      </ViewPagerAndroid>
    );
  }

  render() {
    if (Platform.OS === 'ios') {
      return this.renderIOS();
    }
    return this.renderAndroid();
  }
}

export default ViewPager;
