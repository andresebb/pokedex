import React from 'react';
import {Image, Text, View, FlatList, ActivityIndicator} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {styles} from '../theme/AppTheme';
import {usePokemonPaginated} from '../hooks/usePokemonPaginated';
import {FadeInImage} from '../components/FadeInImage';
import {PokemonCard} from '../components/PokemonCard';

export const HomeScreen = () => {
  const {simplePokemonList, isLoading, loadPokemons} = usePokemonPaginated();
  const {top} = useSafeAreaInsets();

  const header = () => {
    return (
      <Text
        style={{
          ...styles.title,
          top: top + 20,
          marginBottom: top + 20,
          ...styles.globalMargin,
        }}>
        Pokedex
      </Text>
    );
  };

  return (
    <View>
      <Image
        source={require('../assets/pokebola.png')}
        style={styles.pokebolaBG}
      />

      <View
        style={{
          alignItems: 'center',
        }}>
        <FlatList
          data={simplePokemonList}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <PokemonCard pokemon={item} />}
          numColumns={2}
          ListHeaderComponent={header}
          //Infinite Scroll
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
    </View>
  );
};
