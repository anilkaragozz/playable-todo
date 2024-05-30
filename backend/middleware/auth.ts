import { Response, NextFunction } from "express";

const jwt = require("jsonwebtoken");

const jwt_secret = process.env.JWT_SECRET;

const authVerification = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new Error();
    }

    const decodedData = jwt.verify(token, jwt_secret);
    req.userId = decodedData?.id;

    next();
  } catch (error) {
    res.status(401).json("Unauthorized: Invalid token");
  }
};

module.exports = authVerification;
