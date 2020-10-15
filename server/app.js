const express = require("express");
const routes = require("../server/routes/routes");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = 7777;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

app.listen(PORT, () => {
  console.log("Server is running at ", PORT);
});
