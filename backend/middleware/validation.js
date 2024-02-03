const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/serverConfig");
const validateAddUser = (req, res, next) => {
  console.log(req.body);
  const validateAddUser = zod.object({
    name: zod.string(),
    phone_number: zod.number().lte(9999999999).gte(1000000000), //validate valid number entered
    password: zod.string(),
  });
  const { success, error } = validateAddUser.safeParse(req.body);
  console.log(error);
  if (!success) {
    return res.json({
      success: false,
      message: "Incorrect Input Field",
    });
  }
  next();
};

const validateLoginUser = (req, res, next) => {
  const validateLoginBody = zod.object({
    phone_number: zod.number().lte(9999999999).gte(1000000000), //validate valid number entered
    password: zod.string(),
  });

  const { success, error } = validateLoginBody.safeParse(req.body);
  console.log(error);
  if (!success) {
    return res.json({
      success: false,
      message: "Incorrect Input Field",
    });
  }
  next();
};

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Token not found",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.body.user_id = decoded.userId;

    if (decoded) {
      next();
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
      err: error,
    });
    throw error;
  }
};

module.exports = {
  validateAddUser,
  validateLoginUser,
  authMiddleware,
};
