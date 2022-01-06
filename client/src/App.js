import React from 'react';
import { Route } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Home from './components/Home'
import FormRegistro from './components/FormRegistro'
import Tienda from './components/Tienda';
import './sass/app.scss'

function App() {

  return (
    <div className="App">
      <Route  exact path="/" component={Home} />
      <Route  exact path="/Tienda" component={Tienda} />
      <div className="contenedoor">
      <Route path="/Registro" component={FormRegistro} />
      </div>
    </div>
  );
}

export default App;
