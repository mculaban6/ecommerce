// // const { Router } = require("express");
const express = require("express");
const router = express.Router();
const auth = require("../auth");

const orderController = require("../controllers/orderController");

// ============ GET ALL ORDERS ===========
router.get("/getAllOrders", auth.verify, (req, res) => {
  const data = { isAdmin: auth.decode(req.headers.authorization).isAdmin };
  orderController
    .getAllOrders(data)
    .then((resultFromController) => res.send(resultFromController));
});

// ======= add order ===========

router.post("/checkout", auth.verify, (req, res) => {
  const data = {
    isAdmin: auth.decode(req.headers.authorization).isAdmin,
    productId: req.body.productId,
    userId: req.body.userId,
    quantity: req.body.quantity,
  };

  orderController.checkout(data).then((result) => res.send(result));
});

// ==== Get User Orders Details ===============
router.get("/getUserDetails", auth.verify, (req, res) => {
  const data = {
    userId: req.body.userId,
    isAdmin: auth.decode(req.headers.authorization).isAdmin,
  };

  orderController.getUserOrders(data).then((result) => res.send(result));
});

module.exports = router;
