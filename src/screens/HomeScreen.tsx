import React from 'react';
import {Image, Text, View, FlatList, ActivityIndicator} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {styles} from '../theme/AppTheme';
import {usePokemonPaginated} from '../hooks/usePokemonPaginated';

export const HomeScreen = () => {
  const {simplePokemonList, isLoading, loadPokemons} = usePokemonPaginated();
  const {top} = useSafeAreaInsets();

  return (
    <View>
      <Image
        source={require('../assets/pokebola.png')}
        style={styles.pokebolaBG}
      />

      <Text style={{...styles.title, top: top + 20, ...styles.globalMargin}}>
        Pokedex
      </Text>

      <FlatList
        data={simplePokemonList}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <Image
            source={{uri: item.image}}
            style={{
              height: 50,
              width: 50,
            }}
          />
        )}
        //Infinite Scrool
        onEndReached={loadPokemons}
        onEndReachedThreshold={0.4}
        ListFooterComponent={
          <ActivityIndicator
            style={{
              height: 180,
            }}
            size={20}
            color="gray"
          />
        }
      />
    </View>
  );
};
