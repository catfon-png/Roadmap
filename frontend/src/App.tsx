import React from 'react';
import './App.css';
import { Form } from './components/Form/Form';
// import img from './images/img.png';
import '@fontsource/public-sans';
import { Navbar } from './components/Navbar/Navbar';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Form />
      {/* <img src={img} alt="" /> */}
    </div>
  )
}

export default App;
