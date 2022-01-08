import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams} from "react-router-dom";
import { 
    getById,
 } from "../redux/actions.js";


export default function Detalle() {
  const dispatch = useDispatch();
  const { id }= useParams();
  const [uId, ] = useState(id);
 // const aux = "840d9150-0da9-4c7b-a898-8d15e0d1827d"


  


console.log("Id y uId", id);

  useEffect(() => {
    dispatch(getById(uId));
	}, [dispatch,uId]);

const detail = useSelector((state) => state.userDetail);

console.log("detalle desde detail", detail)


    
  return (
    <div className="detail-content">
		<div className="detail-titulo">
			<h1 style={{color: 'white'}}>User Profile</h1>
		</div>
		<div className="detail-block">
		<div>
			<h4> Nombre: </h4>
			<p> {detail.firstName} </p>
		</div>
		<div>
			<h4> Apellido: </h4>
			<p> {detail.lastName} </p>
		</div>
		<div>
			<h4> Email: </h4>
			<p> {detail.email} </p>
		</div>
		<div>
			<h4> NickName: </h4>
			<p> {detail.nickName} </p>
		</div>
		<div>
			<h4> Fecha de Nacimiento: </h4>
			<p> {detail.dateBirth} </p>
		</div>		
        </div>
    </div>
  );
}