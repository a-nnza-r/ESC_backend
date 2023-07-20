/*
Logic for Server
*/

import express from "express";
const app = express();
app.use(express.json());
import excoRouter from "./routes/exco.js";
import oslRouter from "./routes/osl.js";
import rootRouter from "./routes/root.js";
import epfRouter from "./routes/epf.js";
import fileRouter from "./routes/file.js";

app.use("/users", excoRouter);
app.use("/users", oslRouter);
app.use("/users", rootRouter);
app.use("/epfs", epfRouter);
app.use("/files", fileRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
