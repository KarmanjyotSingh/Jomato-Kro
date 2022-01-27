var express = require("express");
var router = express.Router();
const food = require("../models/food");
const tag = require("../models/tags");
const order = require("../models/order");
const fav = require("../models/favorite")

router.post("/addon", (req, res) => {
  const newAddon = new food({
    name: req.body.name,
    price: req.body.price,
  });

  newAddon
    .save()
    .then((newAddon) => res.status(200).json(newAddon))
    .catch((err) => res.status(400).send(err));
});

router.get("/getaddon", (req, res) => {
  food.find(function (err, food) {
    if (err) {
      res.send(err);
    } else {
      res.json(food);
    }
  });
});

router.post("/addtag", (req, res) => {
  const newAddon = new tag({
    name: req.body.name,
  });
  newAddon
    .save()
    .then((newAddon) => res.status(200).json(newAddon))
    .catch((err) => res.status(400).send(err));
});

router.get("/gettags", (req, res) => {
  tag.find(function (err, food) {
    if (err) {
      res.send(err);
    } else {
      res.json(food);
    }
  });
});

router.post("/placeorder", (req, res) => {
  const newOrder = new order(
    {
      item_name: req.body.item_name,
      vendor_shop: req.body.vendor_shop,
      vendor_email: req.body.vendor_email,
      buyer_email: req.body.buyer_email,
      quantity: req.body.quantity,
      placed_time: req.body.placed_time,
      addon_name: req.body.addon_name,
      addon_price: req.body.addon_price,
    });
  newOrder
    .save()
    .then((newOrder) => res.status(200).json(newOrder))
    .catch((err) => res.status(400).send(err));
});

router.get("/orderItems", function (req, res) {

  food.find(function (err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  })
});

router.post("/addfav", (req, res) => {
  fav.findOne({ name: req.body.name, email: req.body.email })
    .then((favx) => {
      if (favx) {
        res.status(400).send("Already Exists");
      } else {
        const newFav = new fav({
          name: req.body.name,
          email: req.body.email,
          price: req.body.price,
          vendor_shop: req.body.vendor_shop
        });
        newFav
          .save()
          .then((newFav) => res.status(200).json(newFav))
          .catch((err) => res.status(400).send(err));

      }
    })
});

router.post("/remove_fav", (req, res) => {
  fav.findOne({ name: req.body.name, email: req.body.email })
    .then((favx) => {
      if (favx) {
        const name = req.body.name;
        const email = req.body.email;
        fav.deleteOne({ name: name, email: email })
          .then((food_found) => {
            res.status(200).json({ status: "Success", food_found: food_found });
          })
          .catch((err) => res.status(400).send(err));
      }
      else {
        res.status(400).send("Not Found");
      }
    })
});

router.get("/favorites", function (req, res) {

  fav.find(function (err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  })
});


module.exports = router;
