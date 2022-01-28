import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavCheto from '../NavCheto';
import Avatar from '@mui/material/Avatar';
import Inventario from "./Inventario";
import Mazo from "./Mazo";
import Perfil from "./perfil";
import Estadisticas from "./Estadisticas";

/* import Estadisticas from "./estadisticas/Estadisticas"; */
// import { 
//     getById,
//  } from "../redux/actions.js";
import MisNFT from "../NFT/MisNFT"
import { app } from "../../firebase/firebase";
import { getUserLogin } from '../../redux/actions';


export default function Detalle() {
	const dispatch = useDispatch();
	const { id } = useParams();
	const logueado = useSelector(state => state.users)
	const detail = useSelector((state) => state.userLogueado);

	const [navegacion,setNavegacion] = useState('profile')




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
				<Avatar sx={{ width: 102, height: 100, fontSize:"2.5rem", backgroundColor:'#FF6363',":hover":'rgba(0, 0, 0)', backgroundSize:'cover' }}>{detail !==[] ? <img style={{width:'100%',height:'100%'}} src={detail.image} alt={detail.nickname?.charAt(0)} />:'I'}</Avatar>
				<p className='log-usuario'>{detail.nickName? detail.nickName:'Invitado'}</p>
			</div>
			
			<div class="wrapper">
				<div class="sidebar">
					
					<ul>
						{/* <li onClick={()=>{setNavegacion('home')}}  className={`${navegacion === 'home'? 'activo-profile' : null}`} ><i class="fas fa-home"></i>Home</li> */}
						<li onClick={()=>{setNavegacion('profile')}} style={{cursor:'pointer'}} className={`${navegacion === 'profile'? 'activo-profile' : null}`} ><i class="fas fa-user"></i>Profile</li>
						<li onClick={()=>{setNavegacion('inventario')}} style={{cursor:'pointer'}} className={`${navegacion === 'inventario'? 'activo-profile' : null}`}><i class="fas fa-boxes"></i>Inventario</li>
						<li onClick={()=>{setNavegacion('misNft')}} style={{cursor:'pointer'}} className={`${navegacion === 'misNft'? 'activo-profile' : null}`}><i class="fas fa-hat-wizard"></i>Mis NFT</li>
						<li onClick={()=>{setNavegacion('estadisticas')}} style={{cursor:'pointer'}} className={`${navegacion === 'estadisticas'? 'activo-profile' : null}`}><i class="far fa-chart-bar"></i>Estadisticas</li>

					</ul>

				</div>
				<div className="contenido-profile">
					{
						// navegacion === 'home' ? <h1>Home</h1> : 
						navegacion === 'profile' ? <Perfil/> : 
						navegacion === 'inventario' ? <Inventario/> : 
						navegacion === 'misNft' ?  <MisNFT/> :
						navegacion === 'estadisticas' ? <Estadisticas/>: null
						// navegacion === 'estadisticas' ? <h1>Hola</h1>: null
						
					}
					
				</div>
				</div>
			</div>
			
			</div>
		
	);
}