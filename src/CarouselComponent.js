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
  carouselStyle?: any;
  children: any;
}

const defaultProps = {
  onShow: () => {},
  onDismiss: () => {},
  dismissOnHardwareBackPress: true,
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
    return (
      <Navigator
        ref={(navigator) => { this.navigator = navigator; }}
        initialRoute={{ show: this.props.show }}
        configureScene={this.configureScene}
        renderScene={this.renderScene}
        onDidFocus={this.didFocus}
        style={styles.navigator}
      />
    );
  }
}

export default CarouselComponent;
