import { Request, Response } from "express";
import { UserViewByIdService } from "../../services/crudUser/UserViewByIdService";

class UserViewByIdController{
  async handle(req: Request, res: Response){
    const id = Number(req.params.id);

    const { statusCode, body } = await new UserViewByIdService().execute(id);

    return res.status(statusCode).json(body);
  }
}

export { UserViewByIdController };