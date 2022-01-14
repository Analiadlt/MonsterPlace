import React, { useEffect } from 'react';
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
import Juego from './components/juego/interface';
import userDetail from './components/userDetail';
import Chat from './components/Chat';
import MyPage from './firebase/storage/MyPage';
import MyAuthPage from './firebase/auth/MyAuthPage';
import { useSelector, useDispatch } from 'react-redux';
import { app } from "./firebase/firebase";
import { getUserLogin } from './redux/actions';


function App() {
  const logueado = useSelector(state => state.users)
  const dispatch = useDispatch()

    useEffect(() => {

      if (app) {
        app.auth().onAuthStateChanged((authUser) => {

          if (authUser && logueado.length >5) {
            dispatch(getUserLogin(authUser.email))
                       }})}},[logueado])
                    


      return (
        <div className="App">
          <Route path="/storage" component={MyPage} />
          <Route path="/auth" component={MyAuthPage} />
          <Route path="/Carrito" component={Carrito} />
          <Route exact path="/" component={Home} />
          <Route exact path="/Tienda" component={Tienda} />
          <Route path="/Registro" component={FormRegistro} />
          <Route path="/Login" component={ForLogin} />
          <Route path="/PassReset" component={PassReset} />
          <Route path="/Detail/" component={userDetail} />
          <Route path="/chat" component={Chat} />
          <Route path="/juego" component={Juego} />
          <Route  exact path="/TiendaNFT" component={TiendaNFT} />
          <Route  exact path="/CrearNFT" component={crearNFT} />
          <Route  exact path="/TableroNFT" component={tableroNFT} />
          <Route  exact path="/MisNFT" component={misNFT} />

        </div>
      );
    }



    export default App;

