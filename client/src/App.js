import React from 'react';
import { Route } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Home from './components/Home'
import FormRegistro from './components/FormRegistro'
import Tienda from './components/Tienda';
import './sass/app.scss'
import TiendaNFT from './components/TiendaNFT';
import crearNFT from './components/CrearNFT';
import tableroNFT from './components/TableroNFT';
import misNFT from './components/MisNFT';
import Carrito from './components/Carrito';
import ForLogin from './components/ForLogin';
import PassReset from './components/PassReset';
import userDetail from './components/userDetail';
import MyPage from './firebase/storage/MyPage';
function App() {

  return (
    <div className="App">
      <Route path="/storage" component={MyPage}/>
      <Route path="/Carrito" component={Carrito} />
      <Route  exact path="/" component={Home} />
      <Route  exact path="/Tienda" component={Tienda} />
      <Route  exact path="/TiendaNFT" component={TiendaNFT} />
      <Route  exact path="/CrearNFT" component={crearNFT} />
      <Route  exact path="/TableroNFT" component={tableroNFT} />
      <Route  exact path="/MisNFT" component={misNFT} />
      <Route path="/Registro" component={FormRegistro} />
      <Route path="/Login" component={ForLogin} />
      <Route path="/PassReset" component={PassReset} />
      <Route path="/Detail/:id" component={userDetail} />
    </div>
  );
}

export default App;
