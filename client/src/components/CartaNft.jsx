import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { linkUserNFTcard } from "../redux/actions";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { nftaddress, nftmarketaddress } from "../config";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useMoralis } from "react-moralis";
import Swal from "sweetalert2";
import huevoRojo from "../img/huevoRojo.png";


export default function CartaNft({ nft, transaccion }) {
  const { isAuthenticated} = useMoralis();
  const usuario = useSelector((state) => state.userLogueado);
  const dispatch = useDispatch();
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
          nftContract: i.nftContract,
        };
        return item;
      })
    );
    console.log(items);

    const datosfiltrados = items.slice(-1).map((g) => {
      return {
        email: usuario.email,
        nftContract: g.nftContract,
      };
    });
    dispatch(linkUserNFTcard(datosfiltrados[0]));
  }
  async function buyNft(nft) {
    //para conectar la wallet
    console.log('dentro de buy')
    if(!usuario.email){
      Swal.fire({
          imageUrl: `${huevoRojo}`,
          title: "<strong>Debes loguearte para poder comprar</strong>",
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
  }
    if(isAuthenticated === false ){
        // alert("Debes hacer login o conectar la wallet para poder ejecutar compra")

        // router.push("/Login");
        Swal.fire({
          imageUrl: `${huevoRojo}`,
          title: "<strong>Debes conectar la wallet para compra</strong>",
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
    } 
    else {
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
    await loadNFTs();
    router.push("/TiendaNFT");
    }
  }

  return (
    <div id="oxonomy" className="carta3d">
      <div id="carta3d" className={`contenido3d  girar`}>
        <div className="frontCarta logo-carta nft-front"></div>
        <div className="backCarta nft-back">
          <div className="contenedor-imagen">
            <img src={nft.image} alt="" />
          </div>
          <div className="contenido-to">
            <h1>{nft.name}</h1>
            <div className="radios">
              <div className="caracteristicasFondo">
                <div className="caract">
                  <i class="fab fa-fort-awesome icono-cart"></i>
                  <span>{ataqueDefensa[0]}</span>
                </div>
                <div className="caract">
                  <i class="fab fa-gripfire icono-cart"></i>
                  <span>{ataqueDefensa[1]}</span>
                </div>
              </div>
              <div className="precio-carta">ETH ${nft?.price}</div>
              {transaccion === "compra" ? (
                <div className="botones">
                  <button className="btn-cart btn-detalle">Ver detalle</button>
                  <button
                    className="btn-cart btn-comprar"
                    onClick={() => buyNft(nft)}
                  >
                    Comprar
                  </button>
                </div>
              ) : (
                <div className="botones">
                  <button className="btn-cart btn-detalle">Ver detalle</button>
                  <button
                    className="btn-cart btn-comprar"
                    onClick={() => buyNft(nft)}
                  >
                    Vender
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
