const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
// Load environment variables from the .env file
dotenv.config();
const connectDb = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(express.json());
app.use(cors());

// Use the user routes under the /users prefix
app.use("/users", userRoutes);

//Use the product routes under the /product prefix
app.use("/product", productRoutes);

const PORT = process.env.PORT || 3000;

connectDb()
  .then(() => {
    app.listen(PORT, (err) => {
      if (err) {
        console.error("Error starting the server:", err);
        return;
      }
      console.log("Server is running at 3000");
    });
  })
  .catch((error) => console.log("error connecting db", error));
