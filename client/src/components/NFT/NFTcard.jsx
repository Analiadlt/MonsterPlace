import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { nftaddress, nftmarketaddress } from "../../config";
import Market from "../../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
export default function Card({ nft }) {
  const loading = useSelector((state) => state.loading);
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
    <div>
      <div className="card">
        <div className="fondo">
          {loading.loading ? (
            <h1>Cargando...</h1>
          ) : (
            <img src={nft.image} alt="" className="card_img" />
          )}
        </div>
        <div className="card-contenido">
          <h3 className="card-nombre">{nft.name}</h3>
          <div className="card-grid">
            <div className="caracteristicas">
              <div className="carac">
                <h3>Ataque:</h3>
                <span>{ataqueDefensa[0]}</span>
              </div>
              <div className="carac">
                <h3>Defensa:</h3>
                <span>{ataqueDefensa[1]}</span>
              </div>
            </div>
            <div className="precio">
              <h3>Precio:</h3>
              <span>{nft.price} ETH</span>
            </div>
          </div>
          <div className="btn-card">
            <button className="btn-gl btn-ver-detalle">Ver Detalle</button>
            {window.location.pathname === "/" ? (
              <button className="btn-gl btn-comprar">
                <Link to="/TiendaNFT" className="links">
                  Tienda{" "}
                  <span style={{ position: "relative", top: "3px" }}>
                    <LocalMallOutlinedIcon fontSize="large" />
                  </span>
                </Link>{" "}
              </button>
            ) : (
              <button
                className="btn-gl btn-comprar"
                onClick={() => buyNft(nft)}
              >
                Buy{" "}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
