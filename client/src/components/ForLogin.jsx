import React, { useState ,useEffect} from 'react';
import { useFormik } from 'formik';
import { loginUser } from '../redux/actions';
import { useDispatch , useSelector} from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import Nav from './Nav';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const validate = values => {



	const errors = {};


	if (!values.email) {
		errors.email = 'Email obligatorio.';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Email invalido';
	}

	if (!values.password) {
		errors.password = 'Contraseña obligatoria.';
	} else if (!/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(values.password)) {
		errors.password = 'Debe tener entre 8 y 16 caracteres, al menos un numero, una minúscula y una mayúscula.';
	}

	return errors;
};

const ForLogin = () => {
	const dispatch = useDispatch()
	const history = useHistory()
	const userLogeado = useSelector(state => state.userLogueado)


	const [formularioEnviado, setFormularioEnviado] = useState(false);
	const [ojo, setojo] = useState(false);
	const switchShown = () => setojo(!ojo)

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validate,
		onSubmit: (values) => {
			console.log("Desde ForLogin", values)
			dispatch(loginUser(values));
			

			setFormularioEnviado(true);
			// setTimeout(() => {
			// 	history.push('/Detail/')
				 
			// 	}, 2000);
			
		},

	});

	useEffect(() => {
	 	if (userLogeado) {
	 		history.push(`/Detail/${userLogeado.id}`)
			console.log("User ID desde Login",userLogeado.id)
	 	}
	}, [userLogeado, history]);




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

					{/* {formularioEnviado ? Alerta() : null} */}
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
				<div style={{display:'flex',justifyContent:'center', marginTop:'2rem'}}>
					<a href='#'>Olvide mi contraseña</a>

				</div>
			</div>
		</div>
		</div>
	);
};

export default ForLogin;