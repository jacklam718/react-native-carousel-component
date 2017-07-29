import React, { Component } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';

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
            title="Show Carousel Here ( CarouselComponent Full Screen )"
          />
        </View>

        <View style={{ marginTop: 20 }}>
          <Button
            onPress={this.toCarouselPage}
            title="Go To Carousel Page"
          />
        </View>
      </View>
    );
  }
}
