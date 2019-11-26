const express = require("express");
const cartRoutes = express.Router();

const cartItems = [
  { id: 1, product: "carrots", price: 4.99, quantity: 5 },
  { id: 2, product: "Turkey", price: 35.01, quantity: 1 },
  { id: 3, product: "potatos", price: 2.37, quantity: 2 }
];
let nextId = 4;

//get all cart items
cartRoutes.get("/cart-items", (req, res) => {
  res.json(cartItems);
});

//get cart item by id
cartRoutes.get("/cart-items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = cartItems.find(item => item.id === id);
  if (item) {
    res.json(item);
  } else {
    res.status(404);
    res.send(`id ${id} not found`);
  }
});

//add cart item
cartRoutes.post("/cart-items", (req, res) => {
  const item = req.body;
  item.id = nextId++;
  cartItems.push(item);

  res.status(201);
  res.json(item);
});

//update cart item
cartRoutes.put("/cart-items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = req.body;
  item.id = id;
  const index = cartItems.findIndex(i => i.id === id);
  cartItems.splice(index, 1, item);
  res.json(item);
});

//delete cart item
cartRoutes.delete("/cart-items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = cartItems.findIndex(i => i.id === id);
  if (index !== -1) {
    cartItems.splice(index, 1);
  }
  res.sendStatus(204);
});
module.exports = cartRoutes;
