/// <reference types="@workadventure/iframe-api-typings" />

// Define Product interface
interface Product {
  id: number;
  title: string;
  price: number;
  image: string[];
}

// Wait for the API to be ready
WA.onInit()
  .then(async () => {
    const products = await WA.state.loadVariable("productList");
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
      let price =
        parseFloat(product.price) || parseFloat(WA.state.productNewPrice);
      auctionProduct.innerHTML = `
            <img src="${product.image}" alt="Image du produit" />
            <div class="auction-details">
              <p class="product-name">${product.title}</p>
              <p class="starting-price">Prix de départ : ${product.price}€</p>
            </div>
            <div class="auction-details">
              <p class="current-price">Prix actuel : ${price.toFixed(2)}€</p>
              <p class="time-left">Temps restant : 1 jour</p>
            </div>
            <button class="in-auction-button" data-product-id="${product.id}">Enchérir</button>
            <button class="sell-button" data-product-id="${product.id}">Vendre</button>
          `;
      auctionProductsContainer.appendChild(auctionProduct);

      // Add event listener to the in auction button
      const inAuctionButton = auctionProduct.querySelector(
        `.in-auction-button[data-product-id="${product.id}"]`
      );
      inAuctionButton.addEventListener("click", () => {
        if (WA.state.productInAuction) {
          console.log("Another product is already in auction.");
          return;
        }
        WA.state.saveVariable("showCar", true);
        WA.chat.sendChatMessage(
          "Une nouvelle enchère a été lancée sur " +
            product.title +
            " à " +
            product.price +
            "€. Venez participer à la vente aux enchères !",
          { scope: "local", author: WA.player.state.master ?? "System" }
        );
        WA.room.showLayer("Car" + product.id);
        WA.state.productInAuction = true;
        WA.state.productId = product.id;
        WA.state.productName = product.title;
        WA.state.productPrice = product.price;
        WA.state.productImage = product.image;
      });

      // Add event listener to the sell button
      const sellButton = auctionProduct.querySelector(
        `.sell-button[data-product-id="${product.id}"]`
      );
      sellButton.addEventListener("click", () => {
        WA.room.hideLayer("Car" + product.id);
        // Clear states and set productInAuction to false
        WA.state.productInAuction = false;
        WA.state.productId = null;
        WA.state.productName = null;
        WA.state.productPrice = null;
        WA.state.productImage = null;
      });
    });
  }
};

export {};
