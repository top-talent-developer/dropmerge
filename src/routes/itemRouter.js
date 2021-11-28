var express = require("express");
var app = express();
var itemRouter = express.Router();

// Required store route
var Item = require("../models/Item");
var Count = require("../models/Count");
itemRouter.route("/saveAddress").post(function (req, res) {
  var newaddress = req.body.address;
  var newdater = req.body.dater;

  Item.findOne({ address: newaddress }).then((ress) => {
    if (!ress) {
      const useraddress = new Item({ address: newaddress, dater: newdater });
      useraddress
        .save()
        .then(() => {
          res.json({ success: true });
        })
        .catch((err) => {
          console.log(err);
          res.json({ success: false });
        });
    } else {
      res.send({ success: false });
    }
  });
});

itemRouter.route("/SaveScore").post(function (req, res) {
  const { address, score, date } = req.body;

  Item.findOne({ address: address }).then((ress) => {
    if (ress) {
      if (ress.score < score) {
        ress.score = score;
        ress
          .save()
          .then(() => {
            res.json({ success: true });
          })
          .catch((err) => {
            console.log(err);
            res.json({ success: false });
          });
      } else {
        res.json({ success: false });
      }
    } else {
      res.send({ success: false });
    }
  });
  const count = new Count({ address: address, dater: date });

  count
    .save()
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
});

itemRouter.route("/getCount").post(async function (req, res) {
  var counts = [];
  var addresses = [];
  var ItemData = await Item.find({});
  for (const data of ItemData) {
    var ress = await Count.find({
      address: data.address,
      dater: req.body.date,
    });
    addresses.push(data.address);
    counts.push(ress.length);
  }
  res.json({ addresses: addresses, counts: counts });
});
itemRouter.route("/deleteCount").post(async function (req, res) {
  const current = new Date();
  const nowDate = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  await Count.deleteMany({
    dater: { $not: { $eq: nowDate } },
  });
  await Item.deleteMany({
    dater: { $not: { $eq: nowDate } },
  });
});
module.exports = itemRouter;
