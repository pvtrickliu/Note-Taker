const fs = require("fs")
const router = require("express").Router()

router.get("/notes", function(req, res) {
    fs.readFile("db/db.json", "utf8", (err, jsonString) => {
      if (err) {
        console.log(err);
        return;
      }
      res.json(JSON.parse(jsonString));
    });
  });
  
router.post("/notes", ({ body }, res) => {
    const og = fs.readFileSync("db/db.json");
    const parsed = JSON.parse(og);
    const newObj = parsed.concat(body);
    const string = JSON.stringify(newObj);
    fs.writeFile("db/db.json", string, function(err) {
      if (err) console.log(err);
      res.json(string);
    });
  });
  
router.delete("/notes/:title", function(req, res) {
    const og = fs.readFileSync("db/db.json");
    const parsed = JSON.parse(og);
    const newData = parsed.filter(obj => {
      return obj.title !== req.params.title;
    });
    fs.writeFile("db/db.json", JSON.stringify(newData), function(err) {
      if (err) console.log(err);
      res.json(newData);
    });
  });
  
module.exports = router;