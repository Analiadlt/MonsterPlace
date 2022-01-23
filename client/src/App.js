import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Home from "./components/Home";
import FormRegistro from "./components/FormRegistro";
import Tienda from "./components/Tienda";
import "./sass/app.scss";
import TiendaNFT from "./components/NFT/TiendaNFT";
import crearNFT from "./components/NFT/CrearNFT";
import tableroNFT from "./components/NFT/TableroNFT";
import misNFT from "./components/NFT/MisNFT";
import Carrito from "./components/Carrito";
import ForLogin from "./components/ForLogin";
import PassReset from "./components/PassReset";
import Juego from "./components/juego/interface";
import userDetail from "./components/profile/userDetail";
import Chat from "./components/Chat";
import MyPage from "./firebase/storage/MyPage";
import MyAuthPage from "./firebase/auth/MyAuthPage";
import Intermedio from "./components/juego/intermedio";
// import Chatear from './components/chat/chatear';
import ChatApp from "./components/chat/index";
import NavCheto from "./components/NavCheto";
import Compra from "./components/Compra";
import { useSelector, useDispatch } from "react-redux";
import { app } from "./firebase/firebase";
import LoginMetamask from "./components/NFT/PaginaLoginMetamask.jsx";
import { getUserLogin, pagar, PAGAR } from './redux/actions';
import Comprar from './components/compra/ordenCompra';
import GanadorJuego from './components/juego/GanadorJuego';
import BotonPagar from './components/BotonPagar';
import DetalleCompra from './components/detalleCompra';
import CartaFondo from './components/juego/FondoCarta';



function App() {
  const logueado = useSelector((state) => state.users);
  const dispatch = useDispatch();
  let cambiarLogeo = async () => {
    try {
      if (app) {
        await app.auth().signOut();

        //   alert("Successfully signed out!");
      }
    } catch (error) {
      console.log("error", error);
    }

  };
    useEffect(() => {

      if (app) {
        app.auth().onAuthStateChanged((authUser) => {

          if (authUser && logueado.length >5 && authUser.emailVerified === true) {
            dispatch(getUserLogin(authUser.email))
          }
          })}},[dispatch, logueado])


      return (
        <div className="App">
          <Route path="/ganador" component={GanadorJuego} />
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
          <Route path="/juego" component={CartaFondo} />
          <Route  exact path="/TiendaNFT" component={TiendaNFT} />
          <Route  exact path="/CrearNFT" component={crearNFT} />
          <Route  exact path="/TableroNFT" component={tableroNFT} />
          <Route  exact path="/MisNFT" component={misNFT} />
          <Route  exact path="/Matchmaking" component={Intermedio} />
          <Route  exact path="/Compra" component={Compra} />
          <Route  exact path="/Chatear" component={ChatApp} />
          <Route  exact path="/Comprar" component={Comprar} />
          <Route exact path= "/BotonPagar" component={BotonPagar} />
          <Route exact path= "/Detallecompra" component={DetalleCompra} />
          <Route exact path="/LoginMetamask" component={LoginMetamask} /> 
        </div>
      );
    }

    
export default App;