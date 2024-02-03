const { Router } = require("express");
const { authMiddleware } = require("../../middleware/validation");
const { Order } = require("../../db");
const router = Router();

router.post("/add-order", authMiddleware, async (req, res) => {
  const order = await Order.create({ ...req.body });

  if (!order) {
    res.status(404).json({
      success: false,
      message: "Order not created ",
      data: [],
    });
  }

  res.status(200).json({
    success: true,
    message: "Order created successfully",
    order,
  });
});

router.get("/get-order/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const orders = await Order.find({ user_id });

  if (!orders) {
    res.status(404).json({
      success: false,
      message: "Orders Not Found",
      data: [],
    });
  }
  res.status(200).json({
    success: true,
    message: "Fetched all order for specific user",
    orders,
  });
});
module.exports = router;
