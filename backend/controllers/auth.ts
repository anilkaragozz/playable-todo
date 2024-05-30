import { Response } from "express";

const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const {
  registerValidator,
  loginValidator,
} = require("../middleware/validator");
const jwt_secret = process.env.JWT_SECRET;

const register = async (req: typeof User, res: Response) => {
  await Promise.all(
    registerValidator.map((validation: any) => validation.run(req))
  );
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const login = async (req: typeof User, res: Response) => {
  await Promise.all(
    loginValidator.map((validation: any) => validation.run(req))
  );
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("User not found!");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("Invalid password!");

    const access_token = jwt.sign({ id: user._id }, jwt_secret, {
      expiresIn: "1h",
    });
    res.status(200).json({
      user,
      access_token,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { register, login };
