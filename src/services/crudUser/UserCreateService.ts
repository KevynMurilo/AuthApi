import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import ResponseError from "../../common/ResponseError";
import prismaClient from "../../lib/prisma";
import ResponseSuccess from "../../common/ResponseSuccess";

interface IUser{
    name: string;
    email: string;
    password: string;
}

class UserCreateService{
    async execute({name, email, password}: IUser){
        try {
          const emailAlreadyExists = await prismaClient.user.findUnique({ where: {email: email} });
  
          if(emailAlreadyExists){
              return new ResponseError("Email já cadastrado", StatusCodes.CONFLICT);
          };

          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(password, saltRounds);
  
          const create = await prismaClient.user.create({
            data: {
              name,
              email,
              password: hashedPassword
            },
            select: {
              id: true,
              name: true,
              email: true
            }
          });
  
          return new ResponseSuccess(create);
        } catch (error:any) {
          console.log(error.message);
          return new ResponseError('Erro ao criar usuário');
        }
    }
};

export { UserCreateService };