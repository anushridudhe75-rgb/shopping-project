const API = "http://localhost:5000/api";

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}
async function loadProducts() {
  const search = document.getElementById("search").value;

  // Loading
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

      // ✅ CATEGORY BASED LOGIC (FINAL FIX)
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
    document.getElementById("english").innerHTML = "Error loading products ❌";
  }
}