const User = require("../models/User");
const Cart = require("../models/Cart");
const Bookings = require("../models/Bookings");
const Payments = require("../models/Payments");
const mongoose = require("mongoose");
const { populate } = require("../models/Product");
const createNewUser = async (req, res) => {
  try {
    const {
      email,
      firstName,
      lastName,
      password,
      DOB,
      gender,
      subscribedToWhatsApp,
      contactNumber,
    } = req.body;

    const ifexistingUser = await User.findOne({ "profile.email": email });
    if (ifexistingUser) {
      return res.status(400).json({ message: "Account already exists" });
    }

    const newUser = new User({
      profile: {
        email: email,
        firstName: firstName,
        lastName: lastName,
        passwordHash: password,
        DOB: DOB,
        gender: gender,
        subscribedToWhatsApp: subscribedToWhatsApp,
        contactNumber: contactNumber,
      },
      myOrders: [],
      myAddresses: [],
      myWallet: [],
      myPayments: [],
      myWishlist: [],
      myCart: [],
    });
    const response = await newUser.save();
    if (response) {
      console.log("User created Successfully", response);
      return res
        .status(201)
        .json({ message: "User created Suceessfully", response });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const chcekUserMail = async (req, res) => {
  const { email } = req.body;
  try {
    const findUser = await User.findOne({ "profile.email": email });
    if (findUser) {
      return res.status(200).json({ message: "User found", findUser });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getUserDetails = async (userId) => {
  try {
    const user = User.findOne({ _id: userId })
      .populate("myWishlist")
      .populate({
        path: "myCart",
        populate: {
          path: "items.productId",
          model: "Product",
        },
      })
      .populate({
        path: "myOrders",
        populate: {
          path: "bookings",
          populate: {
            path: "products.productId",
            model: "Product",
          },
        },
      });
    return user;
  } catch (error) {
    console.log("Error fetching user details");
    throw new Error("Unable to fetch user details");
  }
};

const getUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ "profile.email": email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const userAuth = await User.findOne({ "profile.passwordHash": password });
    console.log(userAuth);
    if (userAuth) {
      const findUser = await getUserDetails(userAuth._id);
      console.log(findUser);
      return res.status(200).json({ message: "Login Successful", findUser });
    } else {
      return res.status(401).json({ message: "Invalid credentials" }); // For incorrect password
    }
  } catch (error) {
    console.error("Error in getUser:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateUserDetails = async (req, res) => {
  try {
    const {
      userId,
      firstName,
      lastName,
      DOB,
      gender,
      subscribedToWhatsApp,
      contactNumber,
      productId,
    } = req.body;
    const findUser = await User.findById(userId);
    console.log(findUser);

    if (!findUser) {
      return res.status(400).json({ message: "Account not exists" });
    }
    if (firstName) findUser.profile.firstName = firstName;
    if (lastName) findUser.profile.lastName = lastName;
    if (DOB) findUser.profile.DOB = DOB;
    if (gender) findUser.profile.gender = gender;
    if (subscribedToWhatsApp !== undefined)
      findUser.profile.subscribedToWhatsApp = subscribedToWhatsApp;
    if (contactNumber) findUser.profile.contactNumber = contactNumber;
    const result = await findUser.save();

    return res
      .status(200)
      .json({ message: "Details updated Successfully", result });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    console.log(userId, productId);

    // Validate inputs
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // Find the user
    const findUser = await User.findById(userId);
    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the product exists in the wishlist
    const itemIndex = findUser.myWishlist.findIndex(
      (item) => item.toString() === productId
    );

    // Toggle the product in the wishlist (remove if exists, add if not)
    if (itemIndex > -1) {
      findUser.myWishlist.splice(itemIndex, 1); // Remove product from wishlist
    } else {
      findUser.myWishlist.push(productId); // Add product to wishlist
    }

    await findUser.save();

    // Save the user with the updated wishlist
    const result = await getUserDetails(userId);

    return res.status(200).json({
      message:
        itemIndex > -1
          ? "Item removed from wishlist"
          : "Item added to wishlist",
      result,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return res.status(500).json({
      message: "Internal server error. Please try again later",
    });
  }
};

const updateCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // Validate inputs
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // Find the user
    const findUser = await User.findById(userId);
    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the product exists in the wishlist
    const itemIndex = findUser.myCart.findIndex(
      (item) => item.toString() === productId
    );

    // Toggle the product in the wishlist (remove if exists, add if not)
    if (itemIndex > -1) {
      findUser.myCart.splice(itemIndex, 1); // Remove product from wishlist
    } else {
      findUser.myCart.push(productId); // Add product to wishlist
    }

    // Save the user with the updated wishlist
    const result = await findUser.save();

    return res.status(200).json({
      message: "Wishlist updated successfully",
      result,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return res.status(500).json({
      message: "Internal server error. Please try again later",
    });
  }
};

const handleAddToCart = async (req, res) => {
  try {
    const { productId, size, quantity, userId } = req.body;

    if (!productId || !size || !quantity || !userId) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty <= 0) {
      return res.status(400).json({ message: "Invalid quantity value" });
    }

    const userDetails = await User.findById(userId);
    if (!userDetails) {
      return res.status(404).json({ message: "User not found" });
    }

    let userCart = await Cart.findOne({ userId });

    if (!userCart) {
      userCart = new Cart({
        userId,
        items: [{ productId, size, quantity: qty }],
      });
      await userCart.save();
      userDetails.myCart = [userCart._id];
    } else {
      const existingItemIndex = userCart.items.findIndex(
        (item) =>
          item.productId.toString() === productId.toString() &&
          item.size.toLowerCase() === size.toLowerCase()
      );

      if (existingItemIndex > -1) {
        userCart.items[existingItemIndex].quantity += qty;
      } else {
        userCart.items.push({ productId, size, quantity: qty });
      }
      await userCart.save();

      if (!userDetails.myCart.includes(userCart._id)) {
        userDetails.myCart.push(userCart._id);
      }
    }

    await userDetails.save();
    const result = await getUserDetails(userId);

    return res
      .status(200)
      .json({ message: "Item added to cart successfully", result });
  } catch (error) {
    console.error("Error in handleAddToCart:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const handleRemoveItemFromCart = async (req, res) => {
  try {
    const { userId, productId, size } = req.body;
    console.log("ProductId from frontend:", productId);

    // Find the user and their cart
    const userDetails = await User.findById(userId);
    if (!userDetails) {
      return res.status(404).json({ message: "User not found" });
    }

    let userCart = await Cart.findOne({ userId: userId });

    if (!userCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the item in the cart that needs to be removed
    const itemIndex = userCart.items.findIndex(
      (item) =>
        item.productId.toString() === productId &&
        item.size.toLowerCase() === size.toLowerCase()
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Remove the item from the cart
    await userCart.items.splice(itemIndex, 1);

    // If the cart becomes empty after removal, you might want to delete the cart
    if (userCart.items.length === 0) {
      // await Cart.deletOne({ _id: userCart._id }); // Delete cart if it's empty
      // console.log("Cart is empty and was deleted");
      const userCartIndex = userDetails.myCart.indexOf(userCart._id);
      if (userCartIndex !== -1) {
        userDetails.myCart.splice(userCartIndex, 1); // Remove the cart reference from `myCart`
        await userDetails.save(); // Save the user after modifying `myCart`
        console.log(
          "Updated User's myCart after item removal: ",
          userDetails.myCart
        );
      }
    } else {
      // Otherwise, save the updated cart
      await userCart.save();
      console.log("Updated Cart: ", userCart);
    }

    // Return success response with updated cart details
    const result = await getUserDetails(userId); // Fetch updated user details
    console.log(result);
    return res.status(200).json({
      message: "Item removed from cart successfully",
      result,
    });
  } catch (error) {
    console.log("Error in handleRemoveItemFromCart: ", error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const handleUpdateItemSize = async (req, res) => {
  try {
    const { itemId, size, userId } = req.body;
    if (!itemId || !size || !userId)
      return res
        .status(400)
        .json({ message: "Item Id ,size and userId required" });
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User Not found" });
    const userCart = await Cart.findOne({ userId: userId });
    if (!userCart) return res.status(404).json({ message: "Cart Not Found" });
    const item = await userCart.items.find(
      (item) => item._id.toString() === itemId
    );
    if (!item) return res.status(404).json({ message: "Item Not Found" });
    item.size = size;
    await userCart.save();
    await user.save();
    const result = await getUserDetails(userId);
    return res
      .status(200)
      .json({ message: "Item Size Updated Sucessfully", result });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const handleUpdateItemQuantity = async (req, res) => {
  try {
    const { itemId, quantity, userId } = req.body;
    if (!itemId || !quantity || !userId)
      return res
        .status(400)
        .json({ message: "Item Id ,size and userId required" });
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User Not found" });
    const userCart = await Cart.findOne({ userId: userId });
    if (!userCart) return res.status(404).json({ message: "Cart Not Found" });
    const item = await userCart.items.find(
      (item) => item._id.toString() === itemId
    );
    if (!item) return res.status(404).json({ message: "Item Not Found" });
    item.quantity = quantity;
    await userCart.save();
    await user.save();
    const result = await getUserDetails(userId);
    return res
      .status(200)
      .json({ message: "Item Size Updated Sucessfully", result });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { Id } = req.params;
    console.log(Id);
    const findUser = await User.findById(Id);
    if (!findUser)
      return res.status(400).json({ message: "Account not exists" });
    try {
      const deleteUser = await User.deleteOne({
        _id: Id,
      });
      if (deleteUser.deletedCount > 0)
        return res
          .status(200)
          .json({ message: "Account Deleted Successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const handleAddAddress = async (req, res) => {
  try {
    const { userId, addressData } = req.body;

    console.log(userId, addressData);

    // Find the user by ID

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newAddress = {
      name: addressData.Name,
      contactNumber: addressData.mobile,
      postalCode: addressData.pincode,
      city: addressData.city,
      state: addressData.state,
      country: addressData.country,
      flatNoOrBuildingNameAndStreetName: addressData.addressLine,
      AreaoRLocality: addressData.areaLocality,
      LandMark: addressData.landmark,
    };

    user.myAddresses.push(newAddress);

    await user.save();

    const result = await getUserDetails(userId);

    return res
      .status(201)
      .json({ message: "Address added successfully", result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const handleCreateBooking = async (req, res) => {
  try {
    const { userId, selectedAddressId, paymentType, totalAmount, products } =
      req.body;

    if (
      !userId ||
      !selectedAddressId ||
      !paymentType ||
      !totalAmount ||
      !products.length
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const selectedAddress = user.myAddresses.find(
      (addr) => addr._id.toString() === selectedAddressId
    );
    if (!selectedAddress) {
      return res.status(400).json({ error: "Invalid address selected" });
    }

    const shippingCost = 0;
    const finalTotal = totalAmount + shippingCost;

    const payment = new Payments({
      paymentType,
      amountPaid: finalTotal,
      transactionId: paymentType === "cod" ? "COD" : `TXN${Date.now()}`,
    });
    await payment.save();

    const bookingEntry = {
      products: products.map(
        ({ productId, quantity, price, total_price, size }) => ({
          productId,
          quantity,
          price,
          total_price,
          size,
        })
      ),
      shippingAddress: selectedAddress,
      bookingAddress: selectedAddress,
      payment_info: payment._id,
      shipping_info: {
        shipping_date: new Date(),
        shipping_Cost: shippingCost.toString(),
      },
      OrderSummary: { Total: finalTotal.toString() },
      OrderStatus: "Confirmed",
    };

    let userBooking = await Bookings.findOne({ userId });
    if (!userBooking) {
      userBooking = new Bookings({ userId, bookings: [bookingEntry] });
    } else {
      userBooking.bookings.push(bookingEntry);
    }
    const bookingResponse = await userBooking.save();

    if (!user.myOrders.includes(bookingResponse._id)) {
      user.myOrders.push(bookingResponse._id);
    }

    await Cart.findOneAndUpdate({ userId }, { $set: { items: [] } });
    user.myCart = [];
    await user.save();

    const result = await getUserDetails(userId);
    console.log("Booking Created Successfully", result);
    res.status(201).json({ message: "Booking created successfully", result });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const handleUpdateAddress = async (req, res) => {
  try {
    const {
      name,
      state,
      city,
      postalCode,
      contactNumber,
      country,
      userId,
      flatNoOrBuildingNameAndStreetName,
      AreaoRLocality,
      LandMark,
      addressId,
    } = req.body;

    if (!userId || !addressId) {
      return res
        .status(400)
        .json({ message: "UserID and AddressID are required" });
    }
    console.log(
      name,
      state,
      city,
      postalCode,
      contactNumber,
      country,
      AreaoRLocality,
      flatNoOrBuildingNameAndStreetName
    );

    if (
      !name ||
      !state ||
      !city ||
      !postalCode ||
      !contactNumber ||
      !country ||
      !AreaoRLocality ||
      !flatNoOrBuildingNameAndStreetName
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userDetails = await User.findOne({ _id: userId });
    if (!userDetails) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the address by addressId
    const addressIndex = userDetails.myAddresses.findIndex(
      (address) => address._id.toString() === addressId
    );

    if (addressIndex === -1) {
      return res.status(404).json({ message: "Address not found" });
    }

    // Update the address details
    userDetails.myAddresses[addressIndex] = {
      name,
      state,
      city,
      postalCode,
      contactNumber,
      country,
      flatNoOrBuildingNameAndStreetName,
      AreaoRLocality,
      LandMark,
    };

    // Save the updated user details
    await userDetails.save();

    // Retrieve updated user details
    const updatedUser = await getUserDetails(userId);

    return res
      .status(200)
      .json({ message: "Address updated successfully", updatedUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const handleDeleteAddress = async (req, res) => {
  try {
    const { addressId, userId } = req.query;

    if (!addressId || !userId) {
      return res
        .status(400)
        .json({ message: "Address Id and user Id required" });
    }

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedAddresses = user.myAddresses.filter(
      (address) => address._id.toString() !== addressId.toString()
    );

    user.myAddresses = updatedAddresses;
    await user.save();

    const updatedUser = await getUserDetails(userId);

    return res.status(200).json({
      message: "Address successfully removed",
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createNewUser,
  getUser,
  getUserDetails,
  updateUserDetails,
  deleteUser,
  chcekUserMail,
  updateWishlist,
  updateCart,
  handleAddToCart,
  handleRemoveItemFromCart,
  handleUpdateItemQuantity,
  handleUpdateItemSize,
  handleAddAddress,
  handleCreateBooking,
  handleUpdateAddress,
  handleDeleteAddress,
};
