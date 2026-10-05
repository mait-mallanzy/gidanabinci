let cart = [];

function addToCart(name, price) {
  const item = cart.find(x => x.name === name);
  if (item) {
    item.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  renderCart();
  openCart();
}

function removeFromCart(name) {
  cart = cart.filter(x => x.name !== name);
  renderCart();
}

function renderCart() {
  const box = document.getElementById("cartItems");
  const count = cart.reduce((s, x) => s + x.qty, 0);
  const total = cart.reduce((s, x) => s + x.price * x.qty, 0);

  document.getElementById("cartCount").textContent = count;
  document.getElementById("cartTotal").textContent =
    "$" + total.toLocaleString();

  if (!cart.length) {
    box.innerHTML = '<p class="empty">Your cart is empty.</p>';
    return;
  }

  box.innerHTML = cart.map(x =>
    '<div class="cart-row">' +
    '<div><b>' + x.name + '</b><br><small>' +
    x.qty + ' × $' + x.price +
    '</small></div>' +
    '<div><b>$' + (x.price * x.qty) +
    '</b><br><button onclick="removeFromCart(\'' +
    x.name + '\')">Remove</button></div></div>'
  ).join("");
}

function openCart() {
  document.getElementById("cartPanel").classList.add("open");
  document.getElementById("overlay").classList.add("open");
}

function toggleCart() {
  document.getElementById("cartPanel").classList.toggle("open");
  document.getElementById("overlay").classList.toggle("open");
}

function submitOrder(e) {
  e.preventDefault();

  if (!cart.length) {
    alert("Please add at least one item to your cart.");
    return;
  }

  const name = document.getElementById("customerName").value;
  const phone = document.getElementById("customerPhone").value;
  const address = document.getElementById("customerAddress").value;

  const items = cart.map(x => x.name + " (" + x.qty + ")").join(", ");
  const total = cart.reduce((s, x) => s + x.price * x.qty, 0);

  alert(
    "Thank you, " + name +
    "! Your order has been received.\n\n" +
    "Items: " + items +
    "\nTotal: $" + total +
    "\nPhone: " + phone +
    "\nAddress: " + address
  );
}

renderCart();
