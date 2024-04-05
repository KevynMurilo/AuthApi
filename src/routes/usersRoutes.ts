import { Router } from "express";
import { UserCreateController } from "../controllers/crudUser/UserCreateController";
import { UserViewController } from "../controllers/crudUser/UserViewController";
import { UserViewByIdController } from "../controllers/crudUser/UserViewByIdController";
import { UserDeleteController } from "../controllers/crudUser/UserDeleteController";
import { UserUpdateController } from "../controllers/crudUser/UserUpdateController";

import { verifyToken } from "../middlewares/checkToken";

const router = Router();

router.get("/users", verifyToken, new UserViewController().handle);
router.get("/users/:id", new UserViewByIdController().handle);
router.put("/users/:id", new UserUpdateController().handle);
router.post("/users", new UserCreateController().handle);
router.delete("/users/:id", new UserDeleteController().handle);

export { router as usersRoutes };