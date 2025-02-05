//TODO:
// Fetch products from API
// Pagination
// Cart
// Filter

/////////

// product image - done
// cart issue escape character - done
// sort product
// pagination with sort

let currentPage = 1;
const items = 5;
let products = [];
async function fetchProducts(currentPage) {
  let products = document.getElementById("products");
  products.innerHTML = "";
  try {
    let data = await fetch(`https://fakestoreapi.com/products`);
    let jsonData = await data.json();
    const start = (currentPage - 1) * items;
    const end = start + items;
    const paginatedProducts = jsonData.slice(start, end);
    paginatedProducts.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.classList.add(`product-${product.id}`);
      newProduct.innerHTML = `
            <img src="${product.image}" alt="${
        product.title
      }" onclick="showProduct(${product.id})" class="img-${product.id}">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart('${product.id}','${product.title.replace(
        /'/g,
        ""
      )}','${product.price}')">Add to Cart</button>
            <button onclick="showDetails(${product.id})">View Details</button>
            <p style="display:none;" class="detail-${product.id}">${
        product.description
      }</p>
        `;
      products.appendChild(newProduct);
    });
  } catch (e) {
    console.log("Faild to fetch products!");
    products.innerHTML = `<h1 style="text-align:center;">Error 404 - Faild to fetch products!<h1>`;
  }
}

let allProducts = [];
async function loadProducts() {
  let response = await fetch("https://fakestoreapi.com/products");
  allProducts = await response.json();
}

fetchProducts(currentPage);
setColor(1);
loadProducts();

function showDetails(id) {
  let details = document.querySelector(`.detail-${id}`);
  if (details.style.display === "none") {
    details.style.display = "block";
  } else {
    details.style.display = "none";
  }
}

yourCart = [];
let counter = 0;
let sum = 0;
function addToCart(id, title, price) {
  // title = decodeURIComponent(title);
  console.log(title);
  let empty = document.querySelector(".cart1");
  empty.style.display = "none";
  let cart = document.querySelector(".cart2");
  cart.style.display = "block";

  yourCart.push({ id, title, price });
  counter++;
  sum += parseFloat(price);
  cart.innerHTML = "";
  yourCart.forEach((product) => {
    cart.innerHTML += `
      <li>${product.title} - ${product.price}$ - ${product.id}  <button onclick="removeProduct(${product.id})">Remove</button></li>
      
    `;
  });
  cart.innerHTML += `
  <br>
  Total Quantity : ${counter}
  <br><Br>
  Total Price : ${sum}$
  `;
  alert(`Product added to cart:\n${title} - $${price}`);
}

function removeProduct(id) {
  let cart = document.querySelector(".cart2");
  let index = yourCart.findIndex((product) => product.id == id);
  if (index >= 0) {
    counter--;
    sum -= yourCart[index].price;
    yourCart.splice(index, 1);
  }
  if (yourCart.length == 0) {
    let empty = document.querySelector(".cart1");
    empty.style.display = "block";
    cart.style.display = "none";
  } else {
    cart.innerHTML = "";
    yourCart.forEach((product) => {
      cart.innerHTML += `
      <li>${product.title} - ${product.price}$ - ${product.id}  <button onclick="removeProduct(${product.id})">Remove</button></li>
      
      `;
    });
    cart.innerHTML += `
    <br>
    Total Quantity : ${counter}
    <br><Br>
    Total Price : ${sum}$
  `;
  }
  alert(`Product was successfully removed`);
}
function showProduct(id) {
  let productImg = document.querySelector(`.img-${id}`);
  let copyImg = productImg.cloneNode(true);
  // productImg.style.transition = "transform 0.3s ease";
  // if (productImg.style.transform === "scale(1)") {
  //   productImg.style.transform = "scale(3)";
  //   productImg.style.zIndex = "100";
  // } else {
  //   productImg.style.transform = "scale(1)";
  //   productImg.style.zIndex = "1";
  // }
  let newdiv = document.createElement("div");
  newdiv.style.position = "fixed";
  newdiv.style.top = "0";
  newdiv.style.left = "0";
  newdiv.style.width = "100%";
  newdiv.style.height = "100vh";
  newdiv.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  newdiv.style.display = "flex";
  newdiv.style.alignItems = "center";
  newdiv.style.justifyContent = "center";
  newdiv.style.zIndex = "999";
  newdiv.style.cursor = "pointer";

  copyImg.style.transition = "transform 0.3s ease";
  copyImg.style.transform = "scale(2)";
  copyImg.style.zIndex = "100";

  newdiv.appendChild(copyImg);

  document.body.appendChild(newdiv);

  newdiv.addEventListener("click", function () {
    newdiv.remove();
  });
}

function nextPage() {
  if (currentPage >= 4) {
    return;
  } else {
    currentPage++;
    fetchProducts(currentPage);
    setColor(currentPage);
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    fetchProducts(currentPage);
    setColor(currentPage);
  } else {
    return;
  }
}

function setActive(num) {
  currentPage = num;
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.style.backgroundColor = "";
    btn.style.border = "";
    btn.style.color = "";
  });

  let selectedBtn = document.querySelector(`#active${num}`);
  selectedBtn.style.backgroundColor = "#4caf50";
  selectedBtn.style.border = "1px solid #4caf50";
  selectedBtn.style.color = "white";

  fetchProducts(currentPage);
}

function setColor(num) {
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.style.backgroundColor = "";
    btn.style.border = "";
    btn.style.color = "";
  });

  let selectedBtn = document.querySelector(`#active${num}`);
  selectedBtn.style.backgroundColor = "#4caf50";
  selectedBtn.style.border = "1px solid #4caf50";
  selectedBtn.style.color = "white";
}

function filter() {
  let category = document.getElementById("category").value;
  let sort = document.getElementById("sort").value;
  let filteredCategories = [];
  if (category == "" || sort == "") {
    return;
  }
  if (category == "all") {
    filteredCategories = [...allProducts];
    if (sort == "asc") {
      filteredCategories = filteredCategories.sort((a, b) => a.price - b.price);
    } else if (sort == "desc") {
      filteredCategories = filteredCategories.sort((a, b) => b.price - a.price);
    }
  } else {
    filteredCategories = allProducts.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase()
    );

    if (sort == "asc") {
      filteredCategories = filteredCategories.sort((a, b) => a.price - b.price);
    } else if (sort == "desc") {
      filteredCategories = filteredCategories.sort((a, b) => b.price - a.price);
    }
  }
  let products = document.getElementById("products");
  products.innerHTML = "";

  try {
    filteredCategories.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.classList.add(`product-${product.id}`);
      newProduct.innerHTML = `
            <img src="${product.image}" alt="${product.title}" onclick="showProduct(${product.id})" class="img-${product.id}">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart('${product.id}','${product.title}','${product.price}')">Add to Cart</button>
            <button onclick="showDetails(${product.id})">View Details</button>
            <p style="display:none;" class="detail-${product.id}">${product.description}</p>
            `;
      products.appendChild(newProduct);
    });
  } catch (e) {
    console.log("Faild to fetch products!");
    products.innerHTML = `<h1 style="text-align:center;">Error 404 - Faild to fetch products!<h1>`;
  }
}

function searchProduct() {
  let searchInput = document.getElementById("search").value.toLowerCase();
  console.log(searchInput);
  let showProducts = document.getElementById("products");
  showProducts.innerHTML = "";
  let filteredProducts;

  if (searchInput == "") {
    fetchProducts(currentPage);
    setColor(currentPage);
    return;
  } else if (searchInput == "men's clothing".trim()) {
    filteredProducts = allProducts.filter(
      (product) => product.category.toLowerCase() === "men's clothing"
    );
  } else if (searchInput == "women's clothing".trim()) {
    filteredProducts = allProducts.filter(
      (product) => product.category.toLowerCase() === "women's clothing"
    );
  } else if (searchInput == "electronics".trim()) {
    filteredProducts = allProducts.filter(
      (product) => product.category.toLowerCase() === "electronics"
    );
  } else if (searchInput == "jewelery".trim()) {
    filteredProducts = allProducts.filter(
      (product) => product.category.toLowerCase() === "jewelery"
    );
  } else {
    filteredProducts = allProducts.filter((product) => {
      return product.title.trim().toLowerCase().includes(searchInput);
    });
  }

  if (filteredProducts.length > 0) {
    filteredProducts.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.classList.add(`product-${product.id}`);
      newProduct.innerHTML = `
            <img src="${product.image}" alt="${product.title}" onclick="showProduct(${product.id})" class="img-${product.id}">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart('${product.id}','${product.title}','${product.price}')">Add to Cart</button>
            <button onclick="showDetails(${product.id})">View Details</button>
            <p style="display:none;" class="detail-${product.id}">${product.description}</p>
            `;
      showProducts.appendChild(newProduct);
    });
  } else {
    console.log("No Results Found");
    showProducts.innerHTML = `<h1 style="text-align:center;">No Results!<h1>`;
  }
}