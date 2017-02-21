// @flow

import React, { Component } from 'react';
import { Navigator, StyleSheet, BackAndroid, Platform } from 'react-native';

import Carousel from './components/Carousel';

const HARDWARE_BACK_PRESS_EVENT: string = 'hardwareBackPress';

const styles = StyleSheet.create({
  navigator: {
    flex: 1,
    backgroundColor: 'black',
  },
});

type Props = {
  onShow?: () => void;
  onDismiss?: () => void;
  dismissOnHardwareBackPress?: boolean;
  show?: boolean;
  navigatorStyle?: any;
  carouselStyle?: any;
  children: any;
}

const defaultProps = {
  onShow: () => {},
  onDismiss: () => {},
  dismissOnHardwareBackPress: true,
  navigatorStyle: null,
  carouselStyle: null,
  show: false,
};

class CarouselComponent extends Component {
  props: Props

  static defaultProps = defaultProps

  constructor(props: Props) {
    super(props);

    (this: any).renderScene = this.renderScene.bind(this);
    (this: any).show = this.show.bind(this);
    (this: any).dismiss = this.dismiss.bind(this);
    (this: any).didFocus = this.didFocus.bind(this);
  }

  componentDidMount() {
    if (this.props.show) {
      this.show(this.props.onShow);
    }

    if (Platform.OS === 'android') {
      const { dismissOnHardwareBackPress, onDismiss } = this.props;

      BackAndroid.addEventListener(HARDWARE_BACK_PRESS_EVENT, () => {
        if (dismissOnHardwareBackPress) {
          this.dismiss(onDismiss);
          return false;
        }
        return true;
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.show !== nextProps.show) {
      if (nextProps.show) {
        this.show(this.props.onShow);
        return;
      }
      this.dismiss(this.props.onDismiss);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackAndroid.removeEventListener(HARDWARE_BACK_PRESS_EVENT);
    }
  }

  show(callback?: Function = () => {}): void {
    this.navigator.push({ show: true });
    callback();
  }

  dismiss(callback?: Function = () => {}): void {
    this.navigator.pop();
    callback();
  }

  didFocus({ show }) {
    if (show === null) {
      return;
    }

    const callback = show ? this.props.onShow : this.props.onDismiss;
    callback();
  }

  configureScene() {
    return Navigator.SceneConfigs.FloatFromBottom;
  }

  renderScene(route, navigator) {
    if (route.show) {
      return (
        <Carousel
          {...this.props}
          style={this.props.carouselStyle}
          navigator={navigator}
        />
      );
    }
    return this.props.children;
  }

  render() {
    const { navigatorStyle } = this.props;

    return (
      <Navigator
        ref={(navigator) => { this.navigator = navigator; }}
        initialRoute={{ show: null }}
        configureScene={this.configureScene}
        renderScene={this.renderScene}
        onDidFocus={this.didFocus}
        style={[styles.navigator, navigatorStyle]}
      />
    );
  }
}

export default CarouselComponent;
