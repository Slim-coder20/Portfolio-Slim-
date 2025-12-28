// Ce fichier contient les routes pour les projets //
const express = require("express");
const router = express.Router();
const path = require("path");
const authenticate = require("../middleware/auth.middleware");
const Project = require("../models/Project");
const upload = require("../middleware/upload.middleware");

// Route pour récupérer tous les projets dans le dashboard admin //
router.get("/", authenticate, async (req, res) => {
  try {
    // Vérification si l'utilisateur est admin //
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized !" });
    }
    // Récupération de tous les projets //
    const projects = await Project.find();
    // Retourne les projets trouvés //
    return res.status(200).json({ projects: projects });
  } catch (error) {
    console.error("Error getting projects:", error);
    return res.status(500).json({ message: "Internal server error !" });
  }
});

// route pour récupérer les projets publics pour la page d'acceuil (portfolio)//
router.get("/public", async (req, res) => {
  try {
    // Récupération de tous les projets publics //
    const projects = await Project.find({ isPublic: true });
    // Retourne les projets publics trouvés //
    return res.status(200).json({ projects: projects });
  } catch (error) {
    console.error("Error getting public projects:", error);
    return res.status(500).json({ message: "Internal server error !" });
  }
});

// route pour créer un nouveau projet dans le dasboard admin //
router.post("/", authenticate, upload, async (req, res) => {
  try {
    // Vérifcation si l'uitlisateur est admin //
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized !" });
    }
    // Vérification si un fichier a été uploadé //
    if (!req.file) {
      return res.status(400).json({
        message: "Image file is required !",
      });
    }
    // Formatage du chemin de l'image (chemin relatif) //
    const imagePath = path
      .relative(path.join(__dirname, "..", ".."), req.file.path)
      .replace(/\\/g, "/"); // Remplacer les backslashes par des slashes pour compatibilité

    // Récupération des données du projet //
    const { title, description, url, isPublic } = req.body;

    // Vérification des champs obligatoires //
    if (!title || !description || !url || isPublic === undefined) {
      return res.status(400).json({
        message:
          "All fields are required ! (title, description, url, isPublic)",
      });
    }
    // Création du nouveau projet //
    const newProject = new Project({
      title,
      description,
      image: imagePath,
      url,
      isPublic,
    });
    // Enregistrement du nouveau projet //
    await newProject.save();
    // Retourne le nouveau projet créé //
    return res
      .status(201)
      .json({ message: "Project created successfully !", project: newProject });
  } catch (error) {
    console.error("Error creating project:", error);
    return res.status(500).json({ message: "Internal server error !" });
  }
});

// Route pour mettre à jour un projet dans le dashboard Admin //
router.put("/:id", authenticate, async (req, res) => {
  try {
    // vérfication si l'utilisateur est admin //
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized !" });
    }
    // Récupération de l'id du projet //
    const existingProject = await Project.findById(req.params.id);

    // Vérfiction si le projet exist //
    if (!existingProject) {
      return res
        .status(404)
        .json({ message: "Project not found ! (id: " + req.params.id + ")" });
    }
    // Récupération des donées du projet //
    const { title, description, image, url, isPublic } = req.body;
    // Vérification des champs obligatoire //
    if (!title || !description || !image || !url || isPublic === undefined) {
      return res.status(400).json({
        message:
          "All fields are required ! (title, description, image, url, isPublic)",
      });
    }
    // Mise à jour du projet //
    existingProject.title = title;
    existingProject.description = description;
    existingProject.image = image;
    existingProject.url = url;
    existingProject.isPublic = isPublic;
    // Enregistrement du projet mis à jour //
    await existingProject.save();
    // Retourne le projet mis à jour //
    return res.status(200).json({
      message: "Project updated successfully !",
      project: existingProject,
    });
  } catch (error) {
    console.error("Error updating project:", error);
    return res.status(500).json({ message: "Internal server error !" });
  }
});

// Route pour supprimer un projet dans le dashboard Admin //
router.delete("/:id", authenticate, async (req, res) => {
  try {
    // vérfication si l'utilisateur est admin //
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized !" });
    }
    // Récupération de l'id du projet //
    const existingProject = await Project.findById(req.params.id);

    // Vérfiction si le projet exist //
    if (!existingProject) {
      return res.status(404).json({
        message: "Project not found ! (id: " + req.params.id + ")",
      });
    }
    // Suppression du projet //
    await existingProject.deleteOne();
    // Retourne le message de succès //
    return res.status(200).json({ message: "Project deleted successfully !" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return res.status(500).json({ message: "Internal server error !" });
  }
});

module.exports = router;
