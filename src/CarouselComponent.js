// @flow

import React, { Component } from 'react';
import { View, Navigator, StyleSheet, Dimensions, BackAndroid } from 'react-native';
import AnimatedOverlay from 'react-native-animated-overlay';

import Carousel from './components/Carousel';

const HARDWARE_BACK_PRESS_EVENT: string = 'hardwareBackPress';
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerForNoChildren: {
    flex: 1,
    position: 'absolute',
    width: WIDTH,
    height: HEIGHT,
  },
  navigatorForNoChildren: {
    backgroundColor: 'transparent',
  },
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
  children?: any;
}

const defaultProps = {
  onShow: () => {},
  onDismiss: () => {},
  dismissOnHardwareBackPress: true,
  navigatorStyle: null,
  carouselStyle: null,
  show: null,
  children: null,
};

class CarouselComponent extends Component {
  props: Props

  static defaultProps = defaultProps

  constructor(props: Props) {
    super(props);

    this.state = {
      show: null,
    };

    (this: any).renderScene = this.renderScene.bind(this);
    (this: any).configureScene = this.configureScene.bind(this);
    (this: any).show = this.show.bind(this);
    (this: any).dismiss = this.dismiss.bind(this);
    (this: any).hardwareBackPressHandler = this.hardwareBackPressHandler.bind(this);
  }

  componentDidMount() {
    const { show } = this.props;

    if (show) {
      this.show();
    }

    BackAndroid.addEventListener(HARDWARE_BACK_PRESS_EVENT, this.hardwareBackPressHandler);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.show !== nextProps.show) {
      if (nextProps.show) {
        this.show();
        return;
      }
      this.dismiss();
    }
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener(HARDWARE_BACK_PRESS_EVENT);
  }

  hardwareBackPressHandler(): boolean {
    const { dismissOnHardwareBackPress } = this.props;

    if (dismissOnHardwareBackPress && this.state.show) {
      this.dismiss();
      return true;
    }

    return false;
  }

  show(callback?: Function = () => {}): void {
    this.navigator.push({ show: true });
    this.setState({ show: true });
    callback();
    this.props.onShow();
  }

  dismiss(callback?: Function = () => {}): void {
    this.navigator.pop();
    this.setState({ show: false });
    callback();
    this.props.onDismiss();
  }

  configureScene(): Object {
    const { children } = this.props;
    if (children) {
      return Navigator.SceneConfigs.FloatFromBottom;
    }
    return { ...Navigator.SceneConfigs.FloatFromBottom, gestures: {} };
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

    if (!this.props.children) {
      return (
        <AnimatedOverlay
          overlayShow={this.state.show}
          pointerEvents="auto"
          opacity={0.5}
          duration={500}
        />
      );
    }

    return this.props.children;
  }

  render() {
    const { navigatorStyle, children } = this.props;

    let containerStyleForNoChildren = null;
    let navigatorForNoChildren = null;
    let animatedOverlay = null;

    if (!children) {
      containerStyleForNoChildren = styles.containerForNoChildren;
      navigatorForNoChildren = styles.navigatorForNoChildren;

      animatedOverlay = children ? null : (
        <AnimatedOverlay
          overlayShow={this.state.show}
          opacity={1}
          duration={500}
          pointerEvents="auto"
        />
      );
    }

    return (
      <View style={[styles.container, containerStyleForNoChildren]} pointerEvents="auto">
        {animatedOverlay}
        <Navigator
          ref={(navigator) => { this.navigator = navigator; }}
          initialRoute={{ show: null }}
          configureScene={this.configureScene}
          renderScene={this.renderScene}
          style={[styles.navigator, navigatorForNoChildren, navigatorStyle]}
        />
      </View>
    );
  }
}

export default CarouselComponent;
