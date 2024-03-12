document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItems = document.getElementById('cart-items');
    const totalSpan = document.getElementById('total');
    const checkoutForm = document.getElementById('checkout-form');
  
    let cart = {};
  
    // Add item to cart
    function addToCart(name, price) {
      if (cart[name]) {
        cart[name].quantity++;
      } else {
        cart[name] = { price: price, quantity: 1 };
      }
      updateCart();
    }
  
    // Remove item from cart
    function removeFromCart(name) {
      if (cart[name]) {
        cart[name].quantity--;
        if (cart[name].quantity === 0) {
          delete cart[name];
        }
        updateCart();
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
  
    // Handle form submission
    checkoutForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const name = document.getElementById('name').value;
      const address = document.getElementById('address').value;
      const phone = document.getElementById('phone').value;
  
      // Validate form fields
      if (name.trim() === '' || address.trim() === '' || phone.trim() === '') {
        alert('Please fill out all fields in the form.');
      } else {
        alert(`Order placed!\nName: ${name}\nAddress: ${address}\nPhone: ${phone}`);
      }
    });
  
    // Add event listeners to Add to Cart buttons
    addToCartButtons.forEach(button => {
      button.addEventListener('click', function() {
        const name = this.getAttribute('data-name');
        const price = parseFloat(this.getAttribute('data-price'));
        addToCart(name, price);
      });
    });
  });








