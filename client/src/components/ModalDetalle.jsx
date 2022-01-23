import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useSelector, useDispatch } from 'react-redux';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { removeCart } from '../redux/actions';
import CloseIcon from '@mui/icons-material/Close';
import { useHistory } from "react-router-dom";
import dragon from '../img/recurso1.png'
const style = {
    position: 'absolute',
    top: '50%',
    left: '90%',
    transform: 'translate(-100%, -50%)',
    width: '80%',
    height: '700px',
    bgcolor: 'black',
    borderRadius: "10px",
    boxShadow: 24,
    padding: '5px 40px',
};

export default function DetalleDr({ img, attack, defense, type, name}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const carrito = useSelector(state => state.carrito)
    const dispatch = useDispatch()
    const history = useHistory()

    return (
        <div>
            
            <a onClick={handleOpen} >Ver Detalle</a>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                
                <Box sx={style}>
                <span style={{color:"red",position:"relative",left:"98%", top:'20px', cursor:'pointer'}} onClick={handleClose}> <CloseIcon fontSize='large'/></span>
                    <div className="contenedor-pokemon">
                        <div className="pokemon-imagen">
                            <img src={img} className="img-list" alt="" />
                        </div>
                        <div className="pokemon-contenido">
                            <h2 className="pokemon_nombre titi" >{name}</h2>
                            <h2 className="general-titulo">informacion general</h2>
                            <div className="informacion-general">
                                    <h2>Tipo: </h2>
                                    <h2 className='tipo-'>{type}</h2>
                            </div>

                            <h2 className="general-titulo">Habilidades</h2>
                            <div className="habilidad">
                                <div>
                                    <h3>Defensa: </h3>
                                    <progress className="progress" max="100" value= {defense} />
                                    <span>{defense}</span>
                                </div>
                                <div>
                                    <h3 className="habilidad-titulo">Ataque: </h3>
                                    <div className="habilidades">

                                        <progress className="progress" max="100" value={attack} />
                                        <span>{attack}</span>
                                    </div>
                                </div>

                            </div>
                            <button className='boton-detalle'>Agregar al Carrito</button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
