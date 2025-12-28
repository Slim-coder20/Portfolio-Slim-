// Ce fichier contient la route d'authentification pour l'espace admin // 
const express = require ('express'); 
const bcrypt = require ('bcrypt'); 
const jwt = require ('jsonwebtoken'); 
const User = require ('../models/User'); 
const authenticate = require ('../middleware/auth.middleware'); 
const router = express.Router(); 

router.post('/login',authenticate, async (req,res) => {
  try {
    const { email, password } = req.body; 
    // Vérfication des champs obligatoire // 
    if(!email || !password) {
      return res.status(400).json({ message: "Email and password are required !"}); 
    }
    // Vérification de l'email // 
    const user = await User.findOne({ email }); 
    if(!user) {
      return res.status(401).json({ message: "Invalid email or password !"}); 
    }
    // Vérification du mot de passe // 
    const isPasswordValid = await bcrypt.compare(password, user.password); 
    if(!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password !"}); 
    }
    // Génération du token JWT// 
    const token = jwt.sign({ userId: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' }); 
    return res.status(200).json({ token, user: {
      id: user._id,
      email: user.email,
      role: user.role
    } }); 
  } catch (error) {
    return res.status(500).json({ message: "Internal server error !"}); 
  }
  return res.status(200).json({ message: "Login successful !"}); 
})

module.exports = router; 