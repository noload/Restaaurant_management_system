const { Router } = require("express");
const router = Router();
const v1Route = require("./v1");
router.use("/v1", v1Route);

module.exports = router;
