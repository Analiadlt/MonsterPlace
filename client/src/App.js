import React from 'react';
import { Route } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Home from './components/Home'
import FormRegistro from './components/FormRegistro'
import Tienda from './components/Tienda';
import './sass/app.scss'
import Nav from './components/Nav';
import Carrito from './components/Carrito';
function App() {

  return (
    <div className="App">
      
      <Route path="/Carrito" component={Carrito} />
      <Route  exact path="/" component={Home} />
      <Route  exact path="/Tienda" component={Tienda} />
      <Route path="/Registro" component={FormRegistro} />
    </div>
  );
}

export default App;
