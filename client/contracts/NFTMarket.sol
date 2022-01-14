// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol"; //mecanismo de seguridad para proteger transacciones de token
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";

contract NFTMarket is ReentrancyGuard { //aca declaro el contrato, le doy nombre y le coloco la seguridad que importe arriba
  using Counters for Counters.Counter; //para poder contar los , en solidity no se puede trabajar con arrays dinamicos, hay que saber cuantos tiene el array, se puede contart el array a traves de un map o contarlo de esta forma. 
  Counters.Counter private _itemIds; //contar los que hay
  Counters.Counter private _itemsSold; //contar los vendidos 
  address payable owner; //para determinar el dueño del token 
  uint256 listingPrice = 0.025 ether; //este el fee que determinamos para la transacción, a pesar que dice ether (mucho dinero) estamos deployando a la red mainnet lo que quiere decir que esto equivale a 2 centavos de dolar.

  constructor() {
    owner = payable(msg.sender); //el dueño del contrato es el que esta deployando el item
  }

  struct MarketItem { //los datos del token que esta en el mercado
    uint itemId;
    address nftContract;
    uint256 tokenId;
    address payable seller;
    address payable owner;
    uint256 price;
    bool sold;
  }

  mapping(uint256 => MarketItem) private idToMarketItem; //para saber todos los items que estan siendo creados 
//un evento para cuando un item es creado y el front pueda usarlo
  event MarketItemCreated ( 
    uint indexed itemId,
    address indexed nftContract,
    uint256 indexed tokenId,
    address seller,
    address owner,
    uint256 price,
    bool sold
  );

  /* Returns the listing price of the contract */
  function getListingPrice() public view returns (uint256) {
    return listingPrice;
  }
  
  /* Places an item for sale on the marketplace */
  function createMarketItem(
    address nftContract,
    uint256 tokenId,
    uint256 price
  ) public payable nonReentrant {
    require(price > 0, "Price must be at least 1 wei"); //para no ponerlas gratis 
    require(msg.value == listingPrice, "Price must be equal to listing price"); //cuando se paga por el item el precio va en el contrato

    _itemIds.increment();
    uint256 itemId = _itemIds.current();
  
    idToMarketItem[itemId] =  MarketItem(
      itemId,
      nftContract,
      tokenId,
      payable(msg.sender),
      payable(address(0)),
      price,
      false
    );

    IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId); //aqui transferimos el item al mercado usando un metodo del contrato

    emit MarketItemCreated(
      itemId,
      nftContract,
      tokenId,
      msg.sender,
      address(0),
      price,
      false
    );
  }

  /* Creates the sale of a marketplace item */
  /* Transfers ownership of the item, as well as funds between parties */
  function createMarketSale(
    address nftContract,
    uint256 itemId
    ) public payable nonReentrant {
    uint price = idToMarketItem[itemId].price;
    uint tokenId = idToMarketItem[itemId].tokenId;
    require(msg.value == price, "Please submit the asking price in order to complete the purchase");

    idToMarketItem[itemId].seller.transfer(msg.value); //lo vende 
    IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
    idToMarketItem[itemId].owner = payable(msg.sender); //paga el token 
    idToMarketItem[itemId].sold = true; //clasificarlo de vendido 
    _itemsSold.increment(); //contar los vendidos 
    payable(owner).transfer(listingPrice); //transferir al dueño el dinero por la transaccion 
  }

  /* Returns all unsold market items */
  function fetchMarketItems() public view returns (MarketItem[] memory) {
    uint itemCount = _itemIds.current();
    uint unsoldItemCount = _itemIds.current() - _itemsSold.current();
    uint currentIndex = 0;//es cero cuadno esta vacio 

    MarketItem[] memory items = new MarketItem[](unsoldItemCount);
    for (uint i = 0; i < itemCount; i++) {
      if (idToMarketItem[i + 1].owner == address(0)) {
        uint currentId = i + 1;
        MarketItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }

  /* Returns onlyl items that a user has purchased */
  function fetchMyNFTs() public view returns (MarketItem[] memory) {
    uint totalItemCount = _itemIds.current();
    uint itemCount = 0;
    uint currentIndex = 0;

    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].owner == msg.sender) {
        itemCount += 1;
      }
    }

    MarketItem[] memory items = new MarketItem[](itemCount);
    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].owner == msg.sender) {
        uint currentId = i + 1;
        MarketItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }

  /* Returns only items a user has created */
  function fetchItemsCreated() public view returns (MarketItem[] memory) {
    uint totalItemCount = _itemIds.current();
    uint itemCount = 0;
    uint currentIndex = 0;

    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].seller == msg.sender) {
        itemCount += 1;
      }
    }

    MarketItem[] memory items = new MarketItem[](itemCount);
    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].seller == msg.sender) {
        uint currentId = i + 1;
        MarketItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }
}