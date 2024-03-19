document.addEventListener('DOMContentLoaded', function() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const cartItems = document.getElementById('cart-items');
  const totalSpan = document.getElementById('total');
  const checkoutForm = document.getElementById('checkout-form');

  // Load cart data from local storage on page load
  let cart = JSON.parse(localStorage.getItem('cart')) || {};

  // Update cart display on page load
  updateCart();

  // Add item to cart
  function addToCart(name, price) {
      if (cart[name]) {
          cart[name].quantity++;
      } else {
          cart[name] = { price: price, quantity: 1 };
      }
      updateCart();
      saveCartToLocalStorage(); // Save cart to local storage
  }

  // Remove item from cart
  function removeFromCart(name) {
      if (cart[name]) {
          cart[name].quantity--;
          if (cart[name].quantity === 0) {
              delete cart[name];
          }
          updateCart();
          saveCartToLocalStorage(); // Save cart to local storage
      }
  }

  // Update cart display
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
          removeButton.addEventListener('click', function() {
              removeFromCart(name);
          });
          item.appendChild(removeButton);
          cartItems.appendChild(item);
      }
      totalSpan.textContent = total.toFixed(2);
  }

  // Save cart to local storage
  function saveCartToLocalStorage() {
      localStorage.setItem('cart', JSON.stringify(cart));
  }

  // Handle form submission
  checkoutForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const name = document.getElementById('name').value;
      const address = document.getElementById('address').value;
      const phone = document.getElementById('phone').value;

    // Calculate total price
    let totalPrice = 0;
    for (const name in cart) {
        const { price, quantity } = cart[name];
        totalPrice += price * quantity;
    }

      // Validate form fields
      if (name.trim() === '' || address.trim() === '' || phone.trim() === '') {
          Swal.fire("Please fill out all fields in the form.");
      } else {
        const cartItems = Object.entries(cart).map(([name, item]) => `${name} x ${item.quantity}`).join('\n');
        Swal.fire(`Order placed!\nName: ${name}\nAddress: ${address}\nPhone: ${phone}\n\nItems:\n${cartItems}\n\nTotal Price: $${totalPrice.toFixed(2)}`);
        clearCart();
      }
  });

  // Clear cart
  function clearCart() {
    cart = {};
    updateCart(); 
    saveCartToLocalStorage(); 
}

  // Add event listeners to Add to Cart buttons
  addToCartButtons.forEach(button => {
      button.addEventListener('click', function() {
          const name = this.getAttribute('data-name');
          const price = parseFloat(this.getAttribute('data-price'));
          addToCart(name, price);
      });
  });
});

  







