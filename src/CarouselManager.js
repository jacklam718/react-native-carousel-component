// @flow

import React from 'react';
import RootSiblings from 'react-native-root-siblings';

import CarouselComponent from './CarouselComponent';

const DESTROY_TIMEOUT: number = 500;
const LOCK_TIMEOUT: number = 500;

class CarouselManager {
  constructor(props?: Object = {}) {
    this.locked = false;
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

  lockUntilTimeout() {
    this.locked = true;

    setTimeout(() => {
      this.locked = false;
    }, LOCK_TIMEOUT);
  }

  add(props: Object, callback?: Function = () => {}): void {
    // prevent multi calls in a short time
    if (this.locked) {
      return;
    }

    this.lockUntilTimeout();

    const carousel = new RootSiblings(
      <CarouselComponent {...props} onDismiss={this.dismiss} />,
      callback,
    );
    this.carousels.push(carousel);
  }

  update(props: Object, callback?: Function = () => {}): void {
    this.props = { ...this.props, ...props };

    this.currentCarousel.update(
      <CarouselComponent {...this.props} />,
      callback,
    );
  }

  show(props?: Object = {}, callback?: Function = () => {}): void {
    this.props = { ...this.props, ...props, show: true };
    this.add(this.props, callback);
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
      }, DESTROY_TIMEOUT);
    });
  }

  dismissAll(callback?: Function = () => {}): void {
    this.carousels.forEach(() => {
      this.dismiss(callback);
    });
  }
}

export default new CarouselManager();
