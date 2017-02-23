## Exposed Components
```javascript
CarouselManager
CarouselComponent
Carousel
CarouselCard
CarouselHeader
CarouselMiniHeader
ViewPager
PageControl
```

## Props
### CarouselComponent
| Prop | Type | Default | Note |
|---|---|---|---|
| `show` | `boolean` | `null` | | |
| `onShow` | `Function` | `() => {}` | | |
| `onDismiss` | `Function` | `() => {}` | | |
| `style` | `any` | `null` | | |
| `title` | `string` | `null` | | |
| `titleStyle` | `any` | `null` | | |
| `titleContentStyle` | `any` | `null` | | |
| `subTitle` | `string` | `null` | | |
| `subTitleStyle` | `any` | `null` | | |
| `header` | `ReactElement` | `null` | | |
| `headerContentStyle` | `any` | `null` | | |
| `leftItem` | `Object` | `null` | | |
| `rightItem` | `Object` | `null` | | |
| `showPageControl` | `boolean` | `true` | | |
| `selectedIndex` | `number` | `0` | | |
| `onSelectedIndexChange` | `Function` | `() => {}` | | |
| `viewPagerStyle` | `any` | `null` | | |
| `cards` | `Array<ReactElement>` | `[]` | | |
| `carouselStyle` | `any` | `null` | | |
| `children` | `any` | `null` | | |

### Carousel
| Prop | Type | Default | Note |
|---|---|---|---|
| `style` | `any` | `null` | | |
| `title` | `string` | `null` | | |
| `titleStyle` | `any` | `null` | | |
| `titleContentStyle` | `any` | `null` | | |
| `subTitle` | `string` | `null` | | |
| `subTitleStyle` | `any` | `null` | | |
| `header` | `ReactElement` | `null` | | |
| `headerContentStyle` | `any` | `null` | | |
| `leftItem` | `Object` | `null` | | |
| `rightItem` | `Object` | `null` | | |
| `showPageControl` | `boolean` | `true` | | |
| `selectedIndex` | `number` | `0` | | |
| `onSelectedIndexChange` | `Function` | `() => {}` | | |
| `viewPagerStyle` | `any` | `null` | | |
| `cards` | `Array<ReactElement>` | `[]` | | |


### CarouselCard
| Prop | Type | Default | Note |
|---|---|---|---|
| `style` | `any` | `null` | | |
| `title` | `string` | `null` | | |
| `titleStyle` | `any` | `null` | | |
| `description` | `string` | null | | |
| `descriptionStyle` | `any` | null | | |
| `contentContainerStyle` | `any` | `null` | | |
| `actions` | `Array<ReactElement>` | `null` | | |
| `actionsStyle` | `any` | `null` | | |
| `showMiniHeader` | `boolean` | `true` | | |
| `children` | `any` | `null` | | |

### CarouselHeader
| Prop | Type | Default | Note |
|---|---|---|---|
| `style` | `any` | `null` | | |
| `title` | `string` | `null` | | |
| `leftItem` | `Item` | `null` | | |
| `rightItem` | `Item` | `null` | | |
| `extraItems` | `Array<Item>` | `null` | | |
| `foreground` | `Foreground` | `null` | | |
| `children` | `any` | null | | |

### CarouselMiniHeader
| Prop | Type | Default | Note |
|---|---|---|---|
| `style` | `any` | `null` | | |
| `children` | `any` | | | |

### ViewPager
| Prop | Type | Default | Note |
|---|---|---|---|
| `style` | `any` | `null` | | |
| `bounces` | `boolean` | `true` | | |
| `count` | `number` | | | |
| `selectedIndex` | `number` | | | |
| `onSelectedIndexChange` | `Function` | () => {} | | |
| `children` | `any` | | | |

### PageControl
| Prop | Type | Default | Note |
|---|---|---|---|
| `style` | `any` | `null` | | |
| `count` | `number` | | | |
| `selectedIndex` | `number` | | | |
