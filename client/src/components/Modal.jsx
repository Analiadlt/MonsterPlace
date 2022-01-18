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
const style = {
    position: 'absolute',
    top: '50%',
    left: '70%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    maxheight: 800,
    bgcolor: 'black',
    borderRadius:"5px",
    boxShadow: 24,
    p: 4,
};

export default function Modal1() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const carrito = useSelector(state => state.carrito)
    const dispatch = useDispatch()
    const history = useHistory()
    function sumarCarrito(carrito) {
        let total = 0;
        for (let i = 0; i < carrito.length; i++) {
            total += Math.round(carrito[i].sellPrice);
        }
        return Math.round(total);
    }
    return (
        <div>
            
            <h3 className="carrito" onClick={handleOpen} ><span className="carrito-num" >{carrito.length}</span><ShoppingBasketIcon fontSize="5rem" /></h3>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <span style={{color:"red",position:"relative",left:"95%", cursor:'pointer'}} onClick={handleClose}> <CloseIcon fontSize='large'/></span>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <h1 className='titulo-modal'>Carrito <span><AddShoppingCartOutlinedIcon fontSize="large" /></span></h1>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <ul className='container-modal  caja_modal' >
                            {carrito.length === 0?
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}><h3 style={{textAlign:'left',fontWeight:"normal"}}> Carrito Vacio</h3></Typography>:
                            
                            
                                carrito.map(dragon =>
                                    <ListItem
                                    
                                        disablePadding
                                    >
                                        <div className="modal-contenido">
                                        <ListItemButton>
                                            <ListItemAvatar>
                                                <Avatar
                                                    src={dragon.img}
                                                />
                                            </ListItemAvatar>
                                            <ListItemText><p  style={{color:'white', textTransform:'uppercase', textAlign:'left'}}>{dragon.name}</p></ListItemText>
                                        </ListItemButton>
                                        <ListItemButton>
                                            <ListItemText>
                                                <div className='nick-junto'>

                                                    <p className='precio-modal'>${dragon.sellPrice} 
                                                        <span className='label-modal' onClick={()=>dispatch(removeCart(dragon.name))}>

                                                            <DeleteForeverIcon fontSize='large'/>
                                                        </span>
                                                    </p>




                                                </div>
                                            </ListItemText>
                                        </ListItemButton>
                                        </div>

                                    </ListItem>

                                )
                            }
                        </ul>

                        <div className='total-modal'>
                            <h1>Total</h1>
                            <h3>$  {sumarCarrito(carrito)}</h3>
                        </div>

                    </Typography>
                    <button className='btn-modal' onClick={()=>history.push('/Compra')}>Ver Detalle</button>
                </Box>
            </Modal>
        </div>
    );
}

