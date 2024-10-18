"use client";

import { useEffect, useRef, useState } from "react";

import { getApiUrl } from "@/app/helpers/functions";
import { getRequest } from "@/app/config/http.service";
import { Pokemon } from "@/app/interfaces/pokemon/pokemon";
import SearchInput from "@/app/components/ui/input/input";
import Select from "@/app/components/ui/select/select";
import PokemonList from "./components/pokemons";
import InfiniteScroll from "react-infinite-scroll-component";
import { searchOptions } from "@/app/helpers/searchOptions";

const Pokemons = () => {
  const [search, setSearch] = useState<string>("");

  const [pokeList, setPokeList] = useState<Pokemon[]>([]);
  const [pokeFilteredList, setPokeFilteredList] = useState<Pokemon[]>([]);

  const total = useRef(0);
  const page = useRef(1);

  const [selectedPokeType, setSelectedPokeType] = useState("");
  const [pokeTypeList, setPokeTypeList] = useState([]);

  const onSelectPokemonTypeChange = (e) => {
    page.current = 1;
    setSelectedPokeType(e.target.value);
    getPokemonDataByType(e.target.value);
  }

  const searchPokemons = (searchQuery:string) => {
    
   
    const filteredList = searchOptions(pokeList, searchQuery);
    setPokeFilteredList(filteredList);
    setSearch(searchQuery);
  }

  const getPokemonData = async () => {
    try {
      const response: any = await getRequest(getApiUrl("GET_POKEMON", {
        page: `${page.current}`,
        type: selectedPokeType,
        search: search,
      }), true);

      if (page.current === 1) 
        {
          setPokeFilteredList(response.results);
          setPokeList(response.results);
        }
      else { 
        setPokeFilteredList((prevData: Pokemon[]) => [...prevData, ...response.results]);
        setPokeList((prevData: Pokemon[]) => [...prevData, ...response.results]);
      }

      total.current = response.count;
    } catch (error) {
      console.log("errors", error);
    }
  };

  const getPokemonDataByType = async (type:string) => {
    try {
      const response: { pokemon: Pokemon[]} = await getRequest(getApiUrl("GET_POKEMON_BY_TYPE", {
        typeName: type,
        page: `${page.current}`
      }), true);

      if (page.current === 1) 
        {
          const data = response.pokemon.map((pokedata:any) => { return pokedata.pokemon } )
          setPokeFilteredList(data);
          setPokeList(data);
        }
     

      total.current = response.pokemon.length;
    } catch (error) {
      console.log("errors", error);
    }
  };

  const getPokemonTypes = async () => {
    try {
      const response: any = await getRequest(getApiUrl("GET_TYPES", {
        page: `${page.current}`,
       
      }), true);

      const list = response.results.map((type) => {
        return {...type, value: type.name}
      });

      setPokeTypeList(list) 

    } catch (error) {
      console.log("errors", error);
    }
  };

  useEffect(() => {
    //getPokemonData();
    getPokemonTypes();
  }, []);

  useEffect(() => {
    page.current = 1;
    getPokemonData();
  },[selectedPokeType])

  const onScrollToBottom = async () => {
    try {
      if (pokeFilteredList.length < total.current) {
        page.current = page.current + 1;
        getPokemonData();
      }
    } catch (error) {
      console.log(error);
    }
  };

 
  return (
    <>
      <div className="flex flex-col w-[40%] pl-3">
        <Select
          options={pokeTypeList}
          name={selectedPokeType}
          placeholder="Select"
          className="!w-[60%] mt-3 mb-1"
          onChange={onSelectPokemonTypeChange}
        />
        <SearchInput onChange={(e) => searchPokemons(e)} value={search} />
      </div>

      <InfiniteScroll
        dataLength={pokeFilteredList.length}
        next={onScrollToBottom}
        hasMore={pokeFilteredList.length < total.current}
        loader={<></>}
        endMessage={<></>}
        scrollableTarget="parentScrollDiv"
      >
          <div className="grid md:grid-cols-4 grid-cols-1 gap-3 mt-8 pl-5 pr-5 overflow-y-scroll h-[calc(100vh-82px)]  sidebarScroll" id="parentScrollDiv">
            {pokeFilteredList.map((pokemon: { name: string; url: string }, index:number) => (
              <PokemonList
                key={index}
                name={pokemon.name}
                id={pokemon.url.split("/").filter(Boolean).pop() || ""}
              />
            ))}
          </div>
      </InfiniteScroll>
    </>
  );
};

export default Pokemons;
