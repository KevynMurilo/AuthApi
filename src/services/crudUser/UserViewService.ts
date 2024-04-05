import ResponseError from "../../common/ResponseError";
import ResponseSuccess from "../../common/ResponseSuccess";
import prismaClient from "../../lib/prisma";

class UserViewService{
  async execute(){
    try {
      const users = await prismaClient.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
        }
      });
  
      return new ResponseSuccess(users);
    } catch (error: any) {
      console.log(error.message);
      return new ResponseError('Erro ao buscar usuários');
    }
  }
};

export { UserViewService };