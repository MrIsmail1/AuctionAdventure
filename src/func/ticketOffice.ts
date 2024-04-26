function getFileBase64(file, callback) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => callback(reader.result);
    reader.onerror = error => console.log('Error: ', error);
}

document.getElementById("auctionForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const form = document.getElementById("auctionForm");
    const productName = document.getElementById("productName").value;
    const startPrice = document.getElementById("startPrice").value;
    const imageFile = document.getElementById("productImage").files[0];

    getFileBase64(imageFile, async (productImage) => {
        try {
            let lastProductId = await WA.state.loadVariable("lastProductId");
            const productId = lastProductId ? lastProductId + 1 : 1;

            const product = {
                id: productId,
                title: productName,
                price: startPrice,
                image: productImage,
                playerId: WA.player.id
            };
            console.log("Product data", product)

      // Load existing productList or initialize it as an empty array
      let productList = (await WA.state.loadVariable("productList")) as any[];
      if (!productList) {
        productList = [];
      }

      // Add the new product to the existing productList
      productList.push(product);

      // Save the updated productList back to the state
      await WA.state.saveVariable("productList", [...productList]);
      console.log(WA.state.productList);
      await WA.state.saveVariable("lastProductId", productId);

            displaySuccessMessage("Produit ajouté avec succès !");
            form.reset();
        } catch (e) {
            console.error("Error managing product data", e);
            displayErrorMessage("Erreur lors de l'ajout du produit.");
        }
    });
});

function displaySuccessMessage(message) {
    const messageBox = document.getElementById("messageBox");
    if (messageBox) {
        messageBox.textContent = message;
        messageBox.style.color = "green";
        setTimeout(() => (messageBox.textContent = ""), 3000);
    }
}

function displayErrorMessage(message) {
    const messageBox = document.getElementById("messageBox");
    if (messageBox) {
        messageBox.textContent = message;
        messageBox.style.color = "red";
        setTimeout(() => (messageBox.textContent = ""), 3000);
    }
}
