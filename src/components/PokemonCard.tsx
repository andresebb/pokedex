import React, {useState, useEffect} from 'react';
import ImageColors from 'react-native-image-colors';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {SimplePoken} from '../interfaces/PokemonInterfaces';
import {FadeInImage} from './FadeInImage';
import {useRef} from 'react';
import {useNavigation} from '@react-navigation/native';

interface Props {
  pokemon: SimplePoken;
}

const windowWidth = Dimensions.get('window').width;

export const PokemonCard = ({pokemon}: Props) => {
  const [bgColor, setBgColor] = useState('grey');
  const isMounted = useRef(true);
  const navigator = useNavigation();

  const getColors = async () => {
    //Evitar que pase el warning con el estado.
    if (!isMounted.current) return;

    const colors = await ImageColors.getColors(pokemon.image, {
      fallback: 'grey',
    });

    colors.platform === 'android'
      ? setBgColor(colors.dominant || 'grey')
      : setBgColor(colors.background || 'grey');
  };

  useEffect(() => {
    getColors();

    //Este funcion se dispara cuando el componente se va a desmontar
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <TouchableOpacity
      onPress={() =>
        navigator.navigate('PokemonScreen', {
          SimplePokemon: pokemon,
          color: bgColor,
        })
      }>
      <View
        style={{
          ...styles.cardContainer,
          width: windowWidth * 0.4,
          backgroundColor: bgColor,
        }}>
        {/* Nombre del pokemon y ID */}
        <View>
          <Text style={styles.name}>
            {pokemon.name}
            {'\n#' + pokemon.id}
          </Text>
        </View>

        <View style={styles.pokebolaContainer}>
          <Image
            source={require('../assets/pokebola-blanca.png')}
            style={styles.pokebola}
          />
        </View>

        <FadeInImage uri={pokemon.image} style={styles.pokemonImage} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    // backgroundColor: 'grey',
    height: 120,
    width: 160,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top: 20,
    left: 10,
  },
  pokebola: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -25,
    bottom: -25,
  },
  pokemonImage: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -8,
    bottom: -5,
  },
  pokebolaContainer: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    overflow: 'hidden',
    opacity: 0.5,
  },
});
