require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { connect } = require("../config/database");

const seedAdmin = async () => {
  try {
    // Connexion à mongoDB //
    await connect();

    // Vérfication si Admin existe déjà //
    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
      console.log("❌ Admin already exists");
      await mongoose.connection.close();
      process.exit(0);
    }
    // Récupération de l'email et du mot de passe //
    const email = process.env.ADMIN_EMAIL || "slimdev20@gmail.com";
    const password = process.env.ADMIN_PASSWORD || "PorfolioPro@290380";
    // Génération du hash du mot de passe //
    const hashedPassword = await bcrypt.hash(password, 10);
    // Création de l'admin //
    const admin = new User({
      email,
      password: hashedPassword,
      role: "admin",
    });
    await admin.save();
    console.log("Admin created successfully");
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedAdmin();
