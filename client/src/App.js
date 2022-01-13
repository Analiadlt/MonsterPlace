import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Home from './components/Home'
import FormRegistro from './components/FormRegistro'
import Tienda from './components/Tienda';
import './sass/app.scss'
import Nav from './components/Nav';
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
          console.log('authUser',authUser.email)
          if (authUser && logueado.length >4) {
            dispatch(getUserLogin(authUser.email))
              console.log('hola');
          }})}},[])



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
          <Route path="/Detail/:id" component={userDetail} />
          <Route path="/chat" component={Chat} />
          <Route path="/juego" component={Juego} />

        </div>
      );
    }

    export default App;
