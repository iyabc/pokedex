"use client";
import styles from "./page.module.css";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
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
  const [pokemonsFromLocal, setPokemonsFromLocal] = useState<DetailedPokemon[]>([]);
  const [shownPokemons, setShownPokemons] = useState<DetailedPokemon[] | undefined>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [maxPageNumber, setMaxPageNumber] = useState<number>(0);

  const handlePokemonsPagination = () => {
    console.log(typeof pokemonsFromLocal);
    const startIndex = (currentPage - 1) * 6;
    const endIndex = startIndex + 6;
    const slicedPokemons = pokemonsFromLocal?.slice(startIndex, endIndex);
    setShownPokemons(slicedPokemons);
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

  const handleSearchOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredPokemons = pokemonsFromLocal.filter((pokemon) => pokemon.name.toLowerCase().includes(searchValue));
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
    const fetchedPokemonsArray = fetchedLocalPokemonsString ? JSON.parse(fetchedLocalPokemonsString) : null;
    setPokemonsFromLocal(fetchedPokemonsArray);
  };

  useEffect(() => {
    handleFetchLocalPokemons();
  }, []);

  useEffect(() => {
    setMaxPageNumber(Math.ceil(pokemonsFromLocal?.length / 6));
    handlePokemonsPagination();
  }, [pokemonsFromLocal, currentPage, handlePokemonsPagination]);

  return (
    <>
      <div className={styles.container}>
        <input
          type="text"
          name="search"
          onChange={handleSearchOnChange}
        />
      </div>
      <main className={styles.container}>
        <div className={styles.cardsContainer}>
          {shownPokemons
            ?.sort((a, b) => a.id - b.id)
            .map((shownPokemon) => {
              return (
                <Link
                  key={shownPokemon.id}
                  className={styles.link}
                  href={`/pokemon/${shownPokemon.id}`}
                  draggable={false}>
                  <Card pokemon={shownPokemon} />
                </Link>
              );
            })}
        </div>
        <div className={styles.paginationButtonContainer}>
          <button
            title="First Page"
            onClick={handleFirstPageButtonOnClick}
            disabled={currentPage === 1}>
            first
          </button>
          <button
            title="Previous Page"
            onClick={handlePreviousPageButtonOnClick}
            disabled={currentPage === 1}>
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
            disabled={currentPage === maxPageNumber}>
            next
          </button>
          <button
            title="Last Page"
            onClick={handleLastPageButtonOnClick}
            disabled={currentPage === maxPageNumber}>
            last
          </button>
        </div>
      </main>
      <Link
        href="/add"
        className={styles.addButtonContainer}>
        <CircleButton
          text="+"
          color="green"
        />
      </Link>
    </>
  );
};

export default Home;
