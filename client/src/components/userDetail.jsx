import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavCheto from './NavCheto';
import Avatar from '@mui/material/Avatar';
// import { 
//     getById,
//  } from "../redux/actions.js";

import { app } from "../firebase/firebase";
import { getUserLogin } from '../redux/actions';


export default function Detalle() {
	const dispatch = useDispatch();
	const { id } = useParams();
	const logueado = useSelector(state => state.users)
	const detail = useSelector((state) => state.userLogueado);






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
				<Avatar sx={{ width: 60, height: 60, fontSize:"2.5rem", backgroundColor:'#f8bd279d',":hover":'rgba(0, 0, 0)' }}>{detail !==[] ? detail.nickName?.charAt(0) :'I'}</Avatar>
				<p className='log-usuario'>{detail.nickName? detail.nickName:'Invitado'}</p>
			</div>
			
			<div class="wrapper">
				<div class="sidebar">
					
					<ul>
						<li><a href="#"><i class="fas fa-home"></i>Home</a></li>
						<li><a href="#"><i class="fas fa-user"></i>Profile</a></li>
						<li><a href="#"><i class="fas fa-address-card"></i>Inventario</a></li>
						<li><a href="#"><i class="fas fa-project-diagram"></i>Mazo</a></li>
						<li><a href="#"><i class="fas fa-project-diagram"></i>Estadisticas</a></li>

					</ul>

				</div>
					
				</div>
			</div>
			</div>
		
	);
}