const API = "http://localhost:5000/api";

// 🌙 DARK MODE
function toggleDarkMode() {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
}

// Apply theme on load
window.onload = function () {
  const theme = localStorage.getItem("theme");

  if (theme === "dark") {
    document.body.classList.add("dark");
  }

  loadProducts(); // load products automatically
};

// 🔍 LOAD PRODUCTS
async function loadProducts() {
  const search = document.getElementById("search")?.value || "";

  document.getElementById("english").innerHTML = "Loading...";
  document.getElementById("hindi").innerHTML = "";
  document.getElementById("marathi").innerHTML = "";

  try {
    const res = await fetch(`${API}/products?search=${search}`);
    const data = await res.json();

    let eng = "", hin = "", mar = "";

    data.forEach((p) => {
      const card = `
        <div class="card">
          <img src="${p.image?.[0] || 'images/book1.jpg'}"
          onclick="window.location='product.html?id=${p._id}'">

          <h3>${p.name}</h3>
          <p>⭐ ${p.rating}</p>
          <p>₹${p.price}</p>

          <button onclick="addToCart('${p._id}')">Add to Cart 🛒</button>
          <button onclick="addToWishlist('${p._id}')">❤️ Wishlist</button>
        </div>
      `;

      // ✅ CATEGORY BASED DISPLAY
      if (p.category === "english") {
        eng += card;
      } else if (p.category === "hindi") {
        hin += card;
      } else if (p.category === "marathi") {
        mar += card;
      }
    });

    document.getElementById("english").innerHTML =
      eng || "<p>No English books</p>";

    document.getElementById("hindi").innerHTML =
      hin || "<p>No Hindi books</p>";

    document.getElementById("marathi").innerHTML =
      mar || "<p>No Marathi books</p>";

  } catch (error) {
    console.log(error);
    document.getElementById("english").innerHTML =
      "Error loading products ❌";
  }
}

// 🛒 ADD TO CART
async function addToCart(productId) {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    alert("Please login first ❗");
    return;
  }

  try {
    const res = await fetch(`${API}/cart/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        productId,
        quantity: 1
      })
    });

    const data = await res.text();
    alert(data || "Added to Cart ✅");

  } catch (err) {
    console.log(err);
    alert("Error adding to cart ❌");
  }
}

// ❤️ ADD TO WISHLIST
async function addToWishlist(productId) {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    alert("Please login first ❗");
    return;
  }

  try {
    const res = await fetch(`${API}/wishlist/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        productId
      })
    });

    const data = await res.text();
    alert(data || "Added to Wishlist ❤️");

  } catch (err) {
    console.log(err);
    alert("Error adding to wishlist ❌");
  }
}
