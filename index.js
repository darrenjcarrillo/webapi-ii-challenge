const express = require("express");

// 1
const dbRouter = require("./data/db-router.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send(`
    <h2>Lambda DB API</h2>
  `);
});

// 2
server.use("/api/posts", dbRouter);
// server.use("/api/posts/:id/comments", dbRouter);

server.listen(4000, () => {
  console.log("\n*** Server Running on http://localhost:4000 ***\n");
});
