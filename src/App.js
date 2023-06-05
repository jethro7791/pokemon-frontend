import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/team/home';
import Edit from './pages/team/edit';
import Create from './pages/team/create';
import List from './pages/team/list';
import styles from "./index.css"
export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/:id/edit" element={<Edit />} />
        <Route path="/list" element={<List />} />
      </Routes>
    </div>
  );
}