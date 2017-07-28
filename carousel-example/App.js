import React, { Component } from 'react';
import { View, Button, StatusBar, Text, StyleSheet, ScrollView } from 'react-native';

import CarouselComponent, {
  Carousel,
  CarouselCard,
  CarouselHeader,
  CarouselMiniHeader,
  ViewPager,
} from 'react-native-carousel-component';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
  },
});

export default class CarouselExample extends Component {
  constructor(props) {
    super(props);

    (this: any).show = this.show.bind(this);
    (this: any).dismiss = this.dismiss.bind(this);
  }

  show() {
    this.carousel.show();
  }

  dismiss() {
    this.carousel.dismiss();
  }

  renderCards() {
    const cards = [];
    for (let i = 0; i < 4; i += 1) {
      cards.push(
        <CarouselCard
          key={i}
          title="React Native"
          description="A React Native App is a Real Mobile App With React Native, you don't build a “mobile web app”, an “HTML5 app”, or a “hybrid app”. You build a real mobile app that's indistinguishable from an app built using Objective-C or Java. React Native uses the same fundamental UI building blocks as regular iOS and Android apps. You just put those building blocks together using JavaScript and React."
          actions={[
            <Button
              key={0}
              title="Dismiss"
              onPress={this.dismiss}
            />,
          ]}
        >
          <StatusBar barStyle="light-content" />
        </CarouselCard>,
      );
    }

    return cards;
  }

  render() {
    return (
      <CarouselComponent
        ref={(carousel) => { this.carousel = carousel; }}
        cards={this.renderCards()}
        title="Intro React Native"
        subTitle="What Is React Native?"
        leftItem={{
          title: 'CLOSE',
          layout: 'title',
          onPress: this.dismiss,
        }}
      >
        <View style={{ flex: 1 }}>
          <StatusBar barStyle="dark-content" />
          <View style={styles.container}>
            <Button
              title="Open"
              onPress={this.show}
            />

          </View>
        </View>
      </CarouselComponent>
    );
  }
}
