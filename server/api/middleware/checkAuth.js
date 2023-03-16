const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");
const client = require("../models/clientModel");

const checkClient = async (req, res, next) => {
  // const token = req.headers.authorization.split(" ")[1];
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  } else {
    try {
      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Get admin by id
      const user = decoded;
      const findUser = await client.findById(user.id);
      if (findUser) {
        return res.status(201).json({ message: "authorized" });
      } else {
        return res.status(401).json({ message: "Unauthorized" });
      }
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      } else {
        return res.status(401).json({ message: "Unauthorized" });
      }
    }
  }
};

const checkAdmin = async (req, res, next) => {
  const token = req.cookies.token;
  //   const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized ff" });
  } else {
    try {
      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Get admin by id
      req.user = decoded;
      const findAdmin = await Admin.findById(decoded.id);
      if (findAdmin) {
        return res.status(201).json({ message: "authorized" });
      } else {
        return res.status(401).json({ message: "Unauthorized ss" });
      }
    } 
    catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      } 
      else {
        return res.status(401).json({ message: "Unauthorized dd" });
      }
    }
  }
};

module.exports = { checkClient, checkAdmin };
