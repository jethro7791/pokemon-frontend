import React from "react";
import {useEffect, useState} from 'react';
import css from '../../css/globals.css';
import pokemonService from '../../service/pokemon.service';

const PokemonDetail = (props) =>{
    const [err, setErr] = useState([]);
    const [data, setData] = useState([]);

    
    useEffect(() => {
        // declare the data fetching function
        const fetchData = async () => {

            try {
                const propsid = props.id
                const result = await pokemonService.get(props.id);
                const { data } = await result;
                setData(data);
              } catch (err) {
                setErr(err.message);
              } finally {
              }
        }
      
        // call the function
        fetchData()
          // make sure to catch any error
          .catch(console.error);
      }, [])

      return (
        <div>
          {/* <div className='content-goback w-28'  onClick={() => router.back()}></div> */}
    
          <div className='p-16 font-roboto text-3xl flex'>
            {err && <h2>{err}</h2>}
            {/* {names.filter(name => name.includes('J')).map(filteredName => (
    <li>
      {filteredName}
    </li>
  ))} */}
            {data.map(pokemon => {
            {/* {data.filter(item => item.types.includes('')).map(pokemon => { */}
              return (
                <div key={pokemon.idrow} className='' >                       
                    <div className="flex justify-between px-8">
                        <div className="flex justify-start">
                            <img className='w-32' src={pokemon.image} />
                        </div>
                        <div>
                            <span className='text-gray-600'>Type:</span><br/>
                            <h2 className='text-gray-800'>{pokemon.types}</h2>
                        </div>
                    </div>
                    
                </div>
              );
            })}
            
          </div>
        </div>
      );
}

export default PokemonDetail;
