import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prismaClient from "../../lib/prisma";
import ResponseError from "../../common/ResponseError";
import { StatusCodes } from "http-status-codes";
import ResponseSuccess from "../../common/ResponseSuccess";

interface IUserLogin {
  email: string;
  password: string;
}

class UserLoginService{
  async execute({email, password} : IUserLogin){
    try {
      const user = await prismaClient.user.findUnique({ where: { email: email } });

      if(!user){
        return new ResponseError('Usuário não encontrado', StatusCodes.NOT_FOUND);
      }

      const match = await bcrypt.compare(password, user.password);

      if(!match){
        return new ResponseError('Senha incorreta', StatusCodes.UNAUTHORIZED);
      }

      const token = jwt.sign({ UserId: user.id, email: user.email }, process.env.SECRETKEY!, { expiresIn: "1h" });
      console.log(process.env.SECRETKEY)

      return new ResponseSuccess({token});
    } catch (error: any) {
      console.log(error.message);
      return new ResponseError("Erro ao fazer login")
    }
  }
}

export { UserLoginService }