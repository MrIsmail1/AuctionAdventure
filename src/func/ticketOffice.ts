document
  .getElementById("auctionForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const form = document.getElementById("auctionForm");
    const productName = document.getElementById("productName").value;
    const startPrice = document.getElementById("startPrice").value;
    const imageFile = document.getElementById("productImage").files[0];
    const productImage = URL.createObjectURL(imageFile);

    try {
      let lastProductId = await WA.state.loadVariable("lastProductId");
      const productId = lastProductId ? lastProductId + 1 : 1;

      const product = {
        id: productId,
        title: productName,
        price: startPrice,
        image: productImage,
        playerId: WA.player.id,
      };

      console.log("Product to save:", product);

      // Load existing productList or initialize it as an empty array
      let productList = await WA.state.loadVariable("productList");
      if (!productList) {
        productList = [];
      }

      // Add the new product to the existing productList
      productList.push(product);

      // Save the updated productList back to the state
      await WA.state.saveVariable("productList", productList);
      await WA.state.saveVariable("lastProductId", productId);

      displaySuccessMessage(
        "Produit ajouté avec succès ! Si vous voulez ajouter un autre produit"
      );

      form.reset();
    } catch (e) {
      console.error("Error managing product data", e);
      displayErrorMessage("Erreur lors de l'ajout du produit.");
    }
  });

function displaySuccessMessage(message: string) {
  const messageBox =
    document.getElementById("messageBox") || createMessageBox();
  messageBox.textContent = message;
  messageBox.style.color = "green";
  setTimeout(() => (messageBox.textContent = ""), 3000);
}

function displayErrorMessage(message: string) {
  const messageBox =
    document.getElementById("messageBox") || createMessageBox();
  messageBox.textContent = message;
  messageBox.style.color = "red";
  setTimeout(() => (messageBox.textContent = ""), 3000);
}

function createMessageBox() {
  const messageBox = document.createElement("div");
  messageBox.id = "messageBox";
  document.body.appendChild(messageBox);
  return messageBox;
}
