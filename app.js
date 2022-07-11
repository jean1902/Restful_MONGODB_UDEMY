const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongo = require("mongodb");
const mongoose = require("mongoose");
let urlencodedParser = bodyParser.urlencoded({ extended: false });
const port = 2000;
mongoose.connect("mongodb://localhost/sothebyDB", { useNewUrlParser: true });

const paintingSchema = new mongoose.Schema({
  name: String,
  author: String,
  price: Number,
});

const painting = mongoose.model("paintingsold", paintingSchema);

const joconde = new painting({
  name: "la joconde",
  author: "Leonard de vinci",
  price: 300,
});
const Guernica = new painting({
  name: "Guernica",
  author: "picasso",
  price: 200,
});

const NuitEtoile = new painting({
  name: "La nuit etoile",
  author: "van goh",
  price: 400,
});

// painting.insertMany([joconde,Guernica,NuitEtoile],function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("insert sucess");
//     }
// })

app.get("/paintings", (req, res) => {
  painting.find({}, function (err, peintures) {
    // recuperer comme une api depuis la BD en creant un nouveau chemin
    if (err) {
      console.log(err);
    } else {
      res.send(peintures);
    }
  });
});

// app.pos en restful ajoute un nouvel object
app.post("/paintings", function (req, res) {
  const Object = new painting({
    name: req.body.name,
    author: req.body.author,
    price: req.body.price,
  });

  Object.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("painting sold");
    }
  });
});

app.get("/paintings", (req, res) => {
  painting.deleteMany({}, function (err, peintures) {
    // recuperer comme une api depuis la BD en creant un nouveau chemin
    if (err) {
      console.log(err);
    } else {
      console.log("peinture supprime");
    }
  });
});

app.get("/paintings/:paintingName", (req, res) => {
  painting.findOne({ name: req.params.paintingName }, function (err, peinture) {
    if (err) {
      console.log(err);
    } else {
      res.send(peinture);
    }
  });
});

app.put("/paintings/:paintingName", function (req, res) {
  painting.update(
    { name: req.params.paintingName },
    { name: req.body.name, author: req.body.author, price: req.body.price },
    { overwrite: true },
    function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("updated");
      }
    }
  );
});
app.patch("/paintings/:paintingName", function (req, res) {
  painting.update(
    { name: req.params.paintingName },
    { $set: req.body },
    function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log(" PATCH updated");
      }
    }
  );
});

app.delete("/paintings/:paintingName", function (req, res) {
  painting.deleteOne({ name: req.params.paintingName }, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log(" deleted updated succes");
    }
  });
});

app.get("/", (req, res) => {
  res.render("index");
});

app.set("views", "./views");
app.set("view engine", "ejs");
app.use("/public", express.static("public"));

app.listen(port, (req, res) => {
  console.log("ecoute sur le port " + port);
});
