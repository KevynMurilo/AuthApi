import "dotenv/config";
import express from "express";
import { routes } from "./routes";

const server = express();
routes(server);

server.use(express.json());

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server is running - ${PORT}`);
});