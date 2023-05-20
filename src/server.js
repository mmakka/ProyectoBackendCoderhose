import express from "express";
import { ProductManager } from "./clases/index.js";

const app = express;

const productManager = new ProductManager();

app.get("/productos", async (req,res)=> {
    const productos = await productManager.getProducts();
    res.send(productos)
})

app.get("productos/:id", async (req,res)=> {
    const producto = await productManager.getProductByCode(req.params.id);
    res.send(producto)
})


app.listen(8080,()=>{
    console.log("Servidor levantado");
})