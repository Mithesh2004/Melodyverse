import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";

const signupUser = async (req, res) => {
  try {
    const { email, userName, password } = req.body;

    const user = await User.findOne({ $or: [{ email }, { userName }] });
    if (user) {
      console.log("inside here");
      res
        .status(400)
        .json({ error: "User already exists with the email or username" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashPassword,
      userName,
    });
    const savedUser = await newUser.save();
    if (savedUser) {
      generateTokenAndSetCookie(savedUser._id, res);
      res.status(201).json({
        _id: savedUser._id,
        email: savedUser.email,
        userName: savedUser.userName,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ error });
    console.log("Error in signup user:", error);
  }
};

const signinUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({error:"Email doesn't exist"});
      return;
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      res.status(401).json({error:"Invalid credentials"});
      return;
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(201).json({
      _id: user._id,
      email: user.email,
      userName: user.userName,
    });
  } catch (error) {
    res.status(500).json({ error });
    console.error("Error signing in user :", error);
  }
};

const signoutUser = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 1 });
    res.status(201).json("User signed out successfully!");
  } catch (error) {
    res.status(500).json({ error });
    console.log("Error in signing out user:", error);
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json("User not found");
      return;
    }
    const token = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(Date.now() + 3600000);
    await user.save();

    const resetUrl = `http://${req.headers.host}/reset-password/${token}`;

    await sendEmail({
      fromEmail: "mitheshm2004@gmail.com", //use your email
      fromName: "Mithesh M", //use your name
      toEmail: user.email,
      toName: user.name,
      subject: "Password Reset Request",
      textPart: `You requested a password reset. Please use the following link to reset your password: ${resetUrl}`,
      htmlPart: `<p>You requested a password reset. Please use the following link to reset your password:</p><p><a href="${resetUrl}">${resetUrl}</a></p>`,
      customId: "PasswordResetRequest",
    });

    res.status(201).json({ message: "Password reset email sent" });
  } catch (error) {
    res.send(500).json({ error });
    console.error("Error :", error);
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      res.status(400).json("Password reset is invalid or has expired");
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashPassword;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(201).json("Password has been reset");
  } catch (error) {
    res.status(500).json({ error });
    console.error("Error:", error);
  }
};
const checkLoggedIn = (req, res) => {
  res.status(200).json({ isLoggedIn: true, userId: req.user.userId });
};

export {
  signupUser,
  signinUser,
  signoutUser,
  forgotPassword,
  resetPassword,
  checkLoggedIn,
};
