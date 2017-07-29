import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, Button } from 'react-native';
import CarouselComponent, { CarouselCard } from 'react-native-carousel-component';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
  },
});

export default class CarouselPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };

    this.show = this.show.bind(this);
    this.dismiss = this.dismiss.bind(this);
  }

  show() {
    this.carousel.show();
  }

  dismiss() {
    this.carousel.dismiss();
  }

  get cards() {
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
        cards={this.cards}
        showPageControl={false}
        show
      >
        <View style={styles.container}>
          <Button
            title="Open"
            onPress={this.show}
          />
        </View>
      </CarouselComponent>
    );
  }
}
