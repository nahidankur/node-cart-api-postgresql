const pool = require("../postgresql/db.js");

const createCart = async (req, res) => {
  try {
    const { name, product_origin } = req.body;

    const cart = await pool.query(
      "INSERT INTO cart (name, product_origin) VALUES ($1, $2) RETURNING *",
      [name, product_origin]
    );

    res.status(201).json(cart.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.json({ message: "Something Went Wrong" });
  }
};

const getAllCarts = async (req, res) => {
  try {
    const carts = await pool.query("SELECT * from cart");
    res.status(200).json(carts.rows);
  } catch (error) {
    console.error(error.message);
    res.json({ message: "Something went wrong" });
  }
};

const getCartsById = async (req, res) => {
  try {
    const cartId = parseInt(req.params.id);
    const cart = await pool.query("SELECT * from cart WHERE id = $1", [cartId]);

    res.status(200).json(cart.rows);
  } catch (error) {
    console.error(error.message);
    res.json({ message: "Something went wrong" });
  }
};

const updateCartById = async (req, res) => {
  try {
    const cartId = parseInt(req.params.id);
    const { name, product_origin } = req.body;

    const updatedCart = await pool.query(
      `UPDATE cart SET name = $1, product_origin = $2 WHERE  id  = $3 RETURNING *`,
      [name, product_origin, cartId]
    );
    res.status(201).json(updatedCart.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.json({ message: "Something went wrong" });
  }
};

const deleteCartById = async (req, res) => {
  try {
    const cartId = parseInt(req.params.id);

    await pool.query("DELETE from cart WHERE id = $1", [cartId]);
    res.status(200).json({ message: "Cart Deleted Succesfully" });
  } catch (error) {
    console.error(error.message);
    res.json({ message: "Something went wrong" });
  }
};

module.exports = {
  createCart,
  getAllCarts,
  getCartsById,
  updateCartById,
  deleteCartById,
};
