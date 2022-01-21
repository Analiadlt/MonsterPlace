import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavCheto from '../NavCheto';
import Avatar from '@mui/material/Avatar';
import Inventario from "./Inventario";
import Mazo from "./Mazo";
/* import Estadisticas from "./estadisticas/Estadisticas"; */
// import { 
//     getById,
//  } from "../redux/actions.js";

import { app } from "../../firebase/firebase";
import { getUserLogin } from '../../redux/actions';


export default function Detalle() {
	const dispatch = useDispatch();
	const { id } = useParams();
	const logueado = useSelector(state => state.users)
	const detail = useSelector((state) => state.userLogueado);

	const [navegacion,setNavegacion] = useState('home')
	



	useEffect(() => {

		if (app) {
			app.auth().onAuthStateChanged((authUser) => {

				if (authUser && logueado.length > 5) {
					dispatch(getUserLogin(authUser.email))
				}
			})
		}

		

	}, [logueado])






	return (
		<div>
			<NavCheto />
		<div className="detalle-container">
			
			
			<div className="avatar">
				<Avatar sx={{ width: 60, height: 60, fontSize:"2.5rem", backgroundColor:'#FF6363',":hover":'rgba(0, 0, 0)' }}>{detail !==[] ? detail.nickName?.charAt(0) :'I'}</Avatar>
				<p className='log-usuario'>{detail.nickName? detail.nickName:'Invitado'}</p>
			</div>
			
			<div class="wrapper">
				<div class="sidebar">
					
					<ul>
						<li onClick={()=>{setNavegacion('home')}}  className={`${navegacion === 'home'? 'activo-profile' : null}`} ><a href="#"><i class="fas fa-home"></i>Home</a></li>
						<li onClick={()=>{setNavegacion('profile')}} className={`${navegacion === 'profile'? 'activo-profile' : null}`} ><a href="#"><i class="fas fa-user"></i>Profile</a></li>
						<li onClick={()=>{setNavegacion('inventario')}} className={`${navegacion === 'inventario'? 'activo-profile' : null}`}><a href="#"><i class="fas fa-boxes"></i>Inventario</a></li>
						<li onClick={()=>{setNavegacion('misNft')}}className={`${navegacion === 'misNft'? 'activo-profile' : null}`}><a href="#"><i class="fas fa-hat-wizard"></i>Mis NFT</a></li>
						<li onClick={()=>{setNavegacion('estadisticas')}} className={`${navegacion === 'estadisticas'? 'activo-profile' : null}`}><a href="#"><i class="far fa-chart-bar"></i>Estadisticas</a></li>

					</ul>

				</div>
				<div className="contenido-profile">
					{
						navegacion === 'home' ? <h1>Home</h1> : 
						navegacion === 'profile' ? <h1>pr</h1> : 
						navegacion === 'inventario' ? <Inventario/> : 
						navegacion === 'misNft' ? <h1>nft</h1> : 
						navegacion === 'estadisticas' ? <h1>Hola</h1>: null
						
					}
					
				</div>
				</div>
			</div>
			
			</div>
		
	);
}