// Ce fichier contient le middleware d'authentification pour les routes protégées // 
const jwt = require ('jsonwebtoken'); 

// Middleware d'authentification // 
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; 
  if(!token) {
    return res.status(401).json({ message: "Unauthorized !" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = decoded; 
    next(); 
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ message: "Unauthorized !" });
  }
}; 

// Exportation du middleware // 
module.exports = authenticate;