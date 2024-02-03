const { Router } = require("express");
const router = Router();
const userRoute = require("./User");
const orderRoute = require("./Order");

router.use("/user", userRoute);
router.use("/order", orderRoute);

module.exports = router;
