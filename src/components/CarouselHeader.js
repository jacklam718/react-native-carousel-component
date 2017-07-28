// @flow

import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity,
  ToolbarAndroid,
} from 'react-native';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 25;
const HEADER_HEIGHT = Platform.OS === 'ios' ? 44 + STATUS_BAR_HEIGHT : 56 + STATUS_BAR_HEIGHT;

const styles = StyleSheet.create({
  toolbarContainer: {
    paddingTop: STATUS_BAR_HEIGHT,
  },
  toolbar: {
    height: HEADER_HEIGHT - STATUS_BAR_HEIGHT,
  },
  header: {
    backgroundColor: 'transparent',
    paddingTop: STATUS_BAR_HEIGHT,
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  leftItem: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerItem: {
    flex: 2,
    alignItems: 'center',
  },
  rightItem: {
    flex: 1,
    alignItems: 'flex-end',
  },
  itemWrapper: {
    padding: 11,
  },
  itemText: {
    letterSpacing: 1,
    fontSize: 12,
    color: 'white',
  },
});

type Layout =
    'default'      // Use platform defaults (icon on Android, text on iOS)
  | 'icon'         // Always use icon
  | 'title';       // Always use title

type Foreground = 'light' | 'dark';

type Item = {
  title?: string;
  icon?: number;
  layout?: Layout;
  onPress?: () => void;
};

type Props = {
  title?: string;
  leftItem?: Item;
  rightItem?: Item;
  extraItems?: Array<Item>;
  foreground?: Foreground;
  style?: any;
  children?: any;
};

const defaultProps = {
  title: null,
  leftItem: null,
  rightItem: null,
  extraItems: null,
  foreground: null,
  style: null,
  children: null,
};

class HeaderAndroid extends Component {
  static height: number;

  static defaultProps = defaultProps

  props: Props;

  constructor(props: Props) {
    super(props);

    (this: any).handleActionSelected = this.handleActionSelected.bind(this);
  }

  handleActionSelected(position: number) {
    const { rightItem, extraItems } = this.props;

    let items = extraItems || [];
    if (rightItem) {
      items = [rightItem, ...items];
    }
    const item = items[position];
    if (item && item.onPress) {
      item.onPress();
    }
  }

  render() {
    const {
      style,
      leftItem,
      rightItem,
      extraItems,
      foreground,
      children,
    } = this.props;

    let actions = [];
    if (rightItem) {
      const { title, icon, layout } = rightItem;
      actions.push({
        icon: layout !== 'title' ? icon : undefined,
        title,
        show: 'always',
      });
    }
    if (extraItems) {
      actions = actions.concat(extraItems.map(item => ({
        title: item.title,
        show: 'never',
      })));
    }

    const textColor = foreground === 'dark'
      ? '#032250'
      : 'white';

    let content;
    if (React.Children.count(children) > 0) {
      content = (
        <View collapsable={false} style={{ flex: 1 }}>
          {children}
        </View>
      );
    }

    return (
      <View style={[styles.toolbarContainer, style]}>
        <ToolbarAndroid
          navIcon={leftItem && leftItem.icon}
          onIconClicked={leftItem && leftItem.onPress}
          title={this.props.title}
          titleColor={textColor}
          subtitleColor={textColor}
          actions={actions}
          onActionSelected={this.handleActionSelected}
          style={styles.toolbar}
        >
          {content}
        </ToolbarAndroid>
      </View>
    );
  }
}

class HeaderIOS extends Component {
  static height: number

  static defaultProps = defaultProps

  props: Props

  render() {
    const { leftItem, title, rightItem, foreground } = this.props;
    const titleColor = foreground === 'dark' ? '#032250' : 'white';
    const itemsColor = foreground === 'dark' ? '#7F91A7' : 'white';

    const content = React.Children.count(this.props.children) === 0
      ? (<Text style={[styles.titleText, { color: titleColor }]}>
        {title}
      </Text>)
      : this.props.children;
    return (
      <View style={[styles.header, this.props.style]}>
        <View style={styles.leftItem}>
          <ItemWrapperIOS color={itemsColor} item={leftItem} />
        </View>
        <View
          accessible
          accessibilityLabel={title}
          accessibilityTraits="header"
          style={styles.centerItem}
        >
          {content}
        </View>
        <View style={styles.rightItem}>
          <ItemWrapperIOS color={itemsColor} item={rightItem} />
        </View>
      </View>
    );
  }

}

class ItemWrapperIOS extends Component {
  props: {
    item?: Item;
    color?: string;
  };

  static defaultProps = {
    item: null,
    color: null,
  };

  render() {
    const { item, color } = this.props;
    if (!item) {
      return null;
    }

    let content;
    const { title, icon, layout, onPress } = item;

    if (layout !== 'icon' && title) {
      content = (
        <Text style={[styles.itemText, { color }]}>
          {title.toUpperCase()}
        </Text>
      );
    } else if (icon) {
      content = <Image source={icon} />;
    }

    return (
      <TouchableOpacity
        accessibilityLabel={title}
        accessibilityTraits="button"
        onPress={onPress}
        style={styles.itemWrapper}
      >
        {content}
      </TouchableOpacity>
    );
  }
}

const CarouselHeader = Platform.OS === 'ios' ? HeaderIOS : HeaderAndroid;
CarouselHeader.height = HEADER_HEIGHT;

export default CarouselHeader;
