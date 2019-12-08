const express = require("express");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const neo4j = require("neo4j-driver").v1;
var cors = require("cors");

var app = express();

app.use(cors());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

var driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic("neo4j", "121212")
);
var session = driver.session();

app.get("/findByNumber/:number", function(req, res) {
  session
    .run("MATCH (b:Bus {number: '" + req.params.number + "'}) RETURN b")
    .then(function(result) {
      result.records.forEach(function(record) {
        console.log(record._fields);
        res.status(200).json({ data: record._fields });
      });
    })
    .catch(function(err) {
      console.log(err);
    });
});

app.get("/findByRelationship/:station", function(req, res) {
  session
    .run(
      `MATCH (a:Station {name: '${req.params.station}'})-[r]-(b) RETURN r, b`
    )
    .then(async function(result) {
      let items = [];
      await result.records.forEach(function(record) {
        items.push(record._fields);
      });
      console.log(items);
      res.status(200).json({ data: items });
    })
    .catch(function(err) {
      console.log(err);
    });
});
// rasti visus ivesto miesto IS_NEAR relationus ir tu realtionu relationus
app.get("/findByDeepRelation/:station", function(req, res) {
  session
    .run(
      `MATCH (s:Station {name:"${req.params.station}"})-[:IS_NEAR]->(p:Station)-[:BELONGS_TO]-(b:Bus)
    RETURN s, p, b;`
    )
    .then(async function(result) {
      let items = [];
      await result.records.forEach(function(record) {
        items.push(record._fields);
      });
      console.log(result);
      res.status(200).json({ data: items });
    })
    .catch(function(err) {
      console.log(err);
    });
});

app.get("/findShortestPath/:a&:b", function(req, res) {
  session
    .run(
      `MATCH path=shortestPath((a:Station {name:"${req.params.a}"})-[*0..10]-(b:Station {name:"${req.params.b}"}))
    RETURN path`
    )
    .then(async function(result) {
      let items = [];
      await result.records.forEach(function(record) {
        items.push(record._fields);
      });
      console.log(result);
      res.status(200).json({ data: items });
    })
    .catch(function(err) {
      console.log(err);
    });
});

//rasti trumpiausia kelia tarp miestu per node's (vilnius-klaipeda) ir apskaiciuoti (agreguoti) atstuma
//reikia sukurti tarp relationu label su atstumu
app.get("/aggregate/:a&:b", function(req, res) {
  session
    .run(
      `MATCH path=shortestPath((a:Station {name:"${req.params.a}"})-[*0..10]-(b:Station {name:"${req.params.b}"}))
    RETURN path,
       reduce(acc=0, r in relationships(path) |
              acc + case when r.distance is null then 0 else r.distance end
       ) as pathLength`
    )
    .then(async function(result) {
      let items = [];
      await result.records.forEach(function(record) {
        items.push(record._fields);
      });
      console.log(result);
      res.status(200).json({ data: items });
    })
    .catch(function(err) {
      console.log(err);
    });
});

app.use(express.static(path.join(__dirname, "app/neo4j/build")));
// Anything that doesn't match the above, send back index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "app/neo4j/build/index.html"));
});

app.listen(3001);
console.log("Server started on port 3001");
