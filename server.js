const express = require("express");
const dotEnv = require("dotenv");
const cartRoutes = require("./routes/cartRoutes.js");
dotEnv.config();

const app = express();

app.use(express.json());

app.use("/api", cartRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running under port ${process.env.PORT} successfully`);
});
