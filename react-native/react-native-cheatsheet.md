# React Native'de karşılabilecek sorunlara çözümler

## State'timizde ki arrayde eleman var ise silen yok ise eklemek istersek.

```
  const toggleSelectedLesson = lessonId => {
    let selectedIndex = lessonContext.selectedLesson.indexOf(lessonId);
    if (selectedIndex == -1) {
      lessonContext.setSelectedLesson(oldArray => [...oldArray, lessonId]);
    } else {
      lessonContext.setSelectedLesson(
        lessonContext.selectedLesson.filter(item => item != lessonId),
      );
    }
  };
```

## Text'in uzunluğuna sınırlama getirmek istersek

```
  <Text
    numberOfLines={2}
    ellipsizeMode="tail"
    style={styles.headerTitle}
  >
    Size öncelikli olarak yardımcı olmamızı istediğiniz iki konuyu seçin.
  </Text>
```

## Farklı cihaz boyutları için dinamik pixel hesaplama

```
import {Platform, Dimensions, PixelRatio} from 'react-native';
const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = WIDTH / 320;

function actuatedNormalize(size) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}
```
