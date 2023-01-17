import express, { Router } from "express";
import { ItemRouter } from "./controller/item";
import { PedidoRouter } from "./controller/pedido";

const router = express.Router()

router.use("/api", PedidoRouter)
router.use("/api", ItemRouter)

export { router }