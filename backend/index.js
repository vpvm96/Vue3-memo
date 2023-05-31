import express from "express";
import bodyParser from "body-parser";

import { selectQuery } from "./db/db.js";

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get("/api/memos", async (req, res) => {
  const result = await selectQuery("SELECT * FROM memos");
  res.send(result);
});

app.post("/api/memos", async (req, res) => {
  const result = await selectQuery("INSERT INTO memo (content) VALUES (?)", [
    req.body.content,
  ]);
  res.send(result);
});

app.put("/api/memos/:id", async (req, res) => {
  const result = await selectQuery("UPDATE memo SET content = ? WHERE id = ?", [
    req.body.content,
    req.params.id,
  ]);
  res.send(result);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
