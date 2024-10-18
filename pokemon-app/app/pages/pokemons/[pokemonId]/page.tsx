import Image from "next/image";
import Link from "next/link";

const Details = () => {
  return (
    <div>
      <Link href={`/pages/pokemons/list`}>
        <span className="text-left text-[#24caab] font-mono font-bold mt-8 ml-5">
          Back
        </span>
      </Link>
      <div className="m-auto w-[400px] flex flex-col bg-[#fdc666] h-[500px] rounded-[6px]">
        <div className="flex justify-center relative h-[250px] w-[100%] bg-[#60e2c9] p-3 rounded-t-[6px]">
          <Image
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10.png"
            alt={`poke`}
            width={100}
            height={80}
          />
        </div>

        <div>
          <p>
            <span>Name: </span>Charizard
          </p>
          <p>
            <span>Name: </span>Charizard
          </p>
          <p>
            <span>Name: </span>Charizard
          </p>
          <p>
            <span>Name: </span>Charizard
          </p>
          <p>
            <span>Name: </span>Charizard
          </p>
        </div>
      </div>
    </div>
  );
};

export default Details;
