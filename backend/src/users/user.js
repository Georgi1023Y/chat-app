import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

const users = [
  {
    email: "ella.knight@example.com",
    fullName: "Ella Knight",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/23.jpg",
  },
  {
    email: "hazel.mccoy@example.com",
    fullName: "Hazel McCoy",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/24.jpg",
  },
  {
    email: "ivy.bailey@example.com",
    fullName: "Ivy Bailey",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/25.jpg",
  },
  {
    email: "stella.ramos@example.com",
    fullName: "Stella Ramos",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/26.jpg",
  },
  {
    email: "zoey.bryant@example.com",
    fullName: "Zoey Bryant",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/27.jpg",
  },
  {
    email: "aria.sims@example.com",
    fullName: "Aria Sims",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/28.jpg",
  },

  {
    email: "leo.foster@example.com",
    fullName: "Leo Foster",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/21.jpg",
  },
  {
    email: "nathan.bates@example.com",
    fullName: "Nathan Bates",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    email: "julian.cole@example.com",
    fullName: "Julian Cole",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/23.jpg",
  },
  {
    email: "miles.ellis@example.com",
    fullName: "Miles Ellis",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/24.jpg",
  },
  {
    email: "ezra.perez@example.com",
    fullName: "Ezra Perez",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/25.jpg",
  },
  {
    email: "adam.barker@example.com",
    fullName: "Adam Barker",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/26.jpg",
  },
  {
    email: "jackson.moss@example.com",
    fullName: "Jackson Moss",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/27.jpg",
  },
];

const insertUsers = async () => {
  try {
    await connectDB();

    await User.insertMany(users);
    console.log("Users inserted successfully");
  } catch (error) {
    console.error("Error inserting users:", error);
  }
};

insertUsers();
