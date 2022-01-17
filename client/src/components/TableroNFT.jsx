import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import { nftmarketaddress, nftaddress } from "../config";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts//contracts/NFTMarket.sol/NFTMarket.json";
import Nav from "./Nav";
import { Link } from "react-router-dom";

export default function CreatorDashboard() {
  const [nfts, setNfts] = useState([]);
  const [sold, setSold] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    loadNFTs();
  }, []);
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
    const data = await marketContract.fetchItemsCreated();

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
          sold: i.sold,
          image: meta.data.image,
        };
        return item;
      })
    );
    /* create a filtered array of items that have been sold */
    const soldItems = items.filter((i) => i.sold);
    setSold(soldItems);
    setNfts(items);
    setLoadingState("loaded");
  }
  if (loadingState === "loaded" && !nfts.length)
    return <h1>No assets created</h1>;
  return (
    <div>
      <Nav />
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
            className={window.location.pathname === "/MisNFT" ? "activo" : null}
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
      <div>
        <h2>Items Created</h2>
        <div>
          {nfts.map((nft, i) => (
            <div key={i}>
              <img src={nft.image} alt="" />
              <div>
                <p>Price - {nft.price} Eth</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        {Boolean(sold.length) && (
          <div>
            <h2>Items sold</h2>
            <div>
              {sold.map((nft, i) => (
                <div key={i}>
                  <img src={nft.image} alt="" />
                  <div>
                    <p>Price - {nft.price} Eth</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
