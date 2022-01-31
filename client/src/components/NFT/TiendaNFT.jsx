import React, { useEffect, useState } from "react";
import NavCheto from "../NavCheto";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CartaFondo from "../juego/FondoCarta";
import { ethers } from "ethers";
import axios from "axios";
import { nftaddress, nftmarketaddress } from "../../config";
import NFT from "../../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import CartaNft from "../CartaNft";
import { useDispatch } from "react-redux";
import { postCardNFT ,getCard } from "../../redux/actions";
import CartaTienda from '../cartaTienda'

let rpcEndpoint = null;

if (process.env.NEXT_PUBLIC_WORKSPACE_URL) {
  rpcEndpoint = process.env.NEXT_PUBLIC_WORKSPACE_URL;
}

export default function TiendaNFT() {
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const dragones = useSelector(state => state.dragonesbd)
  useEffect(() => {
         try{
          dispatch(getCard())
        loadNFTs();
        }catch{
          console.log('no server')
        } 
  }, []);
  async function loadNFTs() {
    //funcion para cargar los nft
    try {
      const provider = new ethers.providers.JsonRpcProvider(rpcEndpoint);
      const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
      const marketContract = new ethers.Contract(
        nftmarketaddress,
        Market.abi,
        provider
      );
      const data = await marketContract?.fetchMarketItems();
      const items = await Promise.all(
        data.map(async (i) => {
          const tokenUri = await tokenContract?.tokenURI(i.tokenId);
          const meta = await axios.get(tokenUri);
          let price = ethers.utils?.formatUnits(i.price.toString(), "ether");
          let item = {
            price,
            itemId: i.itemId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: meta.data.image,
            name: meta.data.name,
            description: meta.data.description,
            nftContract: i.nftContract
          };
          return item;
        })
      );

      //logica limpieza de datos: 
      const datosfiltrados = items.map((g) => {
        return {
          name: g?.name,
          description: g?.description.split(","),
          img: g?.image,
          nftContract: g?.nftContract,
          sellPrice: g?.price,
          createdNFT: true,
        };
      });
      dispatch(postCardNFT(datosfiltrados))
      setNfts(items);
      setLoadingState("loaded");
    } catch {
      return setNfts([])
    }
  }

  return (
    <div>
      <NavCheto />
      <div className="nav-tienda">
        <h3
          className={`tiendaNft ${window.location.pathname === "/Tienda" ? "activoTienda" : null
            }`}
        >
          <Link to="/Tienda" className="link-tienda">
            Crypis
          </Link>
        </h3>
        <h3
          className={`tiendaNft ${window.location.pathname === "/TiendaNft" ? "activoTienda" : null
            }`}
        >
          <Link to="/TiendaNft" className="link-tienda">
            NFT
          </Link>
        </h3>
      </div>
      {/*             <div className="muestra contenedor-cheto" >
        <CartaFondo name={dragones[0]?.name} attack={dragones[0]?.attack} defense={dragones[0]?.defense} img={dragones[0]?.img} price={dragones[0]?.sellPrice} type={dragones[0]?.type} efect={'cine'}/>

    </div> */}
      <div className="background-tienda">
        <div className="contenedor-tienda">
          <div className="titulo-tienda">
            <h1>Tienda NFT</h1>
          </div>
          <div className="contenedor-tajetas">
            <div className="grid-tienda">
              {nfts?.map((nft, i) => (
                <div key={i} className="cart-tienda">
                  <CartaNft key={i} nft={nft} transaccion={"compra"} />
                </div>
              ))}

              {
                dragones.map((dragon, i) => (
                  dragon.createdNFT === true ?
                    <div key={i} className="cart-tienda">

                      <CartaTienda key={i} name={dragon.name} attack={dragon.attack} defense={dragon.defense} img={dragon.img} price={dragon.sellPrice} botones={true} type={'nft'} />
                    </div>
                    : null
                ))
              }
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
