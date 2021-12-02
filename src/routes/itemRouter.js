var express = require("express");
var app = express();
var itemRouter = express.Router();

// Required store route
var Item = require("../models/Item");

var Star = require("../models/Star");
var Every = require("../models/Every");

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
  var counts;
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
});

itemRouter.route("/EverySaveScore").post(function (req, res) {
  var newaddress = req.body.address;
  var newdater = req.body.date;
  var newscore = req.body.score;
  Every.findOne({ address: newaddress }).then((ress) => {
    Every.findOne({ dater: newdater }).then((resss) => {
      if (!ress || (ress && !resss)) {
        const useraddress = new Every({
          address: newaddress,
          dater: newdater,
          score: newscore,
        });
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
        Every.find({
          $and: [{ dater: newdater }, { address: newaddress }],
        }).then((resss) => {
          console.log(resss[0].score);
          if (resss[0].score < newscore) {
            resss[0].score = newscore;
            resss[0]
              .save()
              .then(() => {
                res.json({ success: true });
              })
              .catch((err) => {
                console.log(err);
                res.json({ success: false });
              });
          }
        });
      }
    });
  });
});

itemRouter.route("/getCount").post(async function (req, res) {
  var counts = [];
  var addresses = [];
  var ItemData = await Item.find({});
  for (const data of ItemData) {
    var ress = await Star.find({
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

  await Item.deleteMany({
    dater: { $not: { $eq: nowDate } },
  });
  await Star.deleteMany({
    dater: { $not: { $eq: nowDate } },
  });
});
itemRouter.route("/SaveStar").post(function (req, res) {
  const stars = new Star({
    address: req.body.address,
    dater: req.body.date,
    star: req.body.star,
  });

  stars
    .save()
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
});
module.exports = itemRouter;
