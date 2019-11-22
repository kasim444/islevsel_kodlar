import React from 'react';
import {Platform, Dimensions, PixelRatio} from 'react-native';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = WIDTH / 320;

export function actuatedNormalize(size) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}
export default actuatedNormalize;


export function isIphoneX() {
  const dim = Dimensions.get('window');

  return (
    // This has to be iOS
    Platform.OS === 'ios' &&

    // Check either, iPhone X or XR
    (isIPhoneXSize(dim) || isIPhoneXrSize(dim))
  );
}

export function isIPhoneXSize(dim) {
  return dim.height == 812 || dim.width == 812;
}

export function isIPhoneXrSize(dim) {
  return dim.height == 896 || dim.width == 896;
}


export const SmallPhone = () => {
  if(WIDTH<=320)
    return true
  else
    return false
}

export const OS = () => {
  if ('android' == Platform.OS) {
    return 'android';
  }else {
    return 'ios';
  }
}


export {HEIGHT, WIDTH};
