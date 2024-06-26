// Function to update WA.state with new bid and new price
const updateBid = (newBid: number) => {
  if (newBid > WA.state.productPrice) {
    WA.state.productNewPrice = newBid;
    WA.players.configureTracking();
    const players = WA.players.list();
    for (const play of players) {
      play.outlineColor;
    }
    let author: string = WA.player.name;
    WA.chat.sendChatMessage(
      author + " a émis une nouvelle enchère à " + newBid + "$",
      { scope: "local", author: WA.player.state.master ?? "System" }
    );
    const duration = 3000;
    WA.player.setOutlineColor(255, 255, 30);
    setTimeout(() => {
      WA.player.removeOutlineColor();
    }, duration);
  } else {
    WA.chat.sendChatMessage("Une offre plus élevée existe déjà.", {
      scope: "local",
      author: WA.player.state.master ?? "System",
    });
    console.log("Bid must be higher than the current price.");
  }
};

WA.state.onVariableChange("productNewPrice").subscribe((newPrice) => {
  fillProductDetails(); // Update HTML with new price
});

// Wait for the API to be ready
WA.onInit()
  .then(async () => {
    fillProductDetails();
  })
  .catch((e) => console.error(e));

// Fill HTML with product details using WA.state
const fillProductDetails = () => {
  const auctionProduct = document.querySelector(".auction-product");
  if (
    WA.state.productInAuction &&
    auctionProduct &&
    WA.state.productId &&
    WA.state.productName &&
    WA.state.productPrice &&
    WA.state.productImage
  ) {
    const currentPrice =
      parseFloat(WA.state.productNewPrice) || parseFloat(WA.state.productPrice);
    auctionProduct.innerHTML = `
      <div class="auction-item">
    <img src="${WA.state.productImage}" alt="Image du produit" />
    <div class="auction-details">
      <p class="product-name">${WA.state.productName}</p>
      <p class="starting-price">Prix de départ : ${WA.state.productPrice}€</p>
    </div>
    <div class="auction-details">
      <p class="current-price">Prix actuel : ${currentPrice.toFixed(2)}€</p>
      <p class="time-left">Temps restant : 1 jour</p>
    </div>
</div>
<div class="auction-form">
    <form method="post" id="bid-form">
      <label for="bid">Votre enchère :</label>
      <input
        type="text"
        id="bid"
        name="bid"
        placeholder="Entrez votre montant d'enchère"
      />
      <input id="bidSubmit" type="submit" value="Placer l'enchère" />
    </form>
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
console.log('tetekl')
export {};
