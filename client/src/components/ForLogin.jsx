import React, { useState } from 'react';
import { useFormik } from 'formik';
import { loginUser } from '../redux/actions';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Nav from './Nav';

const validate = values => {



	const errors = {};


	if (!values.email) {
		errors.email = 'Campo obligatorio.';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Email invalido';
	}

	if (!values.password) {
		errors.password = 'Campo obligatorio.';
	} else if (!/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(values.password)) {
		errors.password = 'Debe tener entre 8 y 16 caracteres, al menos un numero, una minúscula y una mayúscula.';
	}

	return errors;
};

const ForLogin = () => {
	const dispatch = useDispatch()

	const [formularioEnviado, setFormularioEnviado] = useState(false);

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validate,
		onSubmit: (values) => {
			console.log(values)
			dispatch(loginUser(values));

			setFormularioEnviado(true);
		},

	});


	const Alerta = () => {

		Swal.fire('Conectando...', '', 'success');

	}



	return (
		<div >
			<Nav />
			<div className='contenedoor'>
				<form className="formulario" onSubmit={formik.handleSubmit}>
					<h2 style={{ color: 'black' }}>Ingresar</h2>

					

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

					{formularioEnviado ? Alerta() : null}
					<button type="submit" >Ingresar</button>
				 <Link to='/Registro'><div className='login' >Crear una cuenta</div></Link>
				</form>
			</div>
		</div>
	);
};

export default ForLogin;