import React from 'react'; // Ensure React is imported
import logo from './logo.svg';
import './App.css';

import NavBarMain from './components/navbarMain'; 

import Editprofile from './components/Editprofile';


function App() {
  return (
    <>
    <NavBarMain />
       
       <Editprofile/>
    
    </>
  );
}

export default App;