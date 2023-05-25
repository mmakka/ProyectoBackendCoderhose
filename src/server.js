import express  from "express";
import ProductManager from "./clases/ProductManager.js";

const app = express();
app.use(express.urlencoded({ extended: true }));


const productManager = new ProductManager("./files/ProductManager.js");

app.get("/productos", async (req,res)=> {
    console.log(req.query.limit);
    const limit = req.query.limit;
    const productos = await productManager.getProducts(req.query.limit);
    res.send("test")
})

app.get("productos/:id", async (req,res)=> {
    const producto = await productManager.getProductByCode(req.params.id);
    res.send(producto)
})


app.listen(8080,()=>{
    console.log("Servidor levantado");
}) 