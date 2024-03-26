document.addEventListener('DOMContentLoaded', function () {
    const cartItems = document.getElementById('cart-items');
    const totalSpan = document.getElementById('total');
    const checkoutForm = document.getElementById('checkout-form');
    const URL = './JS/products.json'; // Define the URL constant

    let cart = JSON.parse(localStorage.getItem('cart')) || {};

    updateCart();

    async function fetchProducts() {
        try {
            const response = await fetch(URL); // Use the URL constant
            const products = await response.json();
            createProductElements(products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }
    fetchProducts();

    function createProductElements(products) {
        const menuSection = document.querySelector('.menu');
        menuSection.innerHTML = '';

        products.forEach(product => {
            const div = document.createElement('div');
            div.classList.add('burger');

            const img = document.createElement('img');
            img.src = product.image;
            img.alt = product.name;

            const p = document.createElement('p');
            p.textContent = `${product.name} - $${product.price}`;

            const button = document.createElement('button');
            button.classList.add('add-to-cart');
            button.textContent = 'Add to Cart';
            button.dataset.name = product.name;
            button.dataset.price = product.price;

            div.appendChild(img);
            div.appendChild(p);
            div.appendChild(button);

            menuSection.appendChild(div);
        });

        // Add event listeners to Add to Cart buttons
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function () {
                const name = this.getAttribute('data-name');
                const price = parseFloat(this.getAttribute('data-price'));
                addToCart(name, price);
                showAddToCartAlert(name);
            });
        });
    }

    function addToCart(name, price) {
        if (cart[name]) {
            cart[name].quantity++;
        } else {
            cart[name] = { price: price, quantity: 1 };
        }
        updateCart();
        saveCartToLocalStorage();
    }

    function removeFromCart(name) {
        if (cart[name]) {
            cart[name].quantity--;
            if (cart[name].quantity === 0) {
                delete cart[name];
            }
            updateCart();
            saveCartToLocalStorage();
        }
    }

    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;
        for (const name in cart) {
            const { price, quantity } = cart[name];
            total += price * quantity;
            const item = document.createElement('li');
            item.textContent = `${name} x ${quantity} - $${(price * quantity).toFixed(2)}`;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', function () {
                removeFromCart(name);
            });
            item.appendChild(removeButton);
            cartItems.appendChild(item);
        }
        totalSpan.textContent = total.toFixed(2);
    }

    function saveCartToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function showAddToCartAlert(productName) {
        Swal.fire({
            title: 'Item Added to Cart!',
            text: `${productName} has been added to your cart.`,
            icon: 'success',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false
        });
    }

    checkoutForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;

        let totalPrice = 0;
        for (const name in cart) {
            const { price, quantity } = cart[name];
            totalPrice += price * quantity;
        }

        if (name.trim() === '' || address.trim() === '' || phone.trim() === '') {
            Swal.fire("Please fill out all fields in the form.");
        } else {
            const cartItems = Object.entries(cart).map(([name, item]) => `${name} x ${item.quantity}`).join('\n');
            Swal.fire(`Order placed!\nName: ${name}\nAddress: ${address}\nPhone: ${phone}\n\nItems:\n${cartItems}\n\nTotal Price: $${totalPrice.toFixed(2)}`);
            clearCart();
        }
    });

    function clearCart() {
        cart = {};
        updateCart();
        saveCartToLocalStorage();
    }
});







