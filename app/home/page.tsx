"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import {
  getAllPokemonAbilities,
  getAllPokemonTypes,
  getAllPokemons,
  getPokemonDetailsByName,
  getPokemonsByPagination,
} from "../api/pokedex";
import Card from "../components/Card/Card";
import CircleButton from "../components/Buttons/CircleButton/CircleButton";
import Link from "next/link";
import { fetchPokemonPagination } from "../api/api_to_local";

const fetchedLocalPokemonsString = localStorage.getItem("allPokemonsArray");
const fetchedPokemonsArray = fetchedLocalPokemonsString
  ? JSON.parse(fetchedLocalPokemonsString)
  : null;

const Home = () => {
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

  const handleDeletOnClick = (pokemonToDelete: BasicPokemon) => {
    // const pokemonsAfterDelete = fetchedPokemonsArray.filter(
    //   (pokemon: BasicPokemon) => pokemon !== pokemonToDelete
    // );
    // localStorage.setItem("allPokemonsArray", pokemonsAfterDelete);
    // console.log(fetchedPokemonsArray);
  };

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

  useEffect(() => {
    setMaxPageNumber(Math.ceil(fetchedPokemonsArray?.length / 6));
  }, []);

  useEffect(() => {
    handlePokemonsPagination();
  }, [currentPage]);

  return (
    <>
      <main className={styles.container}>
        <div className={styles.cardsContainer}>
          {shownPokemons?.map((shownPokemon) => {
            const id = `00${shownPokemon.id}`.slice(-3);
            return (
              <Card
                key={shownPokemon.id}
                id={id}
                pokemon={shownPokemon}
                handleDelete={() => handleDeletOnClick(shownPokemon)}
              />
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
