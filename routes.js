const express = require("express");
const cartRoutes = express.Router();
const pool = require("./pg-connection-pool");

// const cartItems = [
//   { id: 1, product: "carrots", price: 4.99, quantity: 5 },
//   { id: 2, product: "Turkey", price: 35.01, quantity: 1 },
//   { id: 3, product: "potatos", price: 2.37, quantity: 2 }
// ];
// let nextId = 4;

//get all cart items
cartRoutes.get("/cart-items", (req, res) => {
  let sql = "SELECT * FROM shopping_cart";
  pool.query(sql).then(result => {
    res.json(result.rows);
  });
});

//get cart item by id
cartRoutes.get("/cart-items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let sql = "SELECT * FROM shopping_cart WHERE id = $1::int";
  let params = [id];
  pool.query(sql, params).then(result => {
    if (result.rows.length !== 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404);
      res.send("item not found");
    }
  });
});

//add cart item
cartRoutes.post("/cart-items", (req, res) => {
  const item = req.body;
  let sql = `INSERT INTO shopping_cart (product, price, quantity) VALUES ($1::TEXT, $2::REAL, $3::INT)`;
  let params = [item.product, item.price, item.quantity];
  pool.query(sql, params).then(result => {
    res.json(result.rows[0]);
    res.status(201);
  });
});

// update cart item
cartRoutes.put("/cart-items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = req.body;
  let sql = `UPDATE shopping_cart SET quantity = $1::int WHERE id = $2::int`;
  let params = [item.quantity, id];
  pool.query(sql, params).then(result => {
    res.json(result.rows[0]);
  });
});

//delete cart item
cartRoutes.delete("/cart-items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let sql = `DELETE FROM shopping_cart WHERE id = $1::int`;
  let params = [id];
  pool.query(sql, params).then(result => {
    // res.sendStatus(204); combine following  lines

    res.status(204);
    res.json();
  });
});

module.exports = cartRoutes;
