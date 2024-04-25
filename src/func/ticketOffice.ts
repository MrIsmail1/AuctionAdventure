document.getElementById('auctionForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const form = document.getElementById('auctionForm');
    const productName = document.getElementById('productName').value;
    const startPrice = document.getElementById('startPrice').value;
    const imageFile = document.getElementById('productImage').files[0];

    const productImage = URL.createObjectURL(imageFile);

    try {
        let lastProductId = await WA.state.loadVariable('lastProductId');
        const productId = lastProductId ? lastProductId + 1 : 1;

        const product = {
            id: productId,
            title: productName,
            price: startPrice,
            image: productImage,
            playerId: WA.player.id,
        };

        console.log('Product to save:', product);

        await WA.state.saveVariable('productList', product);
        await WA.state.saveVariable('lastProductId', productId);

        displaySuccessMessage('Produit ajouté avec succes ! Si vous voulez ajouter un autre produit');

        form.reset();

    } catch (e) {
        console.error('Error managing product data', e);
        displayErrorMessage('Erreur lors de l\'ajout du produit.');
    }
});

function displaySuccessMessage(message) {
    const messageBox = document.getElementById('messageBox') || createMessageBox();
    messageBox.textContent = message;
    messageBox.style.color = 'green';
    setTimeout(() => messageBox.textContent = '', 3000);
}

function displayErrorMessage(message) {
    const messageBox = document.getElementById('messageBox') || createMessageBox();
    messageBox.textContent = message;
    messageBox.style.color = 'red';
    setTimeout(() => messageBox.textContent = '', 3000);
}

function createMessageBox() {
    const messageBox = document.createElement('div');
    messageBox.id = 'messageBox';
    document.body.appendChild(messageBox);
    return messageBox;
}
