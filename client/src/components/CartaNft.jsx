import React from "react";
import { useDispatch } from "react-redux";
import muneco from '../img/VECT/bichoazul1.png'
import { addCart } from "../redux/actions";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { nftaddress, nftmarketaddress } from "../config";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
export default function CartaNft({nft}) {
    const dispatch = useDispatch()
    const ataqueDefensa = nft.description.split(",");
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

        <div id='oxonomy' className="carta3d">
            <div id='carta3d' className={`contenido3d  `}>
                <div className="frontCarta logo-carta nft-front">

                </div>
                <div className="backCarta nft-back">
                    <div className="contenedor-imagen">
                        <img src={nft.image} alt="" />
                    </div>
                    <div className="contenido-to">
                        <h1>{nft.name}</h1>
                        <div className="radios">
                            <div className="caracteristicasFondo">
                                <div className="caract">
                                    <i class="fab fa-fort-awesome icono-cart" ></i><span>ataqueDefensa[0]</span>

                                </div>
                                <div className="caract">
                                    <i class="fab fa-gripfire icono-cart"></i><span>ataqueDefensa[1]</span>
                                </div>
                            </div>
                            <div className="precio-carta">
                                eTh${nft.price}
                            </div>
                            <div className="botones">
                                <button className="btn-cart btn-detalle">Ver detalle</button>
                                <button className="btn-cart btn-comprar"  onClick={() => buyNft(nft)}>Comprar</button>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

        </div>





    )
}