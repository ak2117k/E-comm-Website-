const User = require("../models/User");
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

const getUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ "profile.email": email });

    if (!findUser) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const userAuth = findUser.profile.passwordHash === password;
    if (userAuth) {
      return res.status(200).json({ message: "Login Successful", findUser });
    } else {
      return res.status(401).json({ message: "Invalid credentials" }); // For incorrect password
    }
  } catch (error) {
    console.error("Error in getUser:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;
    const { sortBy } = req.query;
    console.log(sortBy);
    if (!userId) {
      return res.status(400).json({ message: "userId required" });
    }
    const findUser = await User.findOne({ _id: userId });
    if (findUser) {
      return res
        .status(200)
        .json({ message: "User found", userDeatils: findUser.profile });
    } else {
      return res.status(400).json({ message: "User not exists" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server errror" });
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
    if (productId) {
      const itemIndex = findUser.myWishlist.findIndex(
        (item) => item.toString() === productId
      );

      if (itemIndex > -1) {
        // Remove product from wishlist if it exists
        findUser.myWishlist.splice(itemIndex, 1);
      } else {
        // Add product to wishlist if it doesn't exist
        findUser.myWishlist.push(productId);
      }
    }

    await findUser.save();

    return res.status(200).json({ message: "Details updated Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
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

module.exports = {
  createNewUser,
  getUser,
  getUserDetails,
  updateUserDetails,
  deleteUser,
  chcekUserMail,
};
