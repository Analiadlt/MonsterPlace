import React from 'react';
import { Route } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Home from './components/Home'
import FormRegistro from './components/FormRegistro'
import './sass/app.scss'

function App() {

  return (
    <div className="App">
      <Route  exact path="/" component={Home} />
      <div className="contenedor">
      <Route path="/Registro" component={FormRegistro} />
      </div>
    </div>
  );
}

export default App;
