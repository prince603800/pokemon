import { PokemonListProps } from "@/app/interfaces/pokemon/pokemon";
import Image from "next/image";
import Link from "next/link";
import React from "react";


const PokemonList = ({id, name}:PokemonListProps) => {
  return (
      <div className="m-auto flex flex-col bg-[#fafafa] w-[100%] h-[400px] rounded-[6px]">
        <div className="flex justify-center relative h-[150px] w-[100%] bg-[#ffffff] p-3 rounded-t-[6px]">
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
            alt={`poke`}
            width={100}
            height={80}
          />
        </div>

        <p className="text-left text-[#1b4056] font-mono font-bold mt-8 ml-5">{name}</p>

        <Link href={`/pages/pokemons/${id}`}><p className="text-[12px] font-mono font-normal text-[#5696bd] mt-[40%] ml-5">Details <span></span></p></Link>
      </div>
  );
};

export default PokemonList;
