import { React, useEffect } from "react";
import ProfileHome from "./ProfileHome";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/actions";

export default function NavCheto() {

    const usuarios = useSelector(state => state.users)
    const loading = useSelector(state => state.loading)
    const dispatch = useDispatch();

    useEffect(() => {
        if (!usuarios.length && !loading.loading) {
            dispatch(getUser())
        }
    })


    return (
        <div className="nav-cheto navContainer">

            <header class="header">
                <Link to="/">
                    <h1 className="titulo">Monster Place <i class="fab fa-optin-monster logo-icon"></i></h1>
                </Link>

                <div class="hamburger only-mobile" onClick={() => {
                    const menu = document.querySelector(".hamburger");
                    const overlay = document.querySelector(".header-overlay");
                    const body = document.body;
                    menu.classList.toggle('makex');
                    overlay.classList.toggle('overlay');
                    body.classList.toggle('delimitate');

                }}>
                    <div class="line one"></div>
                    <div class="line two"></div>
                    <div class="line three"></div>
                </div>
                <nav class="header-nav only-desktop">
                    <ul class="nav-list">
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
                                        window.location.pathname === "/Carrito" ||
                                        window.location.pathname === "/TiendaNft"
                                        ? "activo"
                                        : null
                                }
                            >
                                Tienda
                            </span>
                        </Link>
                        <a class="header-link"><ProfileHome /></a>

                    </ul>
                </nav>

            </header>

            <div class="header-overlay only-mobile">
                <Link to="/" className="link-oculto">
                    <span
                        className={window.location.pathname === "/" ? "activo" : null}
                    >
                        Home
                    </span>
                </Link>
                <Link to="/Tienda" className="link-oculto">
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
                
                <span className="link-oculto"><ProfileHome /></span>
                
            </div>

        </div>
    )


}