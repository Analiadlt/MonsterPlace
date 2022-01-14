import {React, useEffect} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cambiarFondo } from "../redux/actions";
import ProfileHome from "./ProfileHome";
import { getUser } from "../redux/actions";


export default function Nav() {

  const usuarios =  useSelector(state => state.users)
  const loading = useSelector(state=>state.loading)
  const modo = useSelector((state) => state.modo);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!usuarios.length && !loading.loading) {
      dispatch(getUser())
    }
  })

  return (
    <div>
      <div className="navContainer">
        <div>
          <Link to="/">
            <h1 className="titulo">CryptoGame</h1>
          </Link>
        </div>
        <div>
          <Link to="/">
            <span
              className={window.location.pathname === "/" ? "activo" : null}
            >
              Home
            </span>
          </Link>
          <Link to="/Tienda">
            <span
              className={
                window.location.pathname === "/Tienda" ||
                window.location.pathname === "/Carrito"
                  ? "activo"
                  : null
              }
            >
              Tienda
            </span>
          </Link>
          <Link to="/TiendaNFT">
            <span
              className={window.location.pathname === "/TiendaNFT" ? "activo" : null}
            >
              TiendaNFT
            </span>
          </Link>
          {/*                     <button onClick={()=>{
                        const color = document.getElementById('body')

                        if(modo === 'claro'){ 
                        color.style.background = '#1E1E1E'
                        dispatch(cambiarFondo())
                    }else if (modo === 'oscuro'){
                        color.style.background = '#2669A6'
                        dispatch(cambiarFondo())
                    }
                    }}  >
                        Cambiar
                    </button> */}
          {window.location.pathname === "/"
            ? console.log("estoy en el home")
            : window.location.pathname === "/Tienda"
            ? console.log("estoy en la tienda")
            : null}
        </div>
        <ProfileHome />
      </div>
    </div>
  );
}
