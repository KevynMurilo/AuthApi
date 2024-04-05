import { Request, Response } from "express";
import { UserCreateService } from "../../services/crudUser/UserCreateService";

interface IUser{
  name: string;
  email: string;
  password: string;
};

class UserCreateController{
  async handle(req: Request, res: Response){
    const data = req.body as IUser;

    const { body, statusCode } = await new UserCreateService().execute(data);

    res.status(statusCode).json(body);
  }
};

export { UserCreateController };