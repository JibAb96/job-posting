import express from "express";
import cors from "cors";
import pkg from "body-parser";
import router from "./api/route/app.js";

const app = express();
const { json } = pkg;

app.use(cors());
app.use(express.json());
app.use(json());

app.use("/", router);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

