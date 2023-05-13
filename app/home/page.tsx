"use client";
import styles from "./page.module.css";
import { ChangeEvent, useEffect, useState } from "react";
import {
  getAllPokemonAbilities,
  getAllPokemonTypes,
  getAllPokemons,
  getPokemonDetailsByName,
  getPokemonsByPagination,
} from "../api/pokedex";
import Card from "../../components/Card/Card";
import CircleButton from "../../components/Buttons/CircleButton/CircleButton";
import Link from "next/link";
import { fetchPokemonPagination } from "../api/api_to_local";

const Home = () => {
  const [pokemonsFromLocal, setPokemonsFromLocal] = useState<BasicPokemon[]>(
    []
  );
  const [shownPokemons, setShownPokemons] = useState<
    BasicPokemon[] | undefined
  >([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [maxPageNumber, setMaxPageNumber] = useState<number>(0);

  const handlePokemonsPagination = async () => {
    try {
      const result = await fetchPokemonPagination(currentPage);
      setShownPokemons(result);
    } catch (error: any) {
      console.log(error);
    }
  };

  // const handleDeletOnClick = (pokemonToDelete: BasicPokemon) => {
  //   const pokemonsAfterDelete = fetchedPokemonsArray.filter(
  //     (pokemon: BasicPokemon) => pokemon !== pokemonToDelete
  //   );
  //   localStorage.setItem("allPokemonsArray", pokemonsAfterDelete);
  //   console.log(fetchedPokemonsArray);
  // };

  const handleFirstPageButtonOnClick = () => {
    setCurrentPage(1);
  };

  const handlePreviousPageButtonOnClick = () => {
    setCurrentPage((c) => c - 1);
  };

  const handleNextPageButtonOnClick = () => {
    setCurrentPage((c) => c + 1);
  };

  const handleLastPageButtonOnClick = () => {
    setCurrentPage(maxPageNumber);
  };

  const handleSearchOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredPokemons = pokemonsFromLocal.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchValue)
    );
    if (filteredPokemons.length > 0) {
      setShownPokemons(filteredPokemons);
      setMaxPageNumber(Math.ceil(filteredPokemons?.length / 6));
    } else {
      setShownPokemons(pokemonsFromLocal);
      setMaxPageNumber(Math.ceil(pokemonsFromLocal?.length / 6));
    }
  };

  const handleFetchLocalPokemons = () => {
    const fetchedLocalPokemonsString = localStorage.getItem("allPokemonsArray");
    const fetchedPokemonsArray = fetchedLocalPokemonsString
      ? JSON.parse(fetchedLocalPokemonsString)
      : null;
    setPokemonsFromLocal(fetchedPokemonsArray);
  };

  useEffect(() => {
    handleFetchLocalPokemons();
    setMaxPageNumber(Math.ceil(pokemonsFromLocal?.length / 6));
  }, []);

  useEffect(() => {
    handlePokemonsPagination();
  }, [pokemonsFromLocal, currentPage]);

  console.log(pokemonsFromLocal.length);

  return (
    <>
      <input type="text" name="search" onChange={handleSearchOnChange} />
      <main className={styles.container}>
        <div className={styles.cardsContainer}>
          {shownPokemons?.map((shownPokemon) => {
            const id = `00${shownPokemon.id}`.slice(-3);
            return (
              <Link
                key={shownPokemon.id}
                className={styles.link}
                href={`/pokemon/${shownPokemon.name}`}
              >
                <Card id={id} pokemon={shownPokemon} />
              </Link>
            );
          })}
        </div>
        <div className={styles.paginationButtonContainer}>
          <button
            title="First Page"
            onClick={handleFirstPageButtonOnClick}
            disabled={currentPage === 1}
          >
            first
          </button>
          <button
            title="Previous Page"
            onClick={handlePreviousPageButtonOnClick}
            disabled={currentPage === 1}
          >
            perv
          </button>
          <input
            type="number"
            defaultValue={currentPage}
            value={currentPage}
            onChange={(e) => setCurrentPage(parseInt(e.target.value))}
            max={maxPageNumber}
            min={1}
          />
          <button
            title="Next Page"
            onClick={handleNextPageButtonOnClick}
            disabled={currentPage === maxPageNumber}
          >
            next
          </button>
          <button
            title="Last Page"
            onClick={handleLastPageButtonOnClick}
            disabled={currentPage === maxPageNumber}
          >
            last
          </button>
        </div>
      </main>
      <Link href="/add" className={styles.addButtonContainer}>
        <CircleButton text="+" color="green" />
      </Link>
    </>
  );
};

export default Home;
