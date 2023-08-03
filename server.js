/*
Logic for Server
*/

import express from "express";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
import userRouter from "./routes/user.js";
import epfRouter from "./routes/epf.js";
import fileRouter from "./routes/file.js";

app.use("/users", userRouter);
app.use("/epfs", epfRouter);
app.use("/files", fileRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
