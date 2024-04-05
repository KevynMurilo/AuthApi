import { Request, Response } from "express";
import { UserLoginService } from "../../services/authUser/UserLoginService";

interface IUserLogin {
  email: string;
  password: string;
}


class UserLoginController{
  async handle(req: Request, res: Response){
    const dataLogin = req.body as IUserLogin;
    const { statusCode, body } = await new UserLoginService().execute(dataLogin);

    res.status(statusCode).json(body);
  }
};

export { UserLoginController };