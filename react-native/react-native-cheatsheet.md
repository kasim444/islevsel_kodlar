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

## React navigation hooks yardımı ile herhangi bir componentten prop aktarmadan navigasyon istersek.

```
import {useNavigation} from 'react-navigation-hooks';
const {navigate} = useNavigation();
<LinkButton
  title="Giriş Yap"
  onPress={() => {
    navigate('Login');
  }}
/>
```

## Scroll view içerisindeki elemanların ekranın sonunda gözükmeme problemini gidermek istersek.

```
<ScrollView contentContainerStyle={{paddingBottom: 60}} >
    {this.renderItems()}
</ScrollView>
```

## Farklı platforma göre özel style ya da prop yazmak istersek

```
  import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ActivityIndicator,
    Alert,
    Dimensions,
    Platform
  } from 'react-native';

  // datepicker style different os platform
  const datePickerStyle = Platform.select({
    android: {
      marginRight: 'auto',
      marginLeft:15
    },
    ios: {
      width: SmallPhone() ? 150 : 200,
      alignSelf: 'flex-start'
    },
  });

  <DatePicker
    ref={datePickerRef}
    showIcon={false}
    locale="tr"
    style={datePickerStyle}
    date={date}
    mode="date"
    placeholder="select date"
    format="DD-MM-YYYY"
    minDate="01-01-1900"
    maxDate="01-01-2100"
    confirmBtnText="Kaydet"
    cancelBtnText="İptal"
    customStyles={{
      // dateIcon: {
      //   display:"none"
      // },
      dateInput: {
        borderWidth: 0,
        minHeight: 40,
        marginLeft: 0,
      },
      dateText: {
        color: Colors.greyTextColor,
        marginRight: 'auto',
        fontSize: General.fontSizeMd,
        textAlign: 'left',
        // marginLeft: 20,
      },
    }}
    onDateChange={date => {
      setDate(date);
      setFieldValue('birthday', date);
    }}
  />
```

## Eğer uygulama herhangi bir nedenden dolayı çökerse uygulanacak adımlar
````
If you don't have cocoa pods installed you need to sudo gem install cocoapods

cd /ios
run pod install
cd ..
delete build folder
run react-native run-ios
if error persists,

delete build folder again
open the /ios folder in x-code
navigate File -> Project Settings -> Build System -> change (Shared workspace settings and Per-User workspace settings): Build System -> Legacy Build System
````

## Eğer uygulama Invariant Violation: Module AppRegistry is not a registered callabel module (calling runApplication) nedenden dolayı çökerse uygulanacak adımlar
````
  watchman watch-del-all, and react-native start --reset-cache and then react-native run-ios
````


## Bir cihazın küçük boyutta olup olmadığını anlamak için

```
// src/common/style.js

import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const SmallPhone = () => {
  if(width<=320)
     return true
  else
     return false
}

// in Component style import the common style file.

import { SmallPhone } from '../../common/style';
...
...
const styles =  StyleSheet.create({
  headerLabel: {
    fontSize: SmallPhone() ? 14:26,
  }
});

```

# Modal box üzerinde iken input focus olunca keyboard un altında kalma problemi olduğu zaman.

```
  import React, {useEffect, useState} from 'react';
  import {View, StyleSheet, Dimensions, Keyboard} from 'react-native';
  import {Colors} from '../../const/Styles';
  import Modal, {ModalContent, SlideAnimation} from 'react-native-modals';
  const {height: HEIGHT} = Dimensions.get('window');

  const SelectPickerModal = ({children, ...props}) => {
    const [keyboardSpace, setKeyboardSpace] = useState(0);
    useEffect(() => {
      //for get keyboard height
      Keyboard.addListener('keyboardDidShow', frames => {
        if (!frames.endCoordinates) return;
        setKeyboardSpace(frames.endCoordinates.height);
      });
      Keyboard.addListener('keyboardDidHide', frames => {
        setKeyboardSpace(0);
      });
    }, []);
    return (
      <Modal.BottomModal
        {...props}
        modalStyle={{
          top: keyboardSpace ? HEIGHT * 0.1 - keyboardSpace : 0,
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalInnerContainer}>
            <ModalContent style={styles.modalContent}>{children}</ModalContent>
          </View>
        </View>
      </Modal.BottomModal>
    );
  };

  export default SelectPickerModal;

  const styles = StyleSheet.create({
    modalContent: {
      justifyContent: 'space-around',
    },
  });

```

## react-native-snap-carousel veya flatlist'de renderitem metodu içerisinde herhangi bir şekilde state in yenilendiği durumda component rerender olmuyor ise

```
  Use extraData: to refresh your <FlatList> ... data={this.props.searchBookResults} extraData={this.state.refresh} onPress={()={this.setState({ refresh: !refresh})}
```


## Custom font kullanmak istersek

```
  https://medium.com/@mehran.khan/ultimate-guide-to-use-custom-fonts-in-react-native-77fcdf859cf4
```

## Image'e overlay background'a verme

```
  <View>
    <Image source={require('./assets/climbing_mountain.jpeg')} style=  {StyleSheet.absoluteFillObject}} resizeMode='cover'>
      <Text>Hello</Text>
    </Image>
    <View style={styles.overlay} />
  </View>
  const styles = StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.5)'
    }
  })

  absoluteFillObject is the same as

  {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
  }
```


## React native navigation'ı route dışarısındaki herhangi bir yerde de kullanabilmek için

````
  // route component
  const Switch = createAppContainer(MainNavigator);
  function AppRouter() {
    return (
      <Switch
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }

  // navigationService.js
  import {NavigationActions} from 'react-navigation';

  let _navigator;

  function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
  }

  function navigate(routeName, params) {
    _navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
      }),
    );
  }

  export default {
    navigate,
    setTopLevelNavigator,
  };

  // anywhere component
  import NavigatorService from './services/navigator';

  NavigatorService.navigate('Home');
````
