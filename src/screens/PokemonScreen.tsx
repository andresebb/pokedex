import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {Text, View} from 'react-native';
import {RootStackParams} from '../navigation/StackNavigation';
import {SimplePoken} from '../interfaces/PokemonInterfaces';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

export const PokemonScreen = ({navigation, route}: Props) => {
  const {SimplePokemon, color} = route.params;

  console.log(SimplePokemon.name, color);

  return (
    <View>
      <Text>Detail Screen</Text>
    </View>
  );
};
