import React from "react";
import { useSelector } from 'react-redux'
import Card from "../Card";

export default function Spinner({text}) {

    return (
        <div className="contenedor-spinner">
            <div class="square-container">
                <div class="square uno"></div>
                <div class="square dos"></div>
                <div class="square tres"></div>
            </div>
            <div class="text">{text}</div>
        </div>
    )

}