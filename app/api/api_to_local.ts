import {
  getAllPokemonAbilities,
  getAllPokemonTypes,
  getAllPokemons,
  getPokemonDetailsByName,
  getPokemonsByPagination,
} from "./pokedex";

const fetchAllPokemonsFromApi = async () => {
  try {
    const result = await getAllPokemons();
    const pokemonsWithDetails = await Promise.all(
      result.map(async (pokemon: DetailedPokemon) => {
        const details = await getPokemonDetailsByName(pokemon.name);
        return {
          name: details?.name,
          id: details?.id,
          details: {
            weight: details?.weight,
            height: details?.height,
            types: details?.types.map((type: any) => ({
              name: type.type.name,
            })) as Type[],
            abilities: details?.abilities.map((ability: any) => ({
              name: ability.ability.name,
            })) as Ability[],
            stats: details?.stats.map((stat: any) => ({
              base_stat: stat.base_stat,
              name: stat.stat.name,
            })) as Stat[],
          },
        };
      })
    );
    console.log(pokemonsWithDetails);
    localStorage.setItem(
      "allPokemonsArray",
      JSON.stringify(pokemonsWithDetails)
    );
  } catch (error: any) {
    console.log(error.message);
  }
};

const fetchPokemonPagination = async (page: number) => {
  try {
    const result = await getPokemonsByPagination(page);
    const pokemonsWithDetails = await Promise.all(
      result.map(async (pokemon: DetailedPokemon) => {
        const details = await getPokemonDetailsByName(pokemon.name);
        return {
          id: details?.id,
          name: details?.name,
          types: details?.types.map((type: any) => ({
            name: type.type.name,
          })) as Type[],
        };
      })
    );
    return pokemonsWithDetails;
  } catch (error: any) {
    console.log(error);
    return undefined;
  }
};

export { fetchAllPokemonsFromApi, fetchPokemonPagination };
