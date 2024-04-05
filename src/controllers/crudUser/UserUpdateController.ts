import { Request, Response } from "express";
import { UserUpdateService } from "../../services/crudUser/UserUpdateService";

interface NewData{
  name?: string;
  email?: string;
}


class UserUpdateController{
  async handle(req: Request, res: Response){
    const id = Number(req.params.id);
    const newData = req.body as NewData;

    const { statusCode, body } = await new UserUpdateService().execute(id, newData);

    res.status(statusCode).json(body);
  }
};

export { UserUpdateController };