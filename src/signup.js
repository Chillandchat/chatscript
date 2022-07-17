var uuid = require("uuid");
var dotenv = require("dotenv");

/**
 * This function will send a request to the server to create a new user instance.
 *
 * @param {string} username The username of the new user.
 * @param {string} password The password of the new user.
 * @returns {Promise<void>}
 */

dotenv.config();

function signup(username, password) {
  var botId = uuid();

  post(process.env.API_URL + "/api/signup?key=" + process.env.API_KEY, {
    id: botId,
    username: username,
    password: password,
    verified: false,
    bot: true,
    blocked: false,
  })
    .then(function (_data) {
      return botId;
    })
    .catch(function (err) {
      console.error(err);
      process.exit(1);
    });
}

module.exports = signup;
