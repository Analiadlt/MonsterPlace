import React from "react";
import dragon from '../img/bichorojo.png'
import DetalleDr from "./ModalDetalle";
import { Link } from "react-router-dom";
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { useDispatch } from "react-redux";
import { addCart } from "../redux/actions";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { nftaddress, nftmarketaddress } from "../../config";
import Market from "../../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

export default function CartaTienda({ img, name, attack, defense, efect, price, type, botones }) {
    const dispatch = useDispatch()
    // const ataqueDefensa = nfts.description.split(",");
    async function buyNft(nft) {
        //para conectar la wallet
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);
        const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
        const transaction = await contract.createMarketSale(
          nftaddress,
          nft.itemId,
          {
            value: price,
          }
        );
        await transaction.wait();
      }
    
    
    
    return (

        <div id={name} className="carta3d">
            <div id='carta3d' className={`contenido3d ${efect} girar`}>
                <div className="frontCarta logo-carta">
                    q
                </div>
                <div className="backCarta">
                    <div className="contenedor-imagen">
                        <img src={img} alt="" />
                    </div>
                    <div className="contenido-to">
                        <h1>{name}</h1>
                        <div className="radios">
                            <div className="caracteristicasFondo">
                                <div className="caract">
                                    <i class="fab fa-fort-awesome icono-cart"></i><span>{defense}</span>

                                </div>
                                <div className="caract">
                                    <i class="fab fa-gripfire icono-cart"></i><span>{attack}</span>
                                </div>
                            </div>
                            <div className="precio-carta">
                                Ars${price}
                            </div>
                            { botones === true ? 
                            <div className="botones">
                                <button className="btn-cart btn-detalle"><DetalleDr name={name} attack={attack} defense={defense} img={img} type={type} /></button>
                                
                                <button className="btn-cart btn-comprar" onClick={() => dispatch(addCart(name))}>Comprar</button>
                                {/* <button
                className="btn-gl btn-comprar"
                onClick={() => buyNft(nft)}
              >
                Buy{" "}
              </button> */}
                            </div> : null
                            }
                        </div>
                    </div>

                </div>
            </div>

        </div>





    )

}
