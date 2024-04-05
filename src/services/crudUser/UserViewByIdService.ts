import { StatusCodes } from "http-status-codes";
import ResponseError from "../../common/ResponseError";
import ResponseSuccess from "../../common/ResponseSuccess";
import prismaClient from "../../lib/prisma";

class UserViewByIdService{
  async execute(id: number){
    try {
      const userById = await prismaClient.user.findUnique({
        where: { id: id },
        select: {
          id: true,
          name: true,
          email: true
        }
      });
  
      if(userById){
        return new ResponseSuccess(userById);
      } else {
        return new ResponseError('Usuário não encontrado', StatusCodes.NOT_FOUND);
      }
    } catch (error: any) {
      console.log(error.message);
      return new ResponseError('Erro ao pegar usuário por id');
    }
  }
};

export { UserViewByIdService };