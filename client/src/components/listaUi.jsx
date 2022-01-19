import * as React from 'react';
import { useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getUser } from "../redux/actions";
import avatar from "../img/recurso11.png" 
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';

export default function ListaUi() {

    const usuarios =  useSelector(state => state.users)
    // const loading = useSelector(state=>state.loading)
    const dispatch = useDispatch()

    // useEffect(() => {
    //     if (!usuarios.length && !loading.loading) {
    //         dispatch(getUser())
    //     }
    // })
  return (
    <List dense sx={{ width: '100%', maxWidth:500, bgcolor: 'black', borderRadius:'10px',boxShadow:'0 15px 40px 0 rgba(0, 0, 0, 0.904), 0 17px 17px 0 rgba(0, 0, 0, .5)',border:'none'}}>
        <div className='contendedor-encabezado'>
            <ListItem >
            <ListItemButton><h4 className='encabezado'>User</h4> </ListItemButton>
            <ListItemButton><h4 className='encabezado'>Nick Name </h4> </ListItemButton>
            </ListItem>
        </div>
        <div className='caja_ranking'>
            {usuarios.map((value) => {
            const labelId = `checkbox-list-secondary-label-${value}`;
            return (
            <div className='casillero'>
            
            <ListItem
                key={value}

                disablePadding
            >
                    
                    <ListItemButton>
                        <ListItemAvatar>
                            <Avatar
                            alt={`Avatar n°${value + 1}`}
                            src={avatar}
                            />
                        </ListItemAvatar>
                        <ListItemText><p className='user'> <StarBorderOutlinedIcon fontSize='large'/> {value.firstName}</p></ListItemText>
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemText> 
                            <div className='nick-junto'>

                                    <p className='nick'>{value.nickName} <span className='label'>
                                        <SportsEsportsOutlinedIcon fontSize='large'/> 
                                    </span></p>
                            
                               

                              
                            </div>
                        </ListItemText>
                    </ListItemButton>
                    
                    </ListItem>
                    </div>
                
            );
            })}
            </div>
        
    </List>
  );
}
