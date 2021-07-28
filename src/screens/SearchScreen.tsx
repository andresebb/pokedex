import React from 'react';
import {View} from 'react-native';
import {SearchInput} from '../components/SearchInput';

export const SearchScreen = () => {
  return (
    <View
      style={{
        top: 20,
        flex: 1,
        marginHorizontal: 12,
      }}>
      <SearchInput />
    </View>
  );
};
