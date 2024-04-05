import { Request, Response } from "express";
import { UserViewService } from "../../services/crudUser/UserViewService";

class UserViewController{
  async handle(req: Request, res: Response){
    const { statusCode, body } = await new UserViewService().execute();

    return res.status(statusCode).json(body);
  }
};

export { UserViewController };