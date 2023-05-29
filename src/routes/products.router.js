import { Router } from "express";
import ManagerProducts from "./src/clases/ProductManager.js";

const router = Router();
const managerProducts = new ManagerProducts()

router.get("/:id", async (req, res) => {
const id = req.params.id;
const product = await managerProducts.getProductByCode(id);
res.send({ product });
});

router.get("/", async (req, res) => {
const products = await managerProducts.getProducts();
res.send({ products });
});

router.post("/", async (req, res) => {
console.log(req.body);
const product = req.body;
managerProducts.agregarProduct(product);
res.send({ status: "success" });
});

export default router;

