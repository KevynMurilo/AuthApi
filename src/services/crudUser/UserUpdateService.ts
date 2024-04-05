import ResponseError from "../../common/ResponseError";
import ResponseSuccess from "../../common/ResponseSuccess";
import prismaClient from "../../lib/prisma";

interface NewData{
  name?: string;
  email?: string;
}

class UserUpdateService{
  async execute(id: number, data: NewData){
    try {
      const searchUser = await prismaClient.user.findUnique({ where: { id: id } });
  
      if(!searchUser){
        return new ResponseError('Usuário não encontrado', 404);
      };

      const newData: NewData = {}; 
      if (data.name) newData.name = data.name;
      if (data.email) newData.email = data.email;
  
      const updated = await prismaClient.user.update({
        where: { id: searchUser.id },
        data: newData
      });
  
      return new ResponseSuccess(`Usuário atualizado com sucesso - ${updated.name}`);
    } catch (error: any) {
      console.log(error.message);
      return new ResponseError('Erro ao atualizar usuário')
    }
  }
};

export { UserUpdateService };