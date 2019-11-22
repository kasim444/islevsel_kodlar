import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
import {Colors, General} from '../const/Styles';
import actuatedNormalize from '../const/UI';
const DividerWithText = () => {
  return (
    <View style={styles.divider}>
      <View style={styles.hrLine} />
      <Text style={styles.dividerText}>YA DA</Text>
      <View style={styles.hrLine} />
    </View>
  );
};

export default DividerWithText;

const styles = StyleSheet.create({
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: actuatedNormalize(16),
  },
  hrLine: {
    width: width / 3,
    backgroundColor: Colors.greyBorderColor,
    height: 1,
  },
  dividerText: {
    color: Colors.greyButtonBackgroundColor,
    textAlign: 'center',
    width: width / 8,
    fontSize: General.fontSizeSm,
  },
});
