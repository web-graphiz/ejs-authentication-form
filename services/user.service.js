const config = require("config");
const bcrypt = require("bcrypt");
const connectDB = require("../utils/db.utils");

const createUser = async (data) => {
  try {
    const salt = await bcrypt.genSalt(config.get("saltFactor"));
    const passHash = bcrypt.hashSync(data.usrPass, salt);

    const userData = [data.usrName, data.usrEmail, passHash];

    const con = await connectDB;

    const sql =
      "INSERT INTO users (fullName, email, password) VALUES (?, ?, ?)";

    const [rows, fields] = await con.execute(sql, userData);
    return true;
  } catch (e) {
    return false;
  }
};

const checkEmail = async (email) => {
  try {
    const con = await connectDB;
    const sql = "SELECT COUNT(*) AS rowCount FROM users WHERE email = ?";
    const [rows, fields] = await con.execute(sql, [email]);

    if (rows[0].rowCount == 0) return true;
    else return false;
  } catch (e) {
    return false;
  }
};

module.exports = { createUser, checkEmail };
