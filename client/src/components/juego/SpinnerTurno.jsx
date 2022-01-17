import React from "react";
import { useSelector } from 'react-redux'
import Card from "../Card";

export default function SpinnerT() {

    return (
    
        <div class="spinner-box">
            <div class="configure-border-1">
                <div class="configure-core"></div>
            </div>
            <div class="configure-border-2">
                <div class="configure-core"></div>
            </div>
            <h1>Esperando Rival...</h1>
        </div>
        

    )

}