import { useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useHistory } from "react-router-dom";
import Web3Modal from "web3modal";
import { nftaddress, nftmarketaddress } from "../config";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import Nav from "./Nav";
import { Link } from "react-router-dom";
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({
    price: "",
    name: "",
    attack: "",
    defense: "",
  });
  const router = useHistory();

  async function onChange(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }
  async function createMarket() {
    const { name, attack, defense } = formInput;
    // let description = attack + "," + defense;
       if (!name || !fileUrl) return;
     alert("no pasa validación");
    const data = JSON.stringify({
      name,
      description: attack+','+defense,
      image: fileUrl,
    });
    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      createSale(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function createSale(url) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    /* next, create the item */
    let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
    let transaction = await contract.createToken(url);
    let tx = await transaction.wait();
    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();

    const price = ethers.utils.parseUnits(formInput.price, "ether");

    /* then list the item for sale on the marketplace */
    contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();

    transaction = await contract.createMarketItem(nftaddress, tokenId, price, {
      value: listingPrice,
    });
    await transaction.wait();
    router.push("/TiendaNFT");
  }

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

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div className="login-box">
          <div className="form">
            <h2>Crear NFT</h2>

            <div className="user-box">
              <label>Nombre</label>
              <input
                onChange={(e) =>
                  updateFormInput({ ...formInput, name: e.target.value })
                }
              />
            </div>
            <div className="user-box">
              <label>Ataque</label>
              <input
                onChange={(e) =>
                  updateFormInput({ ...formInput, attack: e.target.value })
                }
              />
            </div>
            <div className="user-box">
              <label>Defensa</label>
              <input
                onChange={(e) =>
                  updateFormInput({ ...formInput, defense: e.target.value })
                }
              />
            </div> 
            <div className="user-box">
              <label>Precio en Ethereum</label>
              <input
                onChange={(e) =>
                  updateFormInput({ ...formInput, price: e.target.value })
                }
              />
            </div>
            <div className="user-box">
              <input
                type="file"
                name="Asset"
                className="my-4"
                onChange={onChange}
              />
            </div>
            {fileUrl && <img src={fileUrl} alt="" />}

            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <button type="submit" className="botonn" onClick={createMarket}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Create Digital Asset
              </button>
            </div>
            
            </div>
        </div>
      </div>
    </div>
  );
}
