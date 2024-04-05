import express from "express";
import { usersRoutes } from "./usersRoutes";
import { authRoutes } from "./authRoutes";

const routes = (server: express.Application) => {
  server.use(
      express.json(),
          usersRoutes,
          authRoutes
  )
}

export { routes };