const { Router } = require("express");
const { authMiddleware } = require("../../middleware/validation");
const { Order } = require("../../db");
const router = Router();

router.post("/add-order", authMiddleware, async (req, res) => {
  const order = await Order.create({ ...req.body });

  if (!order) {
    res.send("something went wrong");
  }

  res.send("order created");
});

router.get("/get-order/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const orders = await Order.find({ user_id });

  if (!orders) {
    res.send("Not found order");
  }
  res.status(200).json({
    orders,
  });
});
module.exports = router;
