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
            types: details?.types,
            abilities: details?.abilities,
            stats: details?.stats,
          },
        };
      })
    );
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
          types: details?.types.map((type: any) => type.type.name),
        };
      })
    );
    return pokemonsWithDetails;
  } catch (error: any) {
    console.log(error);
    return undefined;
  }
};

const fetchAllPokemonTypesFromApi = async () => {
  try {
    const result = await getAllPokemonTypes();
    localStorage.setItem("allPokemonTypesArray", JSON.stringify(result));
  } catch (error: any) {
    console.log(error);
  }
};

const fetchAllPokemonAbilitiesFromApi = async () => {
  try {
    const result = await getAllPokemonAbilities();
    localStorage.setItem("allPokemonAbilitiesArray", JSON.stringify(result));
  } catch (error: any) {
    console.log(error);
  }
};

export {
  fetchAllPokemonsFromApi,
  fetchPokemonPagination,
  fetchAllPokemonTypesFromApi,
  fetchAllPokemonAbilitiesFromApi,
};
