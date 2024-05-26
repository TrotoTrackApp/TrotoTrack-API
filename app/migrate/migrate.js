const User = require("../../feature/user/model/model");
const Article = require("../../feature/article/model/model");

async function autoMigrate() {
  await User.sync();
  await Article.sync();
  console.log("Auto migration successful");
}

module.exports = autoMigrate;