// @flow

import React from 'react';
import RootSiblings from 'react-native-root-siblings';
import CarouselComponentWrapper from './CarouselComponentWrapper';

const DESTRAY_TIMEOUT = 1000;

class CarouselManager {
  constructor(props?: Object = {}) {
    this.dismiss = this.dismiss.bind(this);
    this.props = {
      ...props,
      onDismiss: this.dismiss,
      navigatorStyle: { backgroundColor: 'transparent' },
    };
  }

  create(props: Object, callback?: Function = () => {}): void {
    this.carousel = new RootSiblings(<CarouselComponentWrapper {...props} />, () => {
      callback();
    });
  }

  update(props: Object, callback?: Function = () => {}): void {
    this.carousel.update(<CarouselComponentWrapper {...props} />, () => {
      callback();
    });
  }

  show(callback?: Function = () => {}, props?: Object = this.props): void {
    const newProps = {
      ...props,
      show: true,
      onDismiss: this.dismiss,
    };

    this.create(newProps, callback);
  }

  dismiss(callback?: Function = () => {}): void {
    this.update({ ...this.props, show: false }, () => {
      callback();
      setTimeout(() => {
        this.carousel.destroy();
      }, DESTRAY_TIMEOUT);
    });
  }
}

export default CarouselManager;
