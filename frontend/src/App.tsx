import React from 'react';
import './App.css';
import { Form } from './components/Form';
import img from './images/img.png';

function App() {
  return (
    <div className="App">
      <Form />
      <img src={img} alt="" />
    </div>
  )
}

export default App;
