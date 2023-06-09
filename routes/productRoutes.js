// const { Router } = require("express");
const express = require("express");
const router = express.Router();
const auth = require("../auth");

const productController = require("../controllers/productController");
const orderController = require("../controllers/orderController"); //////
//const product = require("../models/product");

// ==== CREATING PRODUCTS =====
router.post("/createProduct", auth.verify, (req, res) => {
  //add auth.verify for verification @auth.js
  //==== VERIFIER =====
  const data = {
    product: req.body,
    isAdmin: auth.decode(req.headers.authorization).isAdmin,
  };
  productController.createProduct(data).then((result) => res.send(result));
});

// ==== SETTING PRODUCTS AS ACTIVE/INACTIVE ==========

// router.put("/:productId", auth.verify, (req, res) => {
//   productController
//     .updateProduct(req.params, req.body)
//     .then((result) => res.send(result));
// });

// ==== GETTING ALL PRODUCTS (ACTIVE AND INACTIVE)"ADMIN"======
router.get("/", (req, res) => {
  // const data = {
  //   product: req.body,
  //   isAdmin: auth.decode(req.headers.authorization).isAdmin,
  // };
  productController.getAllProducts().then((result) => res.send(result));
});
//==== GETTING ALL PRODUCTS (ACTIVE ONLY) "USERS" ========

router.get("/getAllActiveProducts", auth.verify, (req, res) => {
  // const data = {
  //   // product: req.body,
  //   isActive: true,
  //   // isAdmin: auth.decode(req.headers.authorization).isAdmin,
  // };
  productController.getAllActiveProducts().then((result) => res.send(result));
});

//==== RETRIEVING SINGLE PRODUCT (ADMIN - ACTIVE AND INACTIVE) ==========

router.post("/userProductDetails", auth.verify, (req, res) => {
  const data = {
    id: req.body,
    isAdmin: auth.decode(req.headers.authorization).isAdmin,
  };
  productController.userProductDetails(data).then((result) => res.send(result));
});

//==== RETRIEVING SINGLE PRODUCT (USER - ACTIVE ONLY) ==========

router.post("/productDetails", auth.verify, (req, res) => {
  const data = {
    id: req.body,
    isAdmin: auth.decode(req.headers.authorization).isAdmin,
  };
  productController.productDetails(data).then((result) => res.send(result));
});

//=====get single product=====
router.get("/:productId", (req, res) => {
  productController.getProduct(req.params).then((result) => res.send(result));
});

// ========= UPDATE PRODUCT (ADMIN) ==============

router.put("/:productId", auth.verify, (req, res) => {
  // const adminKey = { isAdmin: auth.decode(req.headers.authorization).isAdmin };

  productController
    .updateProduct(req.params, req.body, adminKey)
    .then((result) => res.send(result));
});

// ======= ARCHIVING PRODUCTS ============
router.put("/archiveProduct/:productId", auth.verify, (req, res) => {
  const adminKey = { isAdmin: auth.decode(req.headers.authorization).isAdmin };

  productController
    .archiveProduct(req.params, adminKey)
    .then((result) => res.send(result));
});

// ========= UNARCHIVING PRODUCTS ============
router.put("/unarchiveProduct/:productId", auth.verify, (req, res) => {
  const adminKey = { isAdmin: auth.decode(req.headers.authorization).isAdmin };

  productController
    .unarchiveProduct(req.params, adminKey)
    .then((result) => res.send(result));
});

module.exports = router;
