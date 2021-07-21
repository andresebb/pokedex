import {useEffect, useRef, useState} from 'react';
import {pokemonApi} from '../api/pokemonApi';
import {
  PokemonPaginatedResponse,
  Result,
  SimplePoken,
} from '../interfaces/PokemonInterfaces';

export const usePokemonPaginated = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePoken[]>([]);

  const nextPageUrl = useRef(
    'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0',
  );

  const loadPokemons = async () => {
    setIsLoading(true);
    const resp = await pokemonApi.get<PokemonPaginatedResponse>(
      nextPageUrl.current,
    );
    nextPageUrl.current = resp.data.next;

    mapPokemonList(resp.data.results);
  };

  //Todo este proceso para que el resultado se parezca a nuestra interface
  const mapPokemonList = (pokemonList: Result[]) => {
    const newPokemonList: SimplePoken[] = pokemonList.map(({name, url}) => {
      const urlPars = url.split('/');
      const id = urlPars[urlPars.length - 2];
      const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

      return {
        id,
        image,
        name,
      };
    });

    setSimplePokemonList([...simplePokemonList, ...newPokemonList]);
    setIsLoading(false);
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  return {
    isLoading,
    simplePokemonList,
    loadPokemons,
  };
};
