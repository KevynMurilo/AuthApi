import { Request, Response } from "express";
import { UserDeleteService } from "../../services/crudUser/UserDeleteService";

class UserDeleteController{
  async handle(req: Request, res: Response){
    const id = Number(req.params.id);

    const { statusCode, body } = await new UserDeleteService().execute(id);

    return res.status(statusCode).json(body);
  }
};

export { UserDeleteController };