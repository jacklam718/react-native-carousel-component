
// @flow

import React from 'react';
import RootSiblings from 'react-native-root-siblings';

import CarouselComponent from './CarouselComponent';

const DESTRAY_TIMEOUT = 500;

class CarouselManager {
  constructor(props?: Object = {}) {
    this.carousels = [];

    this.show = this.show.bind(this);
    this.dismiss = this.dismiss.bind(this);
    this.dismissAll = this.dismissAll.bind(this);
    this.update = this.update.bind(this);

    this.props = {
      ...props,
      show: false,
    };
  }

  get currentCarousel() {
    return this.carousels[this.carousels.length - 1];
  }

  add(props: Object, callback?: Function = () => {}): void {
    const carousel = new RootSiblings(
      <CarouselComponent {...props} onDismiss={this.dismiss} />,
      callback,
    );
    this.carousels.push(carousel);
  }

  update(props: Object, callback?: Function = () => {}): void {
    this.currentCarousel.update(
      <CarouselComponent {...props} />,
      callback,
    );
  }

  show(props?: Object = {}, callback?: Function = () => {}): void {
    const newProps = { ...this.props, ...props, show: true };

    this.add(newProps, callback);
  }

  dismiss(callback?: Function = () => {}): void {
    this.update({ ...this.props, show: false }, () => {
      callback();

      setTimeout(() => {
        const carousel = this.carousels.pop();

        // FIXME don't know why will call 2 times.
        // First time is siblings instance second time is null
        if (carousel) {
          carousel.destroy();
        }
      }, DESTRAY_TIMEOUT);
    });
  }

  dismissAll(callback?: Function = () => {}): void {
    this.carousels.forEach(() => {
      this.dismiss(callback);
    });
  }
}

export default CarouselManager;
