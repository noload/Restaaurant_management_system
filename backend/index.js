const express = require("express");
const { PORT } = require("./config/serverConfig");
const { User } = require("./db");
const apiRouter = require("./routes");
const app = express();
app.use(express.json());
app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`server listining on port ${PORT}`);
});
