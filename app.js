import express from "express";
import { connectDB } from "./db.js";
import http from "http";

const port = 3000;
const app = express();
const server = http.createServer(app);
app.use(express.json());
connectDB();

app.set("views", "views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send(`OSCAR is very Cute`);
});


// socketHandler(server);
server.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on http://localhost:${port}`);
  });