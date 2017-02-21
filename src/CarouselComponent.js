// @flow

import React, { Component } from 'react';
import { View, Navigator, StyleSheet, BackAndroid, Platform, Dimensions } from 'react-native';
import AnimatedOverlay from 'react-native-animated-overlay';

import Carousel from './components/Carousel';

const { width, height } = Dimensions.get('window');

const HARDWARE_BACK_PRESS_EVENT: string = 'hardwareBackPress';

const styles = StyleSheet.create({
  navigator: {
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    position: 'absolute',
    width,
    height,
  },
  show: {
    flex: 1,
    position: 'absolute',
    width,
    height,
  },
  hidden: {
    top: -10000,
    left: 0,
    height: 0,
    width: 0,
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

    this.state = {
      show: props.show,
      showOverlay: false,
    };

    (this: any).renderScene = this.renderScene.bind(this);
    (this: any).show = this.show.bind(this);
    (this: any).dismiss = this.dismiss.bind(this);
    (this: any).willFocus = this.willFocus.bind(this);
    (this: any).didFocus = this.didFocus.bind(this);
  }

  componentDidMount() {
    if (this.state.show) {
      this.show();
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

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackAndroid.removeEventListener(HARDWARE_BACK_PRESS_EVENT);
    }
  }

  show(callback?: Function = () => {}): void {
    this.setState({ show: true });
    this.navigator.push({ show: true });
    callback();
  }

  dismiss(callback?: Function = () => {}): void {
    this.navigator.pop();
    callback();
  }

  willFocus({ show }) {
    this.setState({ showOverlay: show || false });
  }

  didFocus({ show }) {
    this.setState({ show });
    const callback = show ? this.props.onShow : this.props.onDismiss;
    callback();

    this.setState({ show: show || false });
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

    return (
      <AnimatedOverlay
        overlayShow={this.state.showOverlay}
        opacity={1}
        duration={200}
        pointerEvents="auto"
      />
    );
  }

  render() {
    let navigatorStyle = styles.hidden;
    let pointerEvents = 'none';

    if (this.state.show) {
      navigatorStyle = styles.show;
      pointerEvents = 'auto';
    }

    return (
      <View style={styles.container} pointerEvents={pointerEvents}>
        <AnimatedOverlay
          overlayShow={this.state.showOverlay}
          opacity={1}
          duration={500}
          pointerEvents="auto"
        />
        <Navigator
          ref={(navigator) => { this.navigator = navigator; }}
          initialRoute={{ show: null }}
          configureScene={this.configureScene}
          renderScene={this.renderScene}
          onWillFocus={this.willFocus}
          onDidFocus={this.didFocus}
          style={[styles.navigator, navigatorStyle]}
        />
      </View>
    );
  }
}

export default CarouselComponent;
