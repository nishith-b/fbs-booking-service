const express = require("express");
const apiRoutes = require("./routes");
const { ServerConfig } = require("./config");
const CRONS = require("./utils/common/cron-job");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, () => {
  console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
  CRONS.cronSchedule();
});
