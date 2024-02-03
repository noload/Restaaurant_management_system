const { Router } = require("express");
const {
  validateAddUser,
  validateLoginUser,
} = require("../../middleware/validation");
const { createHash, validatePassword } = require("../../middleware/Hashing");
const { User } = require("../../db");
const { JWT_SECRET } = require("../../config/serverConfig");
const jwt = require("jsonwebtoken");
const router = Router();

//all routes
router.post("/add-user", validateAddUser, async (req, res) => {
  try {
    const isUserExist = await User.findOne({
      phone_number: req.body.phone_number,
    });

    if (isUserExist) {
      res.status(411).json({
        success: false,
        message: "User already exist.!!!",
        data: [],
        err: {},
      });
    }

    const hashedPassword = await createHash(req.body.password);

    const user = await User.create({
      name: req.body.name,
      password: hashedPassword,
      phone_number: req.body.phone_number,
    });

    const userId = user._id;

    const token = jwt.sign(
      {
        userId,
      },
      JWT_SECRET
    );

    res.status(200).json({
      userId,
      success: true,
      message: "User created successfully",
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User Not created",
      err: error.message,
    });
    throw error;
  }
});

router.post("/login-user", validateLoginUser, async (req, res) => {
  const user = await User.findOne({ phone_number: req.body.phone_number });

  if (!user) {
    return res.status(500).json({
      success: false,
      message: "User Not exist",
    });
  }

  const validate = await validatePassword(req.body.password, user.password);

  if (!validate) {
    return res.status(500).json({
      success: false,
      message: "Password Is Incorrect",
    });
  }
  const userId = user._id;

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.status(200).json({
    success: true,
    message: "Logged successfully",
    token,
  });

});

module.exports = router;
