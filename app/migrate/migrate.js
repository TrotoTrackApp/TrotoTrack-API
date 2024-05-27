const User = require("../../feature/user/model/model");
const Report = require("../../feature/report/model/model");

async function autoMigrate() {
  await User.sync();
  await Report.sync();
  console.log("Auto migration successful");
}

module.exports = autoMigrate;