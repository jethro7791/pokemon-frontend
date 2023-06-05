import React from "react";
// importing Link from react-router-dom to navigate to 
// different end points.
import { Link } from "react-router-dom";
import css from '../../css/globals.css';


const Home = () => {
  return (
    <div className="grid h-screen place-items-center">
        <div className="flex flex-col items-center justify-center w-full h-full gap-4">
            <button className='bg-yellow-100 w-52 h-20 rounded-3xl'>
            <Link to="/create">
                <span className='text-3xl font-roboto'>Create Team</span>
                </Link>
            </button>
            <button className='bg-yellow-100 w-52 h-20 rounded-3xl'>
            <Link to="/list">
                <span className='text-3xl font-roboto'>Team Listing</span>
                </Link>
            </button>
        </div>
      {/* <h1>Home Page</h1>
      <br />
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/create">Create</Link>
        </li>
        <li>
          <Link to="/:id/edit">Edit</Link>
        </li>
        <li>
          <Link to="/list">List</Link>
        </li>
      </ul> */}
    </div>
  );
};
  
export default Home;