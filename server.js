/*
Logic for Server
*/

import express from "express";
const app = express();
app.use(express.json());
import usersRouter from "./routes/user.js";
import epfRouter from "./routes/epf.js";

app.use("/users", usersRouter);
app.use("/epfs", epfRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
