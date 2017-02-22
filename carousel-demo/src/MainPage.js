import React, { Component } from 'react';
import { View, StyleSheet, Navigator } from 'react-native';
import Button from './components/Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
  },
});

export default class MainPage extends Component {
  toCarouselPage = () => {
    this.props.navigator.push({ title: 'Carousel Page', name: 'carouselPage' });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Button
            onPress={this.props.showCarousel}
            text="Show Carousel Here ( Full Screen )"
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Button
            onPress={this.toCarouselPage}
            text="Go To Carousel Page"
          />
        </View>
      </View>
    );
  }
}
