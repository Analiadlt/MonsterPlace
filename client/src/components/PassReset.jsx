import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { loginUser } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import Nav from './Nav';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import huevoRojo from '../img/huevoRojo.png'
import huevoBlanco from '../img/huevoBlanco.png'
import dragon3 from '../img/recurso3.png'


const validate = values => {



	const errors = {};


	if (!values.email) {
		errors.email = 'Email obligatorio.';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Email invalido';
	}

	
	return errors;
};

const PassReset = () => {
	const dispatch = useDispatch()
	const history = useHistory()
	const userLogeado = useSelector(state => state.userLogueado)

	const [logeado, setLogeado]=useState(false)
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


			setLogeado(true)

			alerta()
		},

	});

	useEffect(() => {
	 	if (logeado && userLogeado.id) {
	 		
			 Swal.fire({
				imageUrl: `${huevoBlanco}`,
				title: 'Conectando..',
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
				
					// setTimeout(() => {
					// history.push(`/`)
					 
					// }, 3000);

					// setLogeado(false)
	 	}

		 if (logeado && userLogeado === '400' || userLogeado === "Contraseña incorrecta" || userLogeado === '"email" must be a valid email') {
			
			Swal.fire({
				title: '<strong>Contraseña o Email incorrecto</strong>',
			   imageUrl: `${huevoRojo}`,
			   width: 500,
			   imageWidth: 300,
			   imageHeight: 400,
			   
			  
				 
			   })
			   
				
		}

		

	}, [userLogeado, history]);

	let alerta = ()=>{

		Swal.fire({
			imageUrl: `${dragon3}`,
			title: 'Email enviado',
			width: 600,
			confirmButtonText: 'Continuar' ,
			imageWidth: 500,
			imageHeight: 300,
			timer: 3000,
			timerProgressBar: true,
			didOpen: () => {
				Swal.showLoading()
				
			  },
			  
			})

	}





	return (
		<div >
			<Nav />
			<div style={{ display: 'block', margin: '10rem 33%', marginTop: '10rem', width: '55%' }}>
				<div className='login-box'>
					<form className="formulario" onSubmit={formik.handleSubmit}>
						<h2 >Recuperar contraseña</h2>



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

						<div style={{ display: 'flex',justifyContent:'center',alignItems:'center',flexDirection:'column' }}>
							<div style={{margin:'0 auto'}}>
								<button type="submit" className='botonn'>
									<span></span>
									<span></span>
									<span></span>
									<span></span>
									Enviar</button>
							</div>
							
						</div>
					</form>
					<div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
						<p style={{ color: '#FFB520', textAlign:'center' }} >Te enviaremos un email para que recuperes tu contraseña</p>

					</div>
					
				</div>
			</div>
		</div>
	);
};

export default PassReset;