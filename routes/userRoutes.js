const express = require("express");
const router = express.Router();
const auth = require("../auth");

const userController = require("../controllers/userController");
const orderController = require("../controllers/orderController"); ////

// Check Email
router.post("/checkEmail", (req, res) => {
  userController.checkEmailExists(req.body).then((result) => res.send(result));
});

//===== USER REGISTRATION ROUTE =============

router.post("/register", (req, res) => {
  userController.registerUser(req.body).then((result) => res.send(result));
});

// ===== GET SINGLE USER ===========
router.get("/details", auth.verify, (req, res) => {
  // Provides the user's ID for the getProfile controller method

  const userData = {
    id: auth.decode(req.headers.authorization).id,
    isAdmin: auth.decode(req.headers.authorization).isAdmin,
  };
  console.log(userData);
  console.log(req.headers.authorization);

  userController
    .getProfile({ id: userData.id })
    .then((resultFromController) => res.send(resultFromController));
});

//===== USER AUTHENTICATION ========

router.post("/login", (req, res) => {
  userController.loginUser(req.body).then((result) => res.send(result));
});

// ======= GET ALL USERS ======

router.get("/getinfo", auth.verify, (req, res) => {
  const data = {
    userId: req.body,
    isAdmin: auth.decode(req.headers.authorization).isAdmin,
  };
  userController.getAllUsers(data).then((result) => res.send(result));
});
// ===== GET USER ORDERS ========

router.get("/getUserOrders/:userId", auth.verify, (req, res) => {
  const data = {
    userId: req.body,
    isAdmin: auth.decode(req.headers.authorization).isAdmin,
  };
  userController.getUserOrders(data).then((result) => res.send(result));
});

module.exports = router;

// // ====== CHECKOUT =============
// router.post("/checkOut", (req, res) => {
//   orderController.checkout(req.body).then((result) => res.send(result));
// });
