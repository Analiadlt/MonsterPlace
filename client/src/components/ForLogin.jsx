import React, { useState } from 'react';
import { useFormik } from 'formik';
import { loginUser } from '../redux/actions';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Nav from './Nav';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

const validate = values => {



	const errors = {};


	if (!values.email) {
		errors.email = 'Email obligatorio.';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Email invalido';
	}

	if (!values.password) {
		errors.password = 'Contraseña obligatorio.';
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
		<div style={{display:'block', margin:'10rem 33%',marginTop:'10rem',width:'55%'}}>
			<div className='login-box'>
				<form className="formulario" onSubmit={formik.handleSubmit}>
					<h2 >Login</h2>

					

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
							<div className="campoErr"><ErrorOutlineOutlinedIcon/>{formik.errors.password}</div>
						) : null}
					</div>

					{formularioEnviado ? Alerta() : null}
					<div style={{display:'flex', justifyContent:'space-around', alignItems:'center'}}>
					 <button type="submit" className='botonn'>
					 <span></span>
					<span></span>
					<span></span>
					<span></span>
	   				Login</button>
					   <Link to='/Registro'><div className='botonn' > 
				 	<span></span>
					<span></span>
					<span></span>
					<span></span>Crear una cuenta</div></Link>
					</div>
				</form>
			</div>
		</div>
		</div>
	);
};

export default ForLogin;