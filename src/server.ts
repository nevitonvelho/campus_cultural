import express from "express";
import { authRouter } from "./routes/authRoutes"; 
import { eventRouter } from "./routes/eventRoutes"; 
import { userRouter } from "./routes/userRoutes";

import swaggerUi from "swagger-ui-express";
import swaggerConfig from "../swaggerConfig";



const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/events", eventRouter);  
app.use("/users", userRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));


app.listen(3333, () => {
  console.log("Servidor rodando na porta 3333");
});
