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
// import Juego from "./components/juego/interface";
import userDetail from "./components/profile/userDetail";
import Chat from "./components/Chat";
import MyAuthPage from "./firebase/auth/MyAuthPage";
import Intermedio from "./components/juego/intermedio";
// import Chatear from './components/chat/chatear';
import ChatApp from "./components/chat/index";
// import NavCheto from "./components/NavCheto";
import Compra from "./components/Compra";
import { useSelector, useDispatch } from "react-redux";
import { app } from "./firebase/firebase";
import { getUserLogin, pagar, PAGAR, getUserLoginMetamask } from "./redux/actions";
import Comprar from "./components/compra/ordenCompra";
import GanadorJuego from "./components/juego/GanadorJuego";
import BotonPagar from "./components/BotonPagar";
import DetalleCompra from "./components/detalleCompra";
// import CartaFondo from "./components/juego/FondoCarta";
import CartaNft from "./components/CartaNft";
import { useMoralis } from "react-moralis";
import Panel from "./components/panel/panel";
import preintermedio from "./components/juego/preintermedio";
import DetallePanel from "./components/panel/DetallePanel"


function App() {
  const logueado = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const log = useSelector((state) => state.userLogueado);

  const { isAuthenticated, user } = useMoralis();
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
        if (
          authUser &&

          authUser.emailVerified === true
        ) {
          dispatch(getUserLogin(authUser.email));
        }
      });
    }

    else if (isAuthenticated === true) {

      dispatch(getUserLoginMetamask({ cuentaMetamask: user.attributes.accounts[0] }));

    };

  }, [dispatch, logueado]);


  return (
    <div className="App">
      <Route path="/ganador" component={GanadorJuego} />
      <Route path="/auth" component={MyAuthPage} />
      <Route path="/Carrito" component={Carrito} />
      <Route exact path="/" component={Home} />
      <Route exact path="/Tienda" component={Tienda} />
      <Route path="/Registro" component={FormRegistro} />
      <Route path="/Login" component={ForLogin} />
      <Route path="/PassReset" component={PassReset} />
      <Route path="/Detail/" component={userDetail} />
      <Route path="/chat" component={Chat} />
      <Route path="/juego" component={CartaNft} />
      <Route exact path="/TiendaNFT" component={TiendaNFT} />
      <Route exact path="/CrearNFT" component={crearNFT} />
      <Route exact path="/TableroNFT" component={tableroNFT} />
      <Route exact path="/MisNFT" component={misNFT} />
      <Route exact path="/Matchmaking" component={Intermedio} />
      <Route exact path="/Compra" component={Compra} />
      <Route exact path="/Chatear" component={ChatApp} />
      <Route exact path="/Comprar" component={Comprar} />
      <Route exact path="/BotonPagar" component={BotonPagar} />
      <Route exact path="/Detallecompra" component={DetalleCompra} />
      <Route exact path="/preintermedio" component={preintermedio} />
      {log.nickName === 'administrador' ?
        <Route exact path="/Panel" component={Panel} /> 
        : <Route exact path="/Panel" component={Home} />
      }
      <Route exact path="/Panel/:id" component={DetallePanel}/>

    </div>
  );
}
export default App;
