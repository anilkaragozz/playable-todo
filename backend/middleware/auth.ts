import { Response, NextFunction } from "express";

const jwt = require("jsonwebtoken");

const jwt_secret = process.env.JWT_SECRET;

const authVerification = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["Authorization"].split(" ")[1];
    let decodedData;

    if (token) {
      decodedData = jwt.verify(token, jwt_secret);
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    res.status(500).json("Invalid token");
  }
};

module.exports = authVerification;
