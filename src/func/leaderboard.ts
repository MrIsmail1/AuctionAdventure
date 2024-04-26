const constructProductElement = () => {
  const productDiv = document.createElement('div');
  productDiv.classList.add('product-item');

  if (
    WA.state.productInAuction &&
    WA.state.productId &&
    WA.state.productName &&
    WA.state.productPrice &&
    WA.state.productImage
  ) {
    const currentPrice =
      parseFloat(WA.state.productNewPrice) || parseFloat(WA.state.productPrice);
    productDiv.innerHTML = `
      <img src="${WA.state.productImage}" alt="Product Image" />
      <div class="auction-details">
        <p class="product-name">${WA.state.productName}</p>
        <p class="starting-price">Starting Price: $${WA.state.productPrice}</p>
      </div>
      <div class="auction-details">
        <p class="current-price">Current Price: $${currentPrice.toFixed(2)}</p>
        <p class="buyer-name">${WA.player.name}</p>
      </div>
    `;

    const boardForm = document.getElementById("leaderboard") as HTMLTextAreaElement;
    WA.state.leaderboard = boardForm.value;

  }

  return productDiv;
};

WA.onInit().then(() => {
  const productElement = constructProductElement();

  WA.state.leaderboard = WA.state.leaderboard + productElement.outerHTML;
}).catch(e => console.error(e));

export {};
