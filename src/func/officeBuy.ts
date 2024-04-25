/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

const officeBuy = document.getElementById("officeBuy") as HTMLTextAreaElement;

// Define Product interface
interface Product {
  id: number;
  title: string;
  price: number;
  image: string[];
}

// Function to update WA.state with new bid and new price
const updateBid = (newBid: number) => {
  if (newBid > WA.state.productPrice) {
    WA.state.productNewPrice = newBid;
  } else {
    console.log("Bid must be higher than the current price.");
  }
};

// Wait for the API to be ready
WA.onInit()
  .then(async () => {
    const products = WA.state.productList;
    if (products) {
      fillProductDetails(products);
    }
  })
  .catch((e) => console.error(e));

const fillProductDetails = (products) => {
  const auctionProductsContainer = document.querySelector("#officeBuy");
  if (auctionProductsContainer) {
    auctionProductsContainer.innerHTML = ""; // Clear previous products
    products.forEach((product: Product) => {
      const auctionProduct = document.createElement("div");
      auctionProduct.classList.add("auction-item");
      let price = parseFloat(product.price);
      auctionProduct.innerHTML = `
            <img src="${product.image}" alt="Product Image" />
            <div class="auction-details">
              <p class="product-name">${product.title}</p>
              <p class="starting-price">Starting Price: $${product.price}</p>
            </div>
            <div class="auction-details">
              <p class="current-price">Current Price: $${price.toFixed(2)}</p>
              <p class="time-left">Time Left: 1 day</p>
            </div>
            <button class="product-in-auction" data-product-id="${
              product.id
            }">Auction</button>
          `;
      auctionProductsContainer.appendChild(auctionProduct);

      // Add event listener to the bid button
      const inAuctionButton = auctionProduct.querySelector(
        ".product-in-auction"
      );
      inAuctionButton.addEventListener("click", () => {
        if (WA.state.productInAuction) {
          console.log("Another product is already in auction.");
          return;
        }
        WA.room.showLayer("Car" + product.id);
        WA.state.productInAuction = true;
        WA.state.productId = product.id;
        WA.state.productName = product.title;
        WA.state.productPrice = product.price;
        WA.state.productImage = product.image;
      });
    });
  }
};

export {};
