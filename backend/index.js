const express = require("express");
const app = express();
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");
app.use(express.json());
app.use(cors());
const dotenv = require("dotenv");

dotenv.config();

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  delete result.confirmPassword;
  res.send(result);
});

app.get("/valid-mail", async (req, res) => {
  let valmail = await User.find();
  // console.log(valmail);
  res.send(valmail);
});

app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      res.send(user);
    } else {
      res.json({});
    }
  } else {
    res.send({ message: "user not found" });
  }
});

app.post("/add-product", async (req, res) => {
  let product = Product(req.body);
  let result = await product.save();
  res.send(result);
});

app.get("/products", async (req, res) => {
  let products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ message: "Not product found" });
  }
});

PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server running on PORT ${PORT}`));
