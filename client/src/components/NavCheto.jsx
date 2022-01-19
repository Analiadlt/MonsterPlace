import React from "react";
import ProfileHome from "./ProfileHome";
import { Link } from "react-router-dom";
export default function NavCheto() {
    return (
        <div className="nav-cheto navContainer">

            <header class="header">
                <Link to="/">
                    <h1 className="titulo">CryptoGame</h1>
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
                                        window.location.pathname === "/Carrito"
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

            <div class="header-overlay">
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
                <ProfileHome />
            </div>

        </div>
    )


}