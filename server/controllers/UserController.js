import userModel from "../models/userModel.js";
import transactionModel from "../models/transactionModel.js";
import Stripe from "../configs/stripe.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

// http://localhost:4000/api/user/webhooks

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields." });
    }
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.json({ success: false, message: "User already exists." });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userData = {
      name,
      email,
      password: hashedPassword,
    };
    const newUser = new userModel(userData);
    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ success: true, token, user: { name: user.name } });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User doesn't exist." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.status(200).json({ success: true, token, user });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Api Controller function to get user available  credit data

export const userCredits = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId);
    if (user) {
      res.status(200).json({ success: true, credits: user.creditBalance });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export const paymentStripe = async (req, res) => {
  try {
    const { userId, planId } = req.body;

    // Validate input
    if (!userId || !planId) {
      return res
        .status(400)
        .json({ success: false, message: "User doesn't exist." });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // Determine plan details
    let credits, plan, amount;
    switch (planId) {
      case "Basic":
        plan = "Basic";
        credits = 100;
        amount = 100; // Amount in USD (or your configured Stripe currency)
        break;
      case "Advanced":
        plan = "Advanced";
        credits = 500;
        amount = 200;
        break;
      case "Business":
        plan = "Business";
        credits = 5000;
        amount = 350;
        break;
      default:
        return res
          .status(400)
          .json({ success: false, message: "Invalid plan." });
    }

    const date = Date.now();
    const transactionData = {
      userId,
      plan,
      credits,
      amount,
      date,
    };

    // Save the transaction record in your database
    const newTransaction = await transactionModel.create(transactionData);

    // Create a payment intent
    const paymentIntent = await Stripe.paymentIntents.create({
      amount: amount * 100, // Amount in cents (Stripe's requirement)
      currency: "inr", // Adjust based on your preferred currency
      metadata: {
        transactionId: newTransaction._id.toString(),
        userId: userId,
        planId: planId,
      },
    });

    // Return the paymentIntent's client secret to the frontend
    return res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      transactionId: newTransaction._id,
      credits,
    });
  } catch (error) {
    console.error("Error processing payment:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error processing payment." });
  }
};

// New endpoint: Update user's credits after payment is confirmed
export const updateUserCredits = async (req, res) => {
  try {
    const { userId, credits } = req.body;
    console.log(userId, credits);
    if (!userId || !credits) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid request data." });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    user.creditBalance = (user.creditBalance || 0) + credits;
    await user.save();
    console.log(user.creditBalance);
    return res.status(200).json({
      success: true,
      message: "Credits updated.",
      credits: user.creditBalance,
    });
  } catch (error) {
    console.error("Error updating credits:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error updating credits." });
  }
};
