const { ProductManager } = require("../index.js");

try {
const pM = new ProductManager("./src/clases/files/productos.json");
  
    pM.getProducts()
      .then((products) => {
        console.log("Product list: ", products);
        return pM.agregarProduct({
          title: "Auriculares",
          description: "Auriculares con microfono",
          price: 40000,
          thumbnail: "sin img",
          stock: 25,
        });
      })
      .then((_) => {
        return pM.getProducts();
      })
      .then((products) => {
        console.log("Product list: ", products);
        return pM.getProductByCode(2);
      })
      .then((p) => {
        console.log("Producto con id: 2", p);
        return pM.getProductByCode(25);
      })
      .then((p) => {
        console.log("Producto con code: 25", p);
        return pM.updateProduct(2, { price: 123 });
      })
      .then((_) => pM.deleteProduct(2))
      .then((_) => pM.getProducts())
      .then((products) => {
        console.log("Product list: ", products);
      });
  } catch (err) {
    console.log("file: test.js:62 ~ err:", err.message);
  }
  