import React from "react";
import {useEffect, useState} from 'react';
import css from '../../css/globals.css';
import pokemonService from '../../service/pokemon.service';
import {
    generatePath,
    useHistory,
    useParams
  } from "react-router-dom";
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

export async function getData(id){
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
  
      const results = [{"id": id,"idRow": "", "pName": pokemonName,"pExperience": pokemonExperience,"pImage": pokemonImage,"pAbilities": pokemonAbilities.toString(),"pTypes": pokemonTypes.toString()}];
  
     return {
      results
     };
}

export async function savePokemon(result){
    console.log('save', result.results[0])
    pokemonService.create(result.results[0])
    .then(response => {
        console.log('response.data', response.data);
    })
    .catch(e => {
        console.log(e);
    });
}
const PokemonList = () =>{
    const [err, setErr] = useState([]);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [teamname, setTeamname] = useState('');
    const { id } = useParams();

    useEffect(() => {
        // declare the data fetching function
        setIsLoading(true);
        const fetchData = async () => {

            try {
                const result = await pokemonService.get(id);
                const { data } = await result;
                console.log('data',data)
                setData(data);
                setTeamname(data[0].description)
              } catch (err) {
                setErr(err.message);
              } finally {
                setIsLoading(false);
              }
        }
      
        // call the function
        fetchData()
          // make sure to catch any error
          .catch(console.error);
      }, [])
    
      const onChangeTitle = (e) =>{
        setTeamname(e.target.value);
      }
      const handleClick = async () => {
        setIsLoading(true);

        try {
            const result = await getData(id);  ;//await response.json();
            
           //await setData(result);
           savePokemon(result)
        } catch (err) {
            setErr("err",err.message);
        } finally {
            setIsLoading(false);
            window.location.reload(false)
        }
    };

    const onRemove = async (e) =>{
        try {
           const result = pokemonService.delete(id);
        } catch (err) {
            setErr("err",err.message);
        } finally {
            setIsLoading(false);
            window.location.reload(false)
        }
        
    }
      return (
        <div>
          {/* <div className='content-goback w-28'  onClick={() => router.back()}></div> */}
    
          <div className='p-16 font-roboto text-3xl'>
            {err && <h2>{err}</h2>}
            <div>
                <span className=''>Team:</span>
                <input className='w-full' onChange={onChangeTitle} value={teamname}></input>
            </div>
            <div className='py-5'>
                <button className="bg-yellow-100 px-4 h-14 rounded-3xl" onClick={handleClick}>Gotta Catch 'Em All</button>
            </div>
            {data.map(pokemon => {
              return (
                <div key={pokemon.rowid} className='border-2 border-gray-600 border-solid bg-white rounded-xl p-5 h-[200px] mb-2' >                       
                    <div className="flex justify-between px-8">
                        <div className="flex justify-start">
                            <img className='w-32' src={pokemon.image} />
                        </div>
                        <div>
                            <span className='text-gray-600'>Name:</span>
                            <h2 className='text-gray-800'>{pokemon.pName}</h2>
                        </div>
                        <div className="hidden">
                            <input className='w-full' onChange={onChangeTitle} value={pokemon.description}></input>
                        </div>
                        <div className='w-40'>
                            <span className='text-gray-600'>Base Experience:</span>
                            <h2 className='text-gray-800'>{pokemon.base_experience}</h2>
                        </div>
                        <div>
                            <span className='text-gray-600'>Type:</span><br/>
                            <h2 className='text-gray-800'>{pokemon.types}</h2>
                        </div>
                    </div>
                    <div className="border-2 border-solid border-black w-40 content-center items-center justify-center rounded-3xl" onClick={() => onRemove(pokemon.rowid)}>REMOVE</div>
                </div>
              );
            })}
            
          </div>
        </div>
      );
}

export default PokemonList;
