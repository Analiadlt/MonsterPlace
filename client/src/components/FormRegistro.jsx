import React, { useState , useEffect } from 'react';
import { useFormik } from 'formik';
import { addUser , reset } from '../redux/actions';
import { useDispatch , useSelector} from 'react-redux';
import { Link , useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import Nav from './Nav';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import huevoVerde from '../img/huevoVerde.png'
import {app} from "../firebase/firebase";

const validate = values => {



	const errors = {};

	function calcularEdad(dateBirth) {
		var hoy = new Date();
		var cumpleanos = new Date(dateBirth);
		var edad = hoy.getFullYear() - cumpleanos.getFullYear();
		var m = hoy.getMonth() - cumpleanos.getMonth();

		if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
			edad--;
		}
		return edad;
	}




	if (!values.firstName) {
		errors.firstName = 'Nombre obligatorio.';
	} else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/i.test(values.firstName)) {
		errors.firstName = 'El nombre solo puede contener letras y espacios.';
	}

	if (!values.lastName) {
		errors.lastName = 'Apellido obligatorio.';
	} else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/i.test(values.lastName)) {
		errors.lastName = 'El apellido solo puede contener letras y espacios.';
	}

	if (!values.nickName) {
		errors.nickName = 'Nickname obligatorio.';
	} else if (values.nickName.length > 20) {
		errors.nickName = 'Hasta 20 caracteres';
	}

	if (!values.email) {
		errors.email = 'Email obligatorio.';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Email invalido';
	}
	if (values.email !== values.confiEmail ) {
		errors.confiEmail = 'Email no coinciden.';
	}

	if (!values.dateBirth) {
		errors.dateBirth = 'Fecha obligatoria.';

	} else if (calcularEdad(values.dateBirth) < 18) {
		errors.dateBirth = 'Debes ser mayor de edad';
	}

	if (!values.password) {
		errors.password = 'Contraseña obligatoria.';
	} else if (!/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(values.password)) {
		errors.password = 'Debe tener entre 8 y 16 caracteres, al menos un numero, una minúscula y una mayúscula.';
	}

	return errors;
};

const Formulario = () => {
	const dispatch = useDispatch()
	const history = useHistory()
	const user = useSelector( state => state.user)
	const [ojo, setojo] = useState(false);
	
	const signUp = async (email,password) => {
	
		try {
		  if (app) {
			const user = await app
			  .auth()
			  .createUserWithEmailAndPassword(email, password);
		  }
		} catch (error) {
		  alert(error.message);
		}
	};

	
	const switchShown = () => setojo(!ojo)

	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			confiEmail: '',
			nickName: '',
			dateBirth: '',
			password: '',
		},
		validate,
		onSubmit: ({firstName,lastName,email,nickName,dateBirth,password}) => {
			
			dispatch(addUser({firstName,lastName,email,nickName,dateBirth,password}))
			signUp(email,password)
			

			
		},
		

	});

	useEffect(() => {
		if(user.data === "El usuario ya existe" ){
			dispatch(reset())
			Swal.fire('Ya existe una cuenta con este email', '', 'error')
			

		}
		else if (user.data === 'Usuario creado con exito'){
			dispatch(reset())
			
			
			Swal.fire({
				imageUrl: `${huevoVerde}`,
				title: 'Usuario creado con exito',
				width: 500,
				confirmButtonText: 'Continuar' ,
				imageWidth: 300,
				imageHeight: 400,
				timer: 3000,
				timerProgressBar: true,
				didOpen: () => {
					Swal.showLoading()
					
				  },
				  
				})
				
					setTimeout(() => {
					history.push('/')
					 
					}, 3000);
			}

		
	}, [user])

	return (
		<div>
			<Nav />
		<div style={{display:'flex',alignItems:'center', justifyContent:'center'}}>
			<div className='login-box'>
				<form  onSubmit={formik.handleSubmit}>
					<h2 >Registrarse</h2>

					<div className="user-box">
						<label htmlFor="firstName">Nombre</label>
						<input
							id="firstName"
							name="firstName"
							type="text"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.firstName}
						/>
						{formik.touched.firstName && formik.errors.firstName ? (
							<div className="campoErr"> <ErrorOutlineOutlinedIcon/> {formik.errors.firstName}</div>
						) : null}
					</div>



					<div className="user-box">
						<label htmlFor="lastName">Apellido</label>
						<input
							id="lastName"
							name="lastName"
							type="text"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.lastName}
						/>
						{formik.touched.lastName && formik.errors.lastName ? (
							<div className="campoErr"><ErrorOutlineOutlinedIcon/>{formik.errors.lastName}</div>
						) : null}
					</div>

					<div className="user-box">
						<label htmlFor="nickName">NickName</label>
						<input
							id="nickName"
							name="nickName"
							type="text"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.nickName}
						/>
						{formik.touched.nickName && formik.errors.nickName ? (
							<div className="campoErr"><ErrorOutlineOutlinedIcon/>{formik.errors.nickName}</div>
						) : null}
					</div>

					<div className="user-box">
						<label htmlFor="email">Email</label>
						<input
							id="email"
							name="email"
							type="email"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.email}
						/>
						{formik.touched.email && formik.errors.email ? (
							<div className="campoErr"><ErrorOutlineOutlinedIcon/>{formik.errors.email}</div>
						) : null}
					</div>

					<div className="user-box">
						<label htmlFor="confiEmail">Confirmar Email</label>
						<input
							id="confiEmail"
							name="confiEmail"
							type="email"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.confiEmail}
						/>
						{formik.touched.confiEmail && formik.errors.confiEmail ? (
							<div className="campoErr"><ErrorOutlineOutlinedIcon/>{formik.errors.confiEmail}</div>
						) : null}
					</div>

					<div className="user-box">
						<label htmlFor="dateBirth">Fecha de Nacimiento</label>
						<input
							id="dateBirth"
							name="dateBirth"
							type="date"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.dateBirth}
						/>
						{formik.touched.dateBirth && formik.errors.dateBirth ? (
							<div className="campoErr"><ErrorOutlineOutlinedIcon/>{formik.errors.dateBirth}</div>
						) : null}
					</div>

					<div className="user-box">
						<label htmlFor="password" >Password</label>
						<div style={{display:'flex'}}>
						<input
							id="password"
							name="password"
							type={ojo ? 'text' : 'password'}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.password}
							
						/> 
						{formik.values.password !== '' ? ojo ?<span onClick={switchShown}><VisibilityOffIcon/></span> : <span onClick={switchShown}><VisibilityIcon/> </span> :null}
						</div>
						{formik.touched.password && formik.errors.password ? (
							<div className="campoErr"><ErrorOutlineOutlinedIcon/>{formik.errors.password}</div>
						) : null}

						</div>
					
					<div style={{display:'flex', justifyContent:'space-around', alignItems:'center'}}>
					 <button type="submit" className='botonn'>
					 <span></span>
					<span></span>
					<span></span>
					<span></span>
	   				Registrarse</button>
					
					
				 <Link to='/Login'><div className='botonn' > 
				 	<span></span>
					<span></span>
					<span></span>
					<span></span>Ya tengo cuenta</div></Link>
					</div>
				</form>
			</div>
		</div>
		</div>
	);
};

export default Formulario;