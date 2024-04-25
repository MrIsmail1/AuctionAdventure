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
  
  // Function to fetch product details from API
  const fetchProductDetails = async (): Promise<Product[] | null> => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      if (!response.ok) {
        throw new Error("Failed to fetch product details");
      }
      const data = await response.json();
      const products: Product[] = data.products.map((product: any) => ({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.images[0],
      }));
      return products;
    } catch (error) {
      console.error("Error fetching product details:", error);
      return null;
    }
  };
  
  // Wait for the API to be ready
  WA.onInit()
    .then(async () => {
      console.log("officeBuy.ts is ready.");
  
      const products = await fetchProductDetails();
      if (products) {
        WA.state.officeBuyValue = products;
      }
      fillProductDetails(WA.state.officeBuyValue);
    })
    .catch((e) => console.error(e));
  
  // Fill HTML with product details using WA.state
  const fillProductDetails = (products) => {
    const auctionProductsContainer = document.querySelector("#officeBuy");
    if (auctionProductsContainer) {
      auctionProductsContainer.innerHTML = ""; // Clear previous products
      products.forEach((product: Product) => {
        const auctionProduct = document.createElement("div");
        auctionProduct.classList.add("auction-item");
        auctionProduct.innerHTML = `
          <img src="${product.image}" alt="Product Image" />
          <div class="auction-details">
            <p class="product-name">${product.title}</p>
            <p class="starting-price">Starting Price: $${product.price}</p>
          </div>
          <div class="auction-details">
            <p class="current-price">Current Price: $${product.price.toFixed(2)}</p>
            <p class="time-left">Time Left: 1 day</p>
          </div>
        `;
        auctionProductsContainer.appendChild(auctionProduct);
      });
    
    console.log(auctionProductsContainer);
  };
  
  // Add event listener to the bid form
  WA.room.onEnterZone('auction_zone', () => {
    const bidForm = document.querySelector("#bid-form");
    if (bidForm) {
      bidForm.addEventListener("submit", (event) => {
        event.preventDefault();
        let bidInput = (bidForm.querySelector("#bid") as HTMLInputElement).value;
        const newBid = parseFloat(bidInput);
        if (!isNaN(newBid)) {
          updateBid(newBid);
        } else {
          console.log("Invalid bid amount.");
        }
      });
    }
  });
}
  export {};