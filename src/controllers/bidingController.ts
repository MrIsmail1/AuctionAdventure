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

WA.state.onVariableChange("productNewPrice").subscribe((newPrice) => {
  fillProductDetails(); // Update HTML with new price
});

// Wait for the API to be ready
WA.onInit()
  .then(async () => {
    console.log("Scripting API ready");

    const fetchProductDetails = async (): Promise<Product | null> => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        const product = data.products[0];
        return {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.images[0],
        };
      } catch (error) {
        console.error("Error fetching product details:", error);
        return null;
      }
    };

    const product = await fetchProductDetails();
    if (product) {
      WA.state.productId = product.id;
      WA.state.productName = product.title;
      WA.state.productPrice = product.price;
      WA.state.productImage = product.image;
    }
    fillProductDetails();
  })
  .catch((e) => console.error(e));

// Fill HTML with product details using WA.state
const fillProductDetails = () => {
  const auctionProduct = document.querySelector(".auction-product");
  if (
    auctionProduct &&
    WA.state.productId &&
    WA.state.productName &&
    WA.state.productPrice &&
    WA.state.productImage
  ) {
    const currentPrice = WA.state.productNewPrice || WA.state.productPrice;
    auctionProduct.innerHTML = `
      <div class="auction-item">
      <img src="${WA.state.productImage}" alt="Product Image" />
      <div class="auction-details">
        <p class="product-name">${WA.state.productName}</p>
        <p class="starting-price">Starting Price: $${WA.state.productPrice}</p>
      </div>
      <div class="auction-details">
        <p class="current-price">Current Price: $${currentPrice.toFixed(2)}</p>
        <p class="time-left">Time Left: 1 day</p>
      </div>
      </div>
    `;
    // Add event listener to the bid form
    const bidForm = document.querySelector("#bid-form");
    if (bidForm) {
      bidForm.addEventListener("submit", (event) => {
        event.preventDefault();
        let bidInput = (bidForm.querySelector("#bid") as HTMLInputElement)
          .value;
        const newBid = parseFloat(bidInput);
        if (!isNaN(newBid)) {
          updateBid(newBid);
        } else {
          console.log("Invalid bid amount.");
        }
      });
    }
  }
};

export {};
