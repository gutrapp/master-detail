import express, { Router, Request, Response } from "express"

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient()

const ItemRouter = express.Router()

ItemRouter.post("/item", async (req: Request, res: Response) => {
    const { item, quantidade, pedidoId } = req.body
    const items = await prisma.item.create({
        data: {
            item,
            quantidade,
            pedidoId
        }
    })

    return res.json(items)
})

ItemRouter.get("/item/:pedidoId", async (req: Request, res: Response) => {
    const pedidoId = parseInt(req.params.pedidoId)
    const items = await prisma.item.findMany({
        where: {
            pedidoId
        }
    })
    return res.json(items)
})

ItemRouter.put("/item/:id", async ( req: Request, res: Response ) => {
    const id = parseInt(req.params.id)
    const { item, quantidade } = req.body

    return await prisma.item.update({
        where: {
            id
        },
        data: {
            item,
            quantidade 
        }
    })
})

ItemRouter.delete("/item/:id", async ( req: Request, res: Response ) => {
    const id = parseInt(req.params.id)
    return await prisma.item.delete({
        where: {
            id
        }
    })
})

export { ItemRouter }