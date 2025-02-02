const productsGrid = document.getElementById("products-grid");
const searchInput = document.getElementById("search-input");



function fetchProducts() {
  fetch("https://fakestoreapi.com/products")
      .then(response => response.json())
      .then(products => {
          const limitedProducts = products.slice(0, 8); 
          displayProducts(limitedProducts);

         
          searchInput.addEventListener("input", () => {
              const searchValue = searchInput.value.toLowerCase();
              const filteredProducts = limitedProducts.filter(product =>
                  product.title.toLowerCase().includes(searchValue)
              );
              displayProducts(filteredProducts);
          });
      })
      .catch(error => console.error("Error fetching products:", error));
}


function displayProducts(products) {
  const productsGrid = document.getElementById("products-grid"); 
  productsGrid.innerHTML = ""; 

  products.forEach(product => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");

      productCard.innerHTML = `
          <div class="product-image">
              <img src="${product.image}" alt="${product.title}">
          </div>
          <div class="product-info">
              <h3>${product.title}</h3>
              <div class="rating">
                  ${createStarRating(product.rating.rate)} 
                  <span class="rating-number">${product.rating.rate}/5</span>
              </div>
              <div class="price-container">
                  <span class="current-price">$${product.price.toFixed(2)}</span>
                  <span class="original-price">$${(product.price * 1.2).toFixed(2)}</span>
                  <span class="discount">-20%</span>
              </div>
          </div>
      `;

      productsGrid.appendChild(productCard);
  });
}


function createStarRating(rating) {
  let stars = "";
  for (let i = 0; i < 5; i++) {
      stars += i < Math.round(rating) ? "⭐" : "☆";
  }
  return stars;
}

fetchProducts();