import express from "express";
import swaggerUi from "swagger-ui-express";

import { router } from "./routes";
import swaggerDocument from "./swagger.json";

import "./database";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api", router);

app.listen(8000, () => {
  console.log(`🔥 Server started running on: 8000`);
});
