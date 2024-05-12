import { app } from "./infra/http/express/express";
import dotenv from "dotenv";

dotenv.config();
const port: number = Number(process.env.PORT) || 8888;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
