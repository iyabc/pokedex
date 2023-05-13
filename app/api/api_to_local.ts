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
        // console.log(details);
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
            stats: {
              hp:
                details.stats?.find((stat: any) => {
                  return stat.stat.name === "hp";
                })?.base_stat || null,
              attack:
                details.stats?.find((stat: any) => {
                  return stat.stat.name === "attack";
                })?.base_stat || null,
              defense:
                details.stats?.find((stat: any) => {
                  return stat.stat.name === "defense";
                })?.base_stat || null,
              specialAttack:
                details.stats?.find((stat: any) => {
                  return stat.stat.name === "special-attack";
                })?.base_stat || null,
              specialDefense:
                details.stats?.find((stat: any) => {
                  return stat.stat.name === "special-defense";
                })?.base_stat || null,
              speed:
                details.stats?.find((stat: any) => {
                  return stat.stat.name === "speed";
                })?.base_stat || null,
              // accuracy:
              //   details.stats?.find((stat: any) => {
              //     return stat.stat.name === "accuracy";
              //   })?.base_stat || null,
              // evasion:
              //   details.stats?.find((stat: any) => {
              //     return stat.stat.name === "evasion";
              //   })?.base_stat || null,
            },
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
