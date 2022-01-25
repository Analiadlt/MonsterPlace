import { useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useHistory } from "react-router-dom";
import Web3Modal from "web3modal";
import { nftaddress, nftmarketaddress } from "../../config";
import NFT from "../../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import NavCheto from "../NavCheto";
import { Link } from "react-router-dom";
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

function validate(formInput) {
  let errorValidate = {};
  var letters = /^[A-Za-z]+$/;

  if (!formInput.name.trim()) {
    errorValidate.name = "Name required";
  } else if (formInput.name.length > 30) {
    errorValidate.name = "Name too long. Maximun 30 characters";
  } else if (!formInput.name.match(letters)) {
    errorValidate.name = "Only letters allowed";
  } else if (!formInput.attack) {
    errorValidate.attack = "attack is required";
  } else if (isNaN(parseInt(formInput.attack))) {
    errorValidate.attack = "attack must be a number";
  } else if (formInput.attack <= 0) {
    errorValidate.attack = "attack must be greather than 0";
  } else if (!formInput.defense) {
    errorValidate.defense = "defense is required";
  } else if (isNaN(parseInt(formInput.defense))) {
    errorValidate.defense = "defense must be a number";
  } else if (formInput.defense <= 0) {
    errorValidate.defense = "defense must be greather than 0";
  }

  return errorValidate;
}

export default function CrearCarta() {
  const [fileUrl, setFileUrl] = useState(null);
  const [error, setError] = useState({});
  const [formInput, updateFormInput] = useState({
    price: "",
    name: "",
    attack: "",
    defense: "",
  });
  const router = useHistory();



 

  return (
    <div>

      <div
        className="navContainerNFT"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        
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
            <h2>Crear Cartas</h2>

            <div className="user-box">
              <label>Nombre</label>
              <input
                onChange={(e) =>
                  updateFormInput({ ...formInput, name: e.target.value })
                }
              />
              {error.name && (
                <p className="campoErr">
                  {" "}
                  <ErrorOutlineOutlinedIcon />
                  {error.name}
                </p>
              )}
            </div>
            <div className="user-box">
              <label>Ataque</label>
              <input
                onChange={(e) =>
                  updateFormInput({ ...formInput, attack: e.target.value })
                }
              />
              {error.attack && (
                <p className="campoErr">
                  {" "}
                  <ErrorOutlineOutlinedIcon />
                  {error.attack}
                </p>
              )}
            </div>
            <div className="user-box">
              <label>Defensa</label>
              <input
                onChange={(e) =>
                  updateFormInput({ ...formInput, defense: e.target.value })
                }
              />
              {error.defense && (
                <p className="campoErr">
                  {" "}
                  <ErrorOutlineOutlinedIcon />
                  {error.defense}
                </p>
              )}
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
              <button type="submit" className="botonn">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Crear Carta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}