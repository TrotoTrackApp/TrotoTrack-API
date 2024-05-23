const express = require("express");
const cors = require("cors");
const sequelize = require("./app/database/mysql");
const routes = require("./app/route/route");
const autoMigrate = require("./app/migrate/migrate");
const app = express();


app.use(express.json());
app.use(cors());
app.use(routes);

const PORT = process.env.SERVERPORT;
const startServer = async () => {
  try {
    await sequelize.authenticate();
    autoMigrate();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
