import fs from "fs";
import {v4 as uuidv4} from uuid ;


export default class ProductManager{
    constructor(path){
        this.path = path;
    }
    
    getProducts = async () =>{
        const fileContent = await fs.promises.readFile(this.path, "utf-8");
        let products = [];
        if (fileContent) {
            products = JSON.parse(fileContent);
          }
          return products;
    }

    agregarProduct = async (product) => {
        const { title, description, price, thumbnail, stock } = product;
        if (!title || !description || !price || !thumbnail || !stock || !category) {
          console.log("El producto no pudo crearse, debe tener todos los campos requeridos,intentelo nuevamente");
          return;
        }
        const products = await this.getProducts();
        product.code = uuidv4();
        products.push(product)

        await fs.promises.writeFile(this.path, JSON.stringify(products,null,"\t"))
        console.log(`Nuevo producto agregado: ${product}`);
};


getProductByCode = async (code) => {
    const products = await this.getProducts();
    let product;
    if (products.length > 0) {
      product = products.find((producto) => producto.code === code);
    }
    if (!product) console.log(`No existe un producto con code: ${code}`);
    return product;
  }

updateProduct = async (code, productUpdate)=> {
    const products = await this.getProducts();
    if (products.length > 0) {
      const productIdx = products.findIndex((producto) => producto.code === code);
      if (productIdx === -1) {
        console.log(
          `No existe un producto con code: ${code}. No se realiza ninguna actualización.`
        );
        return;
      }
      if (products[productIdx].code === productUpdate.code) {
        console.log(
          `Existe un producto con code: ${productUpdate.code}. No se actualiza el producto.`
        );
        return;
      }
      products[productIdx] = { ...products[productIdx], ...productUpdate };
      await fs.promises.writeFile(this.path, JSON.stringify(products), "utf-8");
      console.log(`Producto con code: ${productIdx} actualizado.`);
    } else {
      console.log("No hay productos. No se puede realizar la actualización.");
    }
  }

deleteProduct = async (code) => {
    const products = await this.getProducts();
    let filteredProducts = [];

    if (products.length > 0) {
      filteredProducts = products.filter((p) => p.code !== code);
    }
    if (filteredProducts.length === products.length - 1) {
      await fs.promises.writeFile(this.path, JSON.stringify(filteredProducts, null,"\t"));
      console.log(`El producto con code: ${code} fue eliminado.`);
    } else {
      console.log(`No existe un producto con code: ${code}.`);
    }
  }
};
