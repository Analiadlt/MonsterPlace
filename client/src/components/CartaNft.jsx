import React from "react";
import { useDispatch } from "react-redux";
import { linkUserNFTcard } from "../redux/actions";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { nftaddress, nftmarketaddress } from "../config";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useMoralis } from "react-moralis";
export default function CartaNft({ nft, transaccion }) {
    const { user } = useMoralis();
    const dispatch = useDispatch()
    const ataqueDefensa = nft.description.split(",");
    const router = useHistory();
    async function loadNFTs() {
        const web3Modal = new Web3Modal({
          network: "mainnet",
          cacheProvider: true,
        });
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const marketContract = new ethers.Contract(
          nftmarketaddress,
          Market.abi,
          signer
        );
        const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
        const data = await marketContract.fetchMyNFTs();
    
        const items = await Promise.all(
          data.map(async (i) => {
            const tokenUri = await tokenContract.tokenURI(i.tokenId);
            const meta = await axios.get(tokenUri);
            let price = ethers.utils.formatUnits(i.price.toString(), "ether");
            let item = {
              price,
              tokenId: i.tokenId.toNumber(),
              seller: i.seller,
              owner: i.owner,
              image: meta.data.image,
              description: meta.data.description,
            };
            return item;
          })
        );
        console.log(items);

        const datosfiltrados = items.map((g) => {
            return {
             owner:g.owner,
              nftContract: g.nftContract,
              
              };
            });
            dispatch(linkUserNFTcard(datosfiltrados))
                   
     }

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
    
    await loadNFTs()
    router.push("/TiendaNFT")    
    }

    return (

        <div id='oxonomy' className="carta3d">
            <div id='carta3d' className={`contenido3d  girar`}>
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
                                    <i class="fab fa-fort-awesome icono-cart" ></i><span>{ataqueDefensa[0]}</span>

                                </div>
                                <div className="caract">
                                    <i class="fab fa-gripfire icono-cart"></i><span>{ataqueDefensa[1]}</span>
                                </div>
                            </div>
                            <div className="precio-carta">
                                eTh${nft.price}
                            </div>
                            {transaccion === 'compra' ?
                                <div className="botones">
                                    <button className="btn-cart btn-detalle">Ver detalle</button>
                                    <button className="btn-cart btn-comprar" onClick={() => buyNft(nft)}>Comprar</button>
                                </div>
                                :
                                <div className="botones">
                                    <button className="btn-cart btn-detalle">Ver detalle</button>
                                    <button className="btn-cart btn-comprar" onClick={() => buyNft(nft)}>Vender</button>
                                </div>
                            }
                        </div>
                    </div>

                </div>
            </div>

        </div>





    )
}