const express = require("express");
const fs = require("fs");

const app = express();
const port = 3000;
app.use(express.json());

// الfunction دي بتقرأ ملف ال json [هستخدمها كل مره علشان اقرا البرودكتس]
const getProducts = () => {
  const data = fs.readFileSync("./products.json", "utf8");
  return JSON.parse(data);
};

// ال function دي بتحول البرودكتس اللي قراتها من ملف ال json [هستخدمها لو في تعديل]
const saveProducts = (products) => {
  fs.writeFileSync("./products.json", JSON.stringify(products, 2));
};

// get all products form json file
app.get("/products", (req, res) => {
  const products = getProducts();
  if(products.length === 0) return res.status(404).json({message: "No products found"});
  res.status(200).json(products);
});

// get product by id from json file
app.get("/products/:id", (req, res) => {
  const products = getProducts();
  const product = products.find((p) => p.id == req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json(product);
});

// add new product to json file [هنا حصل تعديل هستخدم function saveProducts()]
// fix the id of the product
app.post("/products", (req, res) => {
  const products = getProducts(); // هضيف البرودكتس ف ال body في postman
  const newProduct = {
    id: req.body.id,
    name: req.body.name,
    price: req.body.price,
  };

  products.push(newProduct);
  saveProducts(products);

  res.status(201).json(newProduct);
});

// update product by id in json file [هنا حصل تعديل هستخدم function saveProducts()]
// search about how to update product
app.put("/products/:id", (req, res) => {
  const products = getProducts();
  const productIndex = products.findIndex((p) => p.id == req.params.id);

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  products[productIndex] = {...products[productIndex],...req.body,};

  saveProducts(products);
  res.status(201).json(products[productIndex]);
});

// delete product by id from json file [هنا حصل تعديل هستخدم function saveProducts()]
// id must beunique to delete only one product
app.delete("/products/:id", (req, res) => {
  const products = getProducts();
  const updatedProducts = products.filter((p) => p.id != req.params.id);

  if (products.length === updatedProducts.length) {
    return res.status(404).json({ message: "Product not found" });
  }

  saveProducts(updatedProducts);
  res.status(200).json({ message: "Product deleted successfully" });
});

app.get("/",(req, res) => {
    res.send("Welcome to API Products!");
})



app.listen(port, () => {
  console.log(`Server is running on PORT:${port}`);
});
