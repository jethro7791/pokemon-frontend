import React from "react";
import {useEffect, useState} from 'react';
import css from '../../css/globals.css';
import pokemonService from '../../service/pokemon.service';
import Details from'./details'
import { useNavigate  } from "react-router-dom";

const PokemonList = () =>{
    const [err, setErr] = useState([]);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filterby, setFilterby] = useState('');
    const navigate = useNavigate();

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

          const getSingleCacheData = async (cacheName, url) => {

            if (typeof caches === 'undefined') return false;

            const cacheStorage = await caches.open(cacheName);

            const cachedResponse = await cacheStorage.match(url);

            console.log('resp',cachedResponse)

            // If no cache exists
            if (!cachedResponse || !cachedResponse.ok) {

              setFilterby('Fetched failed!')
            }
          
            return cachedResponse.json().then((item) => {
              setFilterby(item)
            });
          };

          getSingleCacheData('cacheFilter','http://localhost:3000');
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

      const onChangeFilter = (e) =>{
        setFilterby(e.target.value);
        const response = new Response(JSON.stringify(e.target.value));
        if ('caches' in window) {
          // Opening given cache and putting our data into it
          caches.open('cacheFilter').then((cache) => {
            cache.put('http://localhost:3000', response);
          });
        }
      }

      return (
        <div>
          <div className='content-goback w-40 pl-16 pt-3' onClick={() => navigate('/')}></div>
          <div className="flex justify-start pl-16 pt-3 font-roboto text-xl">
            <span className='pr-2'>Filter by Types:</span>
            <input className='w-[400px]' onChange={onChangeFilter}  value={filterby}></input>
          </div>
          <div className='p-16 font-roboto text-3xl'>
            {err && <h2>{err}</h2>}
            
            {/* {data.map(pokemon => { */}
            {/* {data.filter(item => item.types.includes({filterby})).map(pokemon => { */}
            {data.filter((item, index, array) => {
              const pokemonIndex = array.findIndex((b) => item.id === b.id);
              return index === pokemonIndex;
            }).filter(item => item.types.includes(filterby))
            .map((pokemon) => {
              return (

                <div key={pokemon.id} className='border-2 border-gray-600 border-solid bg-white rounded-xl p-1 h-[250px] mb-2' onClick={e => onUpdate(pokemon.id)}>                       
                    <div className="flex justify-start px-8 gap-5">
                        <div>
                            <span className='text-3xl text-gray-600'>Team:</span>
                            <span className='text-gray-800'>{pokemon.description}</span>
                        </div>
                        <div>
                            <span className='text-gray-600'>Base Experience:</span>
                            <span className='text-gray-800'>{pokemon.totExp}</span>
                        </div>
                        
                    </div>
                    <div className="flex justify-start gap-2">
                    <Details id={pokemon.id}></Details>
                    </div> 
                </div>
              );
            })}
            
          </div>
        </div>
      );
}

export default PokemonList;
