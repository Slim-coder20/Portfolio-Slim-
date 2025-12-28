// ce middleware est utilisé pour uploader les fichiers dans le projet //
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Chemin du dossier de destination //
const uploadDir = path.join(__dirname, "..", "..", "uploads", "projects");

// Créer le dossier s'il n'existe pas //
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuration du stockage des fichiers //
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Générer un nom unique : timestamp + nombre aléatoire + extension originale
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `project-${uniqueSuffix}${ext}`);
  },
});

// Filtre pour valider les types de fichiers //
const fileFilter = (req, file, cb) => {
  // Types MIME acceptés pour les images
  const allowedMimes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true); // Accepter le fichier
  } else {
    cb(
      new Error(
        "Type de fichier non autorisé. Seules les images (JPEG, PNG, WEBP, GIF) sont acceptées."
      ),
      false
    );
  }
};

// Configuration de Multer //
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB maximum
  },
  fileFilter: fileFilter,
});

// Export du middleware pour un seul fichier avec le nom de champ 'image' //
module.exports = upload.single("image");
