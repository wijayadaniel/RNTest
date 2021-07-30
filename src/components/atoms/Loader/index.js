import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {common} from '../../../helpers/common';

const Loader = ({size}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}>
      <ActivityIndicator animating={true} color="blue" size={size} />
    </View>
  );
};

Loader.defaultProps = {
  size: 'large',
};

export default Loader;
