require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const main = require("./db/Mongo_DB");
const UserRoutes = require("./routes/UserRoute");
const PostRoutes = require("./routes/PostRoute");

main();
const PORT = process.env.PORT || 4000;
const app = express();

const CORS = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(CORS));
app.use(express.json());
app.use(cookieParser());

app.use("/insta", UserRoutes);
app.use("/insta", PostRoutes);

app.get("/", (_, res) => {
  res.send("Server Is Start!");
});

app.listen(PORT, () => {
  console.log(`server runing at : http://localhost:${PORT}/`);
});
