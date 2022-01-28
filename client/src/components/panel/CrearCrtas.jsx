import React, { useState, useEffect } from "react";
import { useFormik } from "formik";

import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";

import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import huevoRojo from "../../img/huevoRojo.png"
import huevoVerde from "../../img/huevoVerde.png";
import { postCardNormal } from "../../redux/actions";


const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Nombre obligatorio.";
  } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/i.test(values.name)) {
    errors.name = "El nombre solo puede contener letras y espacios.";
  }

  if (!values.attack) {
    errors.attack = "attack obligatoria.";
  } 
  else if (values.attack < 1) {
    errors.attack =
      "attack debe ser mayor a 0";
  }
  
  else if (!/^[0-9]+$/ .test(values.attack)) {
    errors.attack =
      "Solo puedes colocar numeros enteros";
  }

  if (!values.defense) {
    errors.defense = "defense obligatoria.";
  } 
  else if (values.defense < 1) {
    errors.defense =
      "defense debe ser mayor a 0";
  }
  
  else if (!/^[0-9]+$/ .test(values.defense)) {
    errors.defense =
      "Solo puedes colocar numeros enteros";
  }

  if (!values.sellPrice) {
    errors.sellPrice = "precio obligatoria.";
  } 
  else if (values.sellPrice < 1) {
    errors.sellPrice =
      "precio debe ser mayor a 0";
  }
  
  else if (!/^[0-9]+$/ .test(values.sellPrice)) {
    errors.sellPrice =
      "Solo puedes colocar numeros enteros";
  }

  if (!values.img) {
    errors.img = "img obligatoria.";
  }
  

  return errors;
};



export default function CrearCarta() {
 
  const dispatch = useDispatch();
  const history = useHistory();
  const addCard = useSelector((state) => state.addCard);
  const [carta, setcarta] = useState(false);
  const [ojo, setojo] = useState(false);
  const switchShown = () => setojo(!ojo);
 

  

  const formik = useFormik({
    initialValues: {
      
      name: "",
      attack: "",
      defense: "",
      img:"",
      sellPrice:"",
      state: "activa",
      type: "legendary",
      sellCount: 1,
    },
    validate,
    onSubmit: async (values) => {
      setcarta(true);
      console.log('valores....',values)
      dispatch(postCardNormal(values))
     
    },
  });

  useEffect(() => {
    if (carta && addCard) {
      Swal.fire({
        imageUrl: `${huevoVerde}`,
        title: "Carta Creada",
        width: 500,
        confirmButtonText: "Continuar",
        imageWidth: 300,
        imageHeight: 400,
        timer: 3000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      setTimeout(() => {
				formik.resetForm()

			}, 3000);
    

      setcarta(false);
    }

    if (carta && !addCard) {
      Swal.fire({
        title: "<strong>La carta no pudo ser creada</strong>",
        imageUrl: `${huevoRojo}`,
        width: 500,
        imageWidth: 300,
        imageHeight: 400,
      });
    }
  }, [addCard,carta]);

 

  return (
    <div>
     
      <div className="contenedor-cheto container-log">
        <div className="login-box">
          <form className="formulario" onSubmit={formik.handleSubmit}>
            <h2>Crear Cartas</h2>

            <div className="user-box">
              <label htmlFor="name">Nombre</label>
              <input
                id="name"
                name="name"
                type="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="campoErr">
                  <ErrorOutlineOutlinedIcon />
                  {formik.errors.name}
                </div>
              ) : null}
            </div>

            <div className="user-box">
              <label htmlFor="attack">Attack</label>
              <div style={{ display: "flex" }}>
                <input
                  id="attack"
                  name="attack"
                  type= "attack"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.attack}
                />
               
              </div>
              {formik.touched.attack && formik.errors.attack ? (
                <div className="campoErr">
                  <ErrorOutlineOutlinedIcon />
                  {formik.errors.attack}
                </div>
              ) : null}
            </div>

            

            <div className="user-box">
              <label htmlFor="defense">Defense</label>
              <div style={{ display: "flex" }}>
                <input
                  id="defense"
                  name="defense"
                  type= "defense"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.defense}
                />
               
              </div>
              {formik.touched.defense && formik.errors.defense ? (
                <div className="campoErr">
                  <ErrorOutlineOutlinedIcon />
                  {formik.errors.defense}
                </div>
              ) : null}
            </div>

            <div className="user-box">
              <label htmlFor="sellPrice">Precio en Pesos</label>
              <div style={{ display: "flex" }}>
                <input
                  id="sellPrice"
                  name="sellPrice"
                  type= "sellPrice"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.sellPrice}
                />
               
              </div>
              {formik.touched.sellPrice && formik.errors.sellPrice ? (
                <div className="campoErr">
                  <ErrorOutlineOutlinedIcon />
                  {formik.errors.sellPrice}
                </div>
              ) : null}
            </div>

            <div className="user-box">
              <label htmlFor="img">Img Url</label>
              <div style={{ display: "flex" }}>
                <input
                  id="img"
                  name="img"
                  type= "img"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.img}
                />
               
              </div>
              {formik.touched.img && formik.errors.img ? (
                <div className="campoErr">
                  <ErrorOutlineOutlinedIcon />
                  {formik.errors.img}
                </div>
              ) : null}
            </div>

           
          
              
           
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
             
              <div>
              <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
               
                  <button  type="submit" className="botonn">Crear Carta</button>
                
              </div>
            </div>
          </form>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2rem",
            }}
          >
           
          </div>
        </div>
      </div>
    </div>
  );
}