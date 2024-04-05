import ResponseError from "../../common/ResponseError";
import ResponseSuccess from "../../common/ResponseSuccess";
import prismaClient from "../../lib/prisma";

class UserDeleteService{
  async execute(id: number){
    try {
      const searchUser = await prismaClient.user.findUnique({ where: { id: id } });

      if(searchUser){
        await prismaClient.user.delete({ where: { id: searchUser.id } });
        return new ResponseSuccess(`Usuário ${searchUser.name} deletado com sucesso`);
      } else {
        return new ResponseError('Usuário não encontrado', 404);
      }

    } catch (error: any) {
      console.log(error.message);
      return new ResponseError('Erro ao deletar usúario');
    }
  }
};

export { UserDeleteService };