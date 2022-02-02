import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { addUser, reset,cargarSaldo } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import NavCheto from './NavCheto';

import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import huevoVerde from '../img/huevoVerde.png'
import { app } from "../firebase/firebase";

let imgCargada= false;
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
	if (values.email !== values.confiEmail) {
		errors.confiEmail = 'Email no coinciden.';
	}
	if (values.image ==='' || imgCargada === false ) {
		errors.image = 'Debes colocar una imagen';
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
	const user = useSelector(state => state.user)
	const [ojo, setojo] = useState(false);



	const signUp = async (email, password) => {

		try {
			if (app) {
				const user = await app
					.auth()
					.createUserWithEmailAndPassword(email, password)
				verificar();


			}

		} catch (error) {
			console.log("error", error);
			alert(error.message);
		}
	};
	function verificar() {
		var user = app.auth().currentUser;
		user.sendEmailVerification().then(function () {
			// Email sent.
		}).catch(function (error) {
			// An error happened.
		});
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
		onSubmit: ({ image, firstName, lastName, email, nickName, dateBirth, password }) => {

			dispatch(addUser({ image, firstName, lastName, email, nickName, dateBirth, password }))
			signUp(email, password)

			console.log('email....',email )
			let aux = {
				email: email,
				saldo_cryps: 194,
			  };
           
			
			setTimeout(() => {
				dispatch(cargarSaldo(aux));

			}, 1000);


		},


	});


	useEffect(() => {
		if (user.data === "El usuario ya existe") {
			dispatch(reset())
			Swal.fire('Ya existe una cuenta con este email', '', 'error')


		}
		else if (user.data === 'Usuario creado con exito') {
			dispatch(reset())


			Swal.fire({
				// imageUrl: `${huevoVerde}`,
				imageUrl: 'http://pngimg.com/uploads/envelope/envelope_PNG18384.png',
				title: 'Te hemos enviado un email de validacion',
				width: 400,
				confirmButtonText: 'Continuar',
				imageWidth: 300,
				imageHeight: 250,
				timer: 3000,
				timerProgressBar: true,
				didOpen: () => {
					Swal.showLoading()

				},

			})

			setTimeout(() => {
				history.push('/Login')

			}, 3000);
		}


	}, [user])

	//-----------------------------------------------
	const [image, setImage] = useState(null);
	const [url, setUrl] = useState("");
	const [progress, setProgress] = useState(0);

	

	const handleChangeImage = e => {
		if (e.target.files[0]) {
			imgCargada= true;
			setImage(e.target.files[0]);
		}
		else{
			imgCargada = false;
			setUrl('')
		}
		
		
	};

	const handleUpload = () => {

		if(image){
		const uploadTask = app.storage().ref(`images/${image.name}`).put(image);
		uploadTask.on(
			"state_changed",
			snapshot => {
				const progress = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				setProgress(progress);
			},
			error => {
				console.log(error);
			},
			() => {
				app.storage()
					.ref("images")
					.child(image.name)
					.getDownloadURL()
					.then(url => {
						setUrl(url);
						console.log(url)
					});

			},
		);
		}
	};



	
	formik.values.image=url
	console.log("imagen...",image)


	//-----------------------------------------------

	return (
		<div>
			<NavCheto />
			<div className='container-log'>
				<div className='login-box'>
					<h2 >Registrarse</h2>

					



					<form onSubmit={formik.handleSubmit}>


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
								<div className="campoErr"> <ErrorOutlineOutlinedIcon /> {formik.errors.firstName}</div>
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
								<div className="campoErr"><ErrorOutlineOutlinedIcon />{formik.errors.lastName}</div>
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
								<div className="campoErr"><ErrorOutlineOutlinedIcon />{formik.errors.nickName}</div>
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
								<div className="campoErr"><ErrorOutlineOutlinedIcon />{formik.errors.email}</div>
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
								<div className="campoErr"><ErrorOutlineOutlinedIcon />{formik.errors.confiEmail}</div>
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
								<div className="campoErr"><ErrorOutlineOutlinedIcon />{formik.errors.dateBirth}</div>
							) : null}
						</div>

						<div className="user-box">
							<label htmlFor="password" >Password</label>
							<div style={{ display: 'flex' }}>
								<input
									id="password"
									name="password"
									type={ojo ? 'text' : 'password'}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.password}

								/>
								{formik.values.password !== '' ? ojo ? <span onClick={switchShown}><VisibilityOffIcon /></span> : <span onClick={switchShown}><VisibilityIcon /> </span> : null}
							</div>
							{formik.touched.password && formik.errors.password ? (
								<div className="campoErr"><ErrorOutlineOutlinedIcon />{formik.errors.password}</div>
							) : null}

						</div>

						<div >
					<label htmlFor="">Imagen de perfil</label>
						<br />
						<br />
						<div>
						<input type="file" onChange={handleChangeImage}/>
						<p className='botonImagen' onClick={handleUpload}>Cargar</p>
						</div>
						{formik.touched.image && formik.errors.image ? (
								<div className="campoErr"><ErrorOutlineOutlinedIcon />{formik.errors.image}</div>
							) : null}
						<br />
						<br />
						{url!==""?<img src={url || "http://via.placeholder.com/300"} alt="firebase-image" />:null}
					</div>

						<div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
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