const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
// Load environment variables from the .env file
dotenv.config();
const connectDb = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "aryan",
    saveUninitialized: true,
    resave: true,
  })
);
// Use the user routes under the /users prefix
app.use("/users", userRoutes);

//Use the product routes under the /product prefix
app.use("/product", productRoutes);

//Use the cart routes under the /cart prefix
// app.use("/cart", cartRoutes);

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
