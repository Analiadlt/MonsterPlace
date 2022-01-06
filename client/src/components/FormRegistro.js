import React from 'react';
import { useFormik } from 'formik';

 const validate = values => {
	const errors = {};
  
	if (!values.firstName) {
	  errors.firstName = 'Required';
	} else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/i.test(values.firstName)) {
	  errors.firstName = 'Must be 15 characters or less';
	}
  
	if (!values.lastName) {
	  errors.lastName = 'Required';
	} else if (values.lastName.length > 20) {
	  errors.lastName = 'Must be 20 characters or less';
	}

	if (!values.nickname) {
		errors.nickname = 'Required';
	  } else if (values.nickname.length > 20) {
		errors.nickname = 'Must be 20 characters or less';
	  }
  
	if (!values.email) {
	  errors.email = 'Required';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
	  errors.email = 'Invalid email address';
	}

	if (!values.dob) {
		errors.dob = 'Required';
	
	}
	
	if (!values.password) {
		errors.password = 'Required';
	} else if (values.password.length < 8) {
		errors.password = 'Must be 8 characters or more';

	}
  
	return errors;
  };
  
  const Formulario = () => {
	const formik = useFormik({
	  initialValues: {
		firstName: '',
		lastName: '',
		email: '',
		nickname: '',
		dob: '',
		password: '',
	  },
	  validate,
	  onSubmit: values => {
		alert(JSON.stringify(values, null, 2));
	  },
	});
	return (

	  <form className= "formulario"onSubmit={formik.handleSubmit}>
          <h2 style={{color: 'black'}}>Formulario de Registro</h2>
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
        </div>
        
		{formik.touched.firstName && formik.errors.firstName ? (
		  <div className="campoErr">{formik.errors.firstName}</div>
		) : null} 
        

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
		  <div>{formik.errors.lastName}</div>
		) : null}
        </div>

        <div className="campo">
		<label htmlFor="nickname">NickName</label>
		<input
		  id="nickname"
		  name="nickname"
		  type="text"
		  onChange={formik.handleChange}
		  onBlur={formik.handleBlur}
		  value={formik.values.nickname}
		/>
		{formik.touched.nickname && formik.errors.nickname ? (
		  <div>{formik.errors.nickname}</div>
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
		  <div>{formik.errors.email}</div>
		) : null}
        </div>

        <div className="campo">
		<label htmlFor="dob">Fecha de Nacimiento</label>
		<input
		  id="dob"
		  name="dob"
		  type="date"
		  onChange={formik.handleChange}
		  onBlur={formik.handleBlur}
		  value={formik.values.dob}
		/>
		{formik.touched.dob && formik.errors.dob ? (
		  <div>{formik.errors.dob}</div>
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
		  <div>{formik.errors.password}</div>
		) : null}
        </div>
  
		<button type="submit">Enviar</button>
	  </form>
	);
  };

export default Formulario;