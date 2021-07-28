import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  FlatList,
  Text,
  Dimensions,
  Platform,
} from 'react-native';
import {styles as globalStyle} from '../theme/AppTheme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Loading} from '../components/Loading';
import {PokemonCard} from '../components/PokemonCard';
import {SearchInput} from '../components/SearchInput';
import {usePokemonSearch} from '../hooks/usePokemonSearch';
import {SimplePoken} from '../interfaces/PokemonInterfaces';

const screenWidth = Dimensions.get('window').width;

export const SearchScreen = () => {
  const {isFetching, simplePokemonList} = usePokemonSearch();
  const [pokemonFiltered, setPokemonFiltered] = useState<SimplePoken[]>([]);
  const [term, setTerm] = useState('');
  const {top} = useSafeAreaInsets();

  useEffect(() => {
    if (term.length === 0) {
      return setPokemonFiltered([]);
    }

    console.log(isNaN(Number(term)));

    if (isNaN(Number(term))) {
      setPokemonFiltered(
        simplePokemonList.filter(poke =>
          poke.name.toLocaleLowerCase().includes(term.toLocaleLowerCase()),
        ),
      );
    } else {
      const pokemonById = simplePokemonList.find(poke => poke.id === term);
      setPokemonFiltered(pokemonById ? [pokemonById] : []);
    }
  }, [term]);

  const header = () => {
    return (
      <Text
        style={{
          ...globalStyle.title,
          ...globalStyle.globalMargin,
          marginBottom: top + 20,
          marginTop: Platform.OS === 'ios' ? top + 60 : top + 80,
        }}>
        {term}
      </Text>
    );
  };

  if (isFetching) {
    return <Loading />;
  }

  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 12,
      }}>
      <SearchInput
        onDebounce={value => setTerm(value)}
        style={{
          position: 'absolute',
          zIndex: 999,
          width: screenWidth - 40,
          top: Platform.OS === 'ios' ? top : top + 20,
        }}
      />
      <FlatList
        data={pokemonFiltered}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <PokemonCard pokemon={item} />}
        numColumns={2}
        ListHeaderComponent={header}
      />
    </View>
  );
};
