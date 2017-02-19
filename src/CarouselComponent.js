// @flow

import React, { Component } from 'react';
import { Navigator, StyleSheet } from 'react-native';

import Carousel from './components/Carousel';

const styles = StyleSheet.create({
  navigator: {
    flex: 1,
    backgroundColor: 'black',
  },
});

type Props = {
  onShow?: () => void;
  onDismiss?: () => void;
  show?: boolean;
  children: any;
}

const defaultProps = {
  onShow: () => {},
  onDismiss: () => {},
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
      return <Carousel {...this.props} navigator={navigator} />;
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
