import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import axios from "axios";
import { nftaddress, nftmarketaddress } from "../config";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts//contracts/NFTMarket.sol/NFTMarket.json";
import CardNFT from "./NFTcard";

let rpcEndpoint = null;

if (process.env.NEXT_PUBLIC_WORKSPACE_URL) {
  rpcEndpoint = process.env.NEXT_PUBLIC_WORKSPACE_URL;
}

export default function TiendaNFT() {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    loadNFTs();
  }, []);
  async function loadNFTs() {
    //funcion para cargar los nft
    const provider = new ethers.providers.JsonRpcProvider(rpcEndpoint);
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const marketContract = new ethers.Contract(
      nftmarketaddress,
      Market.abi,
      provider
    );
    const data = await marketContract.fetchMarketItems();
    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          itemId: i.itemId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      })
    );
    console.log(items); //estos son los items en venta
    setNfts(items);
    setLoadingState("loaded");
  }

  return (
    <div>
      <Nav />
      <div className="contenedor-tienda">
        <div className="navContainerNFT">
          <Link to="/TiendaNFT">
            <span
              className={
                window.location.pathname === "/TiendaNFT" ? "activo" : null
              }
            >
              Home
            </span>
          </Link>
          <Link to="/CrearNFT">
            <span
              className={
                window.location.pathname === "/CrearNFT" ||
                window.location.pathname === "/Carrito"
                  ? "activo"
                  : null
              }
            >
              CrearNFT
            </span>
          </Link>
          <Link to="/MisNFT">
            <span
              className={
                window.location.pathname === "/MisNFT" ? "activo" : null
              }
            >
              Mis NFT
            </span>
          </Link>
          <Link to="/TableroNFT">
            <span
              className={
                window.location.pathname === "/TableroNFT" ? "activo" : null
              }
            >
              TableroNFT
            </span>
          </Link>
        </div>
        {loadingState === "laoded" && !nfts.length ? (
          <h1>No items in the marketplace</h1>
        ) : (
          <div className="contenedor-tajetas">
            <div className="grid-tienda">
              {nfts.map((nft) => (
                <CardNFT name={nft.name} nft={nft} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
