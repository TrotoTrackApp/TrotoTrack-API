const User = require("../../feature/user/model/model");

async function autoMigrate() {
  await User.sync();
  console.log("Auto migration successful");
}

module.exports = autoMigrate;