import express from "express";
import User from "../models/user";

const getCurrentUser = async (req: express.Request, res: express.Response) => {
  try {
    const currentUser = await User.findOne({ _id: req.userId });

    if (!currentUser) {
      res.status(404).json({ message: "User not found!" });
    } else {
      res.json(currentUser);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

const createCurrentUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });

    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
    } else {
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).json(newUser.toObject());
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user" });
  }
};

const updateCurrentUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name, addressLine1, country, city } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      user.name = name;
      user.city = city;
      user.country = country;
      user.addressLine1 = addressLine1;

      await user.save();

      res.send(user);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating user" });
  }
};

export default { getCurrentUser, createCurrentUser, updateCurrentUser };
