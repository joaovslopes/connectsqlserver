import prismaClient from "../prisma";

class ListCostumerService{
    async execute(){
      
        const customer = await prismaClient.customer.findMany() 

       return customer;
    }
}

export {ListCostumerService}