import React from "react";
import {useState} from 'react';
import css from '../../css/globals.css';
import { useNavigate  } from "react-router-dom";
import pokemonService from '../../service/pokemon.service';

  
async function getPokemonData(url) {
  const res = await fetch(url)
  .then((data) => {
    return data;
  });
  
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  
  return res.json();
}

export async function getData(){
  const alldata = await getPokemonData('https://pokeapi.co/api/v2/pokemon/?limit=1300');
   
	const [pokemon] = await Promise.all([alldata]);
	var random = await pokemon.results[Math.floor(Math.random() * pokemon.results.length)];
	const pokemonName = random.name;

	const dataPokemon = await getPokemonData(random.url);
	const [PokemonData] = await Promise.all([dataPokemon]);

	const pokemonExperience = PokemonData.base_experience;
	const pokemonImage = PokemonData.sprites.front_default;
  const pokemonAbilities = PokemonData.abilities.map(abilities => {
    return abilities.ability.name.toString();
  });
  const pokemonTypes = PokemonData.types.map(type => {
    return type.type.name.toString();
  });

	const results = [{"pID": "001","id": "","pName": pokemonName,"pExperience": pokemonExperience,"pImage": pokemonImage,"pAbilities": pokemonAbilities.toString(),"pTypes": pokemonTypes.toString()}];

   return {
    results
   };
}

const PokemonSel = () => {
    const [data, setData] = useState({results: []});
    const [teamname, setTeamname] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');
    const navigate = useNavigate();
//   const router = useRouter()

    const handleClick = async () => {
        setIsLoading(true);

        try {
            const result = await getData();  ;//await response.json();
            
            setData(result);
        } catch (err) {
            setErr("err",err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const onChangeTitle = (e) =>{
    setTeamname(e.target.value);
    }

    const onSubmit = () =>{

        const result = data.results.map((o) => ({
            ...o,
            pTeamname: teamname
        }));

        pokemonService.create(result[0])
        .then(response => {
            navigate('/list')
            //window.location.href = './edit'
        })
        .catch(e => {
            console.log(e);
        });
    }

  return (
    <div>
      <div className='content-goback w-40 pl-16 pt-3 cursor-pointer' onClick={() => navigate('/')}></div>

      <div className='p-16 font-roboto text-3xl'>
        {err && <h2>{err}</h2>}
        <div>
          <span className=''>Team:</span>
          <input className='w-full' onChange={onChangeTitle} value={teamname}></input>
        </div>
        <div className='py-5'>
          <button className="bg-yellow-100 px-4 h-14 rounded-3xl cursor-pointer" onClick={handleClick}>Gotta Catch 'Em All</button>
        </div>
        
      <div className='border-2 border-gray-600 border-solid bg-white rounded-xl p-1 min-h-[250px]'>  

        {isLoading && <h2>Loading...</h2>}
        {data.results.map(pokemon => {
          return (
            <div key={pokemon.pID} className="flex pt-6">
              <div className="flex-initial w-56 pl-6">
                <div className="h-44 w-40 border-4 border-gray-800 border-solid flex justify-center items-center">
                  <img className='w-32' src={pokemon.pImage} />
                </div>
              </div>
              <div className="flex justify-between gap-10">
                <div>
                  <span className='text-gray-600'>Name:</span>
                  <h2 className='text-gray-800'>{pokemon.pName}</h2>
                </div>
                <div>
                  <span className='text-gray-600'>Base Experience:</span>
                  <h2 className='text-gray-800'>{pokemon.pExperience}</h2>
                </div>
                <div>
                  <span className='text-gray-600'>Abilities:</span>
                  <h2 className='text-gray-800'>{pokemon.pAbilities}</h2>
                </div>
                <div>
                  <span className='text-gray-600'>Types:</span>
                  <h2 className='text-gray-800'>{pokemon.pTypes}</h2>
                </div>
                {/* <div>
                  <span className='text-gray-600'>Type:</span>
                  <ul className='list-disc pl-8'>
                  {pokemon.pTypes.map(types => {
                  return (
                    <li className='text-gray-800' key={types.slot}>{types.type.name}</li>
                  );
                  })}
                  </ul>
                </div> */}
              </div>
            </div>
          );
        })}
        </div>
        <div className='py-5'>
          <button className="bg-yellow-100 px-4 h-14 rounded-3xl text-3xl cursor-pointer" onClick={e => onSubmit()} >SAVE</button>
        </div>
      </div>
    </div>
  );
};


export default PokemonSel;