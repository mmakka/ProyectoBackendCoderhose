import express  from "express";
import ProductManager from "../ProductManager.js"

const server = express();

server.use(express.json())
server.use(express.urlencoded({ extended: true }));

server.get("/productos", async (req,res)=> {
    try{
        const limit =parseInt( req.query.limit,10);
        const productos = await ProductManager.getProducts();
        if (limit > 0 && limit <= productos.length) {
            const someProducts = productos.slice(0, limit);
            res.status(200).json({ success: true, productos: someProducts });
          } else {
            res.status(200).json({ success: true, productos });
          }
        } catch (error) {
            console.log(`ERROR: ${error?.message || "error sin mensaje"}`)
          res.json({
            success: false,
            error:
              "ha ocurrido un error. por favor, intente de nuevo en unos minutos",
          });
        }
      });



server.get("productos/:id", async (req,res)=> {
    try {
        const productId = parseInt(req.params.id, 10);
        if (productId > 0) {
          const product = await ProductManager.getProductByCode(productId);
          if (product) {
            res
              .status(200)
              .json({ success: true, message: "producto encontrado", product });
          } else {
            res.status(404).json({
              success: false,
              message: "producto no encontrado",
            });
          }
        } else {
          res.status(400).json({
            success: false,
            message: "id debe ser un entero mayor que cero. intente de nuevo",
          });
        }
      } catch (error) {
        console.log(`ERROR: ${error?.message || "error sin mensaje"}`);
        res.json({
          success: false,
          error:
            "ha ocurrido un error. por favor, intente de nuevo en unos minutos",
        });
      }
    });




server.use("*", (req, res) =>
  res.status(400).json({ success: false, message: "ruta no implementada" })
);

server.listen(8085,()=>{
    console.log("Servidor levantado");
}) 