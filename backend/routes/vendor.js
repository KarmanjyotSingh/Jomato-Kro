var express = require("express");
var router = express.Router();
const empty = require("is-empty");
const bcrypt = require("bcryptjs");
const check_vendor_register_data = require("./../check_input_data/vendor_register");
const buyer = require("../models/buyer");
const vendor = require("../models/vendor");
const food = require("../models/food");

router.post("/register", (req, res) => {
  const { error, valid_bit } = check_vendor_register_data(req.body);

  if (valid_bit == true) {
    // atleast the data entered is valid as the valid bit is set
    buyer.findOne({ email: req.body.email }).then((buyer_found) => {
      if (buyer_found) {
        return res.status(400).json({ email: "A vendor cannot be a buyer " });
      }
    });

    vendor.findOne({ email: req.body.email }).then((vendor_found) => {
      if (vendor_found) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newVendor = new vendor({
          manager_name: req.body.manager_name,
          email: req.body.email,
          shop_name: req.body.shop_name,
          contact_number: req.body.contact_number,
          open_time: req.body.open_time,
          password: req.body.password,
          close_time: req.body.close_time,
        });
        // store the hashed password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newVendor.password, salt, (err, hash) => {
            if (err) throw err;
            newVendor.password = hash;
            newVendor
              .save()
              .then((newVendor) => res.json(newVendor))
              .catch((err) => res.send(err));
          });
        });
      }
    });
  } else {
    res.status(400).json(error);
  }
});

router.post("/profile", (req, res) => {
  const email = req.body.email;
  vendor.findOne({ email: email }).then((vendor_found) => {
    if (vendor_found) {
      res.json(vendor_found);
    } else {
      res.status(404).send("No vendor found");
    }
  });
});

router.put("/edit_profile", (req, res) => {
  const email = req.body.email;
  vendor
    .findOne({ email: email })
    .then((buyer_found) => {
      buyer_found.manager_name = req.body.manager_name;
      buyer_found.email = req.body.email;
      buyer_found.contact_number = req.body.contact_number;
      buyer_found.open_time = req.body.open_time;
      buyer_found.close_time = req.body.close_time;
      buyer_found.shop_name = req.body.shop_name;
      buyer_found.password = req.body.password;
      buyer_found
        .save()
        .then((buyer_found) => res.json(buyer_found))
        .catch((err) => res.send(err));
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

function parse_tag(params) {
  let tags = [];
  for (let i = 0; i < params.length; i++) {
    let k = i;
    for ( let j = k ; j < params.length; j++) {
    }
  }
}

router.post("/food_items", (req, res) => {
  const item_name = req.body.name;
  const vendor_name = req.body.vendor;
  food.findOne({ name: item_name, vendor: vendor_name }).then((food_found) => {
    if (food_found) {
      res.status(400).send("Item already exists");
    } else {
      const newFood = new food({
        name: req.body.name,
        price: req.body.price,
        vendor: req.body.vendor,
        rating: req.body.rating,
        food_type: req.body.food_type,
        food_add_on: req.body.food_add_on,
        tags: req.body.tags,
      });
      newFood
        .save()
        .then((newFood) => res.json(newFood))
        .catch((err) => res.send(err));
    }
  });
});

router.post("/item_list", (req, res) => {
  const vendor_name = req.body.vendor;
  food.find({ vendor: vendor_name }).then((food_found) => {
    if (food_found) {
      res.json(food_found);
    } else {
      res.status(404).send("No items found");
    }
  });
});

router.delete("");

module.exports = router;
