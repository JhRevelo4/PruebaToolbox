import React from 'react';
import { View } from 'react-native';

// Mock para imports .svg en tests (react-native-svg-transformer)
const SvgMock = (props) => <View testID="svg-mock" {...props} />;
export default SvgMock;
