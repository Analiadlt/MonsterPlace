// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds; //para que pueda incrementa el contador del id del token
    address contractAddress;

    constructor(address marketplaceAddress) ERC721("Metaverse Tokens", "METT") {
        contractAddress = marketplaceAddress; // el constructor con la dirección del market
    }

    function createToken(string memory tokenURI) public returns (uint) {
        _tokenIds.increment(); //ejecutamos el incremento 
        uint256 newItemId = _tokenIds.current(); //crea la variable new id y la cuenta

        _mint(msg.sender, newItemId); //el mensaje del creador y el id 
        _setTokenURI(newItemId, tokenURI); //aca guarda el token en el storage del contrato 
        setApprovalForAll(contractAddress, true); //IMPORTANTE: le da la aprobación al mercado para hacer transacciones con el token
        return newItemId; //retorno el id para que el front pueda interactuar con el y pueda venderlo
    }
}