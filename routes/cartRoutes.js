const express = require("express");

const router = express.Router();

const {
  createCart,
  getAllCarts,
  getCartsById,
  updateCartById,
  deleteCartById,
} = require("../controller/cartController");

router.post("/create", createCart);
router.get("/", getAllCarts);
router.get("/:id", getCartsById);
router.put("/:id", updateCartById);
router.delete("/:id", deleteCartById);

module.exports = router;
