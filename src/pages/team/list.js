import React from "react";
import {useEffect, useState} from 'react';
import css from '../../css/globals.css';
import pokemonService from '../../service/pokemon.service';
import { getImageUrl } from'./details'

const PokemonList = () =>{
    const [err, setErr] = useState([]);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        // declare the data fetching function
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const result = await pokemonService.getAll();
                const { data } = await result;
                console.log('data',data)
                setData(data);
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
    
      const onUpdate = (i) =>{
        window.location.href = '/'+i+'/edit'
        // pokemonService.get(i)
        // .then(response => {
        //   console.log(response.data);
        // })
        // .catch(e => {
        //   console.log(e);
        // });
      }

      return (
        <div>
          {/* <div className='content-goback w-28'  onClick={() => router.back()}></div> */}
    
          <div className='p-16 font-roboto text-3xl'>
            {err && <h2>{err}</h2>}
            
            {data.map(pokemon => {

              return (

                <div key={pokemon.id} className='border-2 border-gray-600 border-solid bg-white rounded-xl p-5 h-[200px] mb-2' onClick={e => onUpdate(pokemon.id)}>                       
                    <div className="flex justify-between px-8">
                        <div>
                            <span className='text-3xl'>Team:</span>
                            <h2 className=''>{pokemon.description}</h2>
                        </div>
                        <div>
                            <span className='text-gray-600'>Base Experience:</span>
                            <h2 className='text-gray-800'>{pokemon.base_experience}</h2>
                        </div>
                        {getImageUrl(pokemon.rowid)}
                        <div>
                            <span className='text-gray-600'>Type:</span><br/>
                            <h2 className='text-gray-800'>{pokemon.types}</h2>
                        </div>
                    </div>
                    <div className="flex justify-start gap-10">
                        <img className='w-32' src={pokemon.image} />
                    </div> 
                </div>
              );
            })}
            
          </div>
        </div>
      );
}

export default PokemonList;
