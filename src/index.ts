import express from "express";
import http from "http";
import bodyparser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";

const app = express();

app.use(cors({ credentials: true }));

app.use(compression());
app.use(cookieParser());
app.use(bodyparser.json());

const server = http.createServer(app);

server.listen(8080, () => {
  console.log("Server running on port 8080");
});

const MONGO_URL =
  "mongodb+srv://inhoob:0itZpLpjHCHVHnZk@cluster0.j2bpvke.mongodb.net/?retryWrites=true&w=majority";

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (err) => {
  console.log("mongooseerror", err);
});

app.use("/", router());
