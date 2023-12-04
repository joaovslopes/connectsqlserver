import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify"
import { CreateCustomerController } from './controllers/CreateCustomerController'
import { ListCostumerController } from "./controllers/ListCostumerController"
import { DeleteCustomerController } from "./controllers/DeleteCustomerController"

export async function routes(fastify: FastifyInstance, options: FastifyReply) {
    fastify.get("/teste", async (request: FastifyRequest, reply: FastifyReply) => {
        return { ok: true }
    })

    fastify.post("/customers", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateCustomerController().handle(request, reply)
    })
    
    fastify.get("/customers", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListCostumerController().handle(request, reply)
    })

    fastify.delete("/customers", async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteCustomerController().handle(request, reply)
    })
}