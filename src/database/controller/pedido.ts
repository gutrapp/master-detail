import express, { Router, Request, Response } from "express"

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient()

const PedidoRouter = express.Router()

PedidoRouter.get("/pedido", async ( req: Request, res: Response ) => {
    const pedidos = await prisma.pedido.findMany()

    return res.json(pedidos)
})

PedidoRouter.post("/pedido", async ( req: Request, res: Response ) => {
    const { cliente, items, quantidade } = req.body
    const pedido = await prisma.pedido.create({
        data: {
            cliente
        }
    })

    return res.json(pedido)
})

PedidoRouter.put("/pedido/:id", async ( req: Request, res: Response ) => {
    const id = parseInt(req.params.id)
    const { cliente } = req.body

    const pedido = await prisma.pedido.update({
        where: {
            id
        },
        data: {
            cliente
        }
    })

    return res.json(pedido)
})

PedidoRouter.delete("/pedido/:id", async ( req: Request, res: Response ) => {
    const id = parseInt(req.params.id)
    return await prisma.pedido.delete({
        where: {
            id
        }
    })
})

PedidoRouter.get("/pedido/:id", async ( req: Request, res: Response ) => {
    const id = parseInt(req.params.id)

    const pedido =  await prisma.pedido.findFirst({
        where: {
            id
        }
    })

    return res.json(pedido)
})

export { PedidoRouter }