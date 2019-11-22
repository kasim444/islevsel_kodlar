import styled from 'styled-components/native';
import actuatedNormalize from './UI';
const Colors = {
  light: 'white',
  dark: 'black',
  greyBackgroundColor: '#eff0f6',
  dropdownBackgroundColor: '#c0c4d5',
  greyTextColor: '#8c8f9c',
  greyBorderColor: '#d9dce8',
  overlayBackground: '#383d5f63',
  greyButtonBackgroundColor: '#9598a9',
  orangeColor: 'rgb(254, 156, 94)',
  lightOrangeColor: '#ffbf45',
  red: '#F77777',
  tourquise : '#09C199',
  blue: '#6155CC',
  mainTextColor: '#354052'
};
const General = {
  fontSizeSm: 14,
  fontSizeMd: 17,
  fontSizeLg: 20,
  borderRadius: 12,
  containerMargin: '90%',
};

const GeneralStyles = {
  textCenter: {
    textAlign: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
  borderBottom: {
    borderColor: Colors.greyBorderColor,
    borderBottomWidth: 1,
  },
};

const Safe = styled.SafeAreaView`
  flex-grow: 1;
`;
const Container = styled.View`
  flex: 1 0 auto;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const SwiperContainer = styled.View`
  flex-grow: 1;
  background-color: #000;
`;

const SwiperItemContainer = styled.View`
  flex-grow: 1;
  background-color: #fff;
  justify-content: space-around;
`;

const OnboardingContainer = styled.View`
  flex: 1 0 auto;
`;

const ProfilingContainer = styled.View`
  flex: 1 0 auto;
  flex-direction: column;
  justify-content: space-around;
`;
const DescriptionContainer = styled.View`
  width: 100%;
  padding-left: 60px;
  padding-right: 60px;
  align-items: center;
`;
const DescriptionTitle = styled.Text`
  font-weight: bold;
  font-size: ${General.fontSizeLg};
  color: ${Colors.greyTextColor};
  margin-bottom: 10;
`;
const DescriptionText = styled.Text`
  font-size: ${General.fontSizeMd};
  color: ${Colors.greyTextColor};
  margin-bottom: 10;
  text-align: center;
`;
const DescriptionImage = styled.Image`
  width: ${actuatedNormalize(200)};
  margin-bottom: ${actuatedNormalize(50)};
  margin-top: 30px;
`;
const Form = styled.View`
  background-color: ${Colors.greyBackgroundColor};
  border-color: ${Colors.greyBackgroundColor};
  border-width: 2;
  border-radius: ${General.borderRadius};
  width: ${General.containerMargin};
  margin: 0 auto;
  padding: 10px;
`;

export {
  Safe,
  Container,
  ProfilingContainer,
  OnboardingContainer,
  Colors,
  General,
  DescriptionContainer,
  DescriptionImage,
  DescriptionTitle,
  DescriptionText,
  Form,
  GeneralStyles,
  SwiperContainer,
  SwiperItemContainer,
};
