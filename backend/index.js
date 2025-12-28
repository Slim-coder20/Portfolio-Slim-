const express = require ('express'); 
const cors = require ('cors');
const dotenv = require ('dotenv'); 
const authRoutes = require ('./src/routes/auth.routes');
const projectsRoutes = require ('./src/routes/projects.routes');

// Configuration 
dotenv.config(); 
const app = express(); 

// Connect to database // 
const database = require ('./src/config/database');
database.connect(); 

// Middleware //
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON bodies

// Rooutes //
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/uploads', express.static('uploads'));

// Server running // 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); 
}) 