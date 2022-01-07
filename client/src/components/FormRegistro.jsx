import React, { useState , useEffect } from 'react';
import { useFormik } from 'formik';
import { addUser } from '../redux/actions';
import { useDispatch , useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Nav from './Nav';

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
		errors.firstName = 'Campo obligatorio.';
	} else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/i.test(values.firstName)) {
		errors.firstName = 'El nombre solo puede contener letras y espacios.';
	}

	if (!values.lastName) {
		errors.lastName = 'Campo obligatorio.';
	} else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/i.test(values.lastName)) {
		errors.lastName = 'El apellido solo puede contener letras y espacios.';
	}

	if (!values.nickName) {
		errors.nickName = 'Campo obligatorio.';
	} else if (values.nickName.length > 20) {
		errors.nickName = 'Hasta 20 caracteres';
	}

	if (!values.email) {
		errors.email = 'Campo obligatorio.';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Email invalido';
	}

	if (!values.dateBirth) {
		errors.dateBirth = 'Campo obligatorio.';

	} else if (calcularEdad(values.dateBirth) < 18) {
		errors.dateBirth = 'Debes ser mayor de edad';
	}

	if (!values.password) {
		errors.password = 'Campo obligatorio.';
	} else if (!/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(values.password)) {
		errors.password = 'Debe tener entre 8 y 16 caracteres, al menos un numero, una minúscula y una mayúscula.';
	}

	return errors;
};

const Formulario = () => {
	const dispatch = useDispatch()
	const user = useSelector( state => state.user)

	console.log('esto es user desde el componente ', user)

	const [formularioEnviado, setFormularioEnviado] = useState(false);

	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			nickName: '',
			dateBirth: '',
			password: '',
		},
		validate,
		onSubmit: (values) => {
			console.log(values)
			dispatch(addUser(values));

			setFormularioEnviado(true)
			

			//  (setTimeout(() => {
   
			// 	formularioEnviado && user.data !== '' ? Alerta() : null
			   
			// 			  } ,1000) 
		},
		

	});

	useEffect(() => {
		if(user.data === "El usuario ya existe" ){
			Swal.fire('El usuario ya existe', '', 'error')
		}
		else if (user.data === 'Usuario creado con exito'){
			Swal.fire('Te registraste con exito', '', 'success')
		}
		
	}, [user])

	console.log(formularioEnviado)

	return (
		<div >
			<Nav />
			<div className='contenedoor'>
				<form className="formulario" onSubmit={formik.handleSubmit}>
					<h2 style={{ color: 'black' }}>Registrarse</h2>

					<div className="campo">
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
							<div className="campoErr">{formik.errors.firstName}</div>
						) : null}
					</div>



					<div className="campo">
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
							<div className="campoErr">{formik.errors.lastName}</div>
						) : null}
					</div>

					<div className="campo">
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
							<div className="campoErr">{formik.errors.nickName}</div>
						) : null}
					</div>

					<div className="campo">
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
							<div className="campoErr">{formik.errors.email}</div>
						) : null}
					</div>

					<div className="campo">
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
							<div className="campoErr">{formik.errors.dateBirth}</div>
						) : null}
					</div>

					<div className="campo">
						<label htmlFor="password">Password</label>
						<input
							id="password"
							name="password"
							type="password"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.password}
						/>
						{formik.touched.password && formik.errors.password ? (
							<div className="campoErr">{formik.errors.password}</div>
						) : null}
					</div>
					
  		
					<button type="submit" >Registrarse</button>
				 <Link to='/Login'><div className='login' >Ya tengo cuenta</div></Link>
				</form>
			</div>
		</div>
	);
};

export default Formulario;