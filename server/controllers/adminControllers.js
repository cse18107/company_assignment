const Admin = require("../model/adminModel");
const jwt = require("jsonwebtoken");

exports.getAdmin = async (req, res) => {
  let admin;
  try {
    admin = await Admin.find();
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }

  let token;
  try {
    token = jwt.sign(
      { email: admin.email, password: admin.password },
      "0dsdfexekaLks-sd00092dfjL/wefhsifej",
      { expiresIn: 300 }
    );
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
  res.status(200).json({
    status: "success",
    admin: admin,
    token: token,
  });
};
