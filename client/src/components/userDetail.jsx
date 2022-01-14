import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams} from "react-router-dom";
import Nav from './Nav';
// import { 
//     getById,
//  } from "../redux/actions.js";

import { app } from "../firebase/firebase";
import { getUserLogin } from '../redux/actions';


export default function Detalle() {
  const dispatch = useDispatch();
  const { id }= useParams();
  const logueado = useSelector(state => state.users)
  const detail = useSelector((state) => state.userLogueado);




 

  useEffect(() => {

	if (app) {
	  app.auth().onAuthStateChanged((authUser) => {

		if (authUser && logueado.length >5) {
		  dispatch(getUserLogin(authUser.email))
					 }})}},[logueado])

//   const [uId, ] = useState(id);

//   console.log("ID desde Detail", id, uId);
 // const aux = "840d9150-0da9-4c7b-a898-8d15e0d1827d"

	// useEffect(() => {
    // dispatch(getById(uId));
	// }, [dispatch, uId]);


// console.log("detalle desde detail", detail)


    
  return (
	  <div>
		 <Nav />
	  <div style={{display:'flex',alignItems:'center', justifyContent:'center'}}>
    <div className="detail-content">
		
			<h2 >Perfil De Usuario</h2>
		
		
		<div className="usuario-box">
				
			<h3> Nombre: </h3>
			<p> {detail.firstName} </p>
				
		</div>

		<div className="usuario-box">
			<h3> Apellido: </h3>
			<p> {detail.lastName} </p>
		</div>
		<div className="usuario-box">
			<h3> Email: </h3>
			<p> {detail.email} </p>
		</div>
		<div className="usuario-box">
			<h3> NickName: </h3>
			<p> {detail.nickName} </p>
		</div>
		{/* <div className="usuario-box">
			<h3> Fecha de Nacimiento: </h3>
			<p> {detail.dateBirth} </p>
		</div>		 */}
        
    </div>
	</div>
	</div>
  );
}