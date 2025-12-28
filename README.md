# Portfolio Slim - Application Portfolio avec Espace Admin

Application portfolio personnelle avec un espace d'administration permettant de gérer dynamiquement les projets réalisés.

## 📋 Description

Ce projet est un portfolio moderne qui permet de :
- **Afficher vos projets** sur une page publique
- **Gérer vos projets** via un espace d'administration sécurisé
- **Ajouter/modifier/supprimer** des projets au fur et à mesure de vos réalisations
- **Uploader des images** pour chaque projet

## 🛠️ Technologies Utilisées

### Frontend
- **React 19.2.0** - Bibliothèque JavaScript pour l'interface utilisateur
- **Vite 7.2.4** - Build tool et serveur de développement
- **React Router DOM 7.11.0** - Gestion du routing
- **Tailwind CSS 4.1.18** - Framework CSS utilitaire

### Backend
- **Node.js 20** - Runtime JavaScript
- **Express 5.2.1** - Framework web pour Node.js
- **MongoDB Atlas** - Base de données NoSQL (cloud)
- **Mongoose 8.20.4** - ODM (Object Data Modeling) pour MongoDB
- **JWT (jsonwebtoken 9.0.3)** - Authentification par tokens
- **bcrypt 6.0.0** - Hashage des mots de passe
- **Multer 2.0.2** - Gestion de l'upload de fichiers
- **CORS 2.8.5** - Gestion des requêtes cross-origin

### DevOps
- **Docker** - Containerisation de l'application
- **Docker Compose** - Orchestration des conteneurs

## 📁 Structure du Projet

\`\`\`
portfolioSlim/
├── backend/                 # API Backend
│   ├── src/
│   │   ├── config/         # Configuration (database)
│   │   ├── controllers/    # Contrôleurs (optionnel)
│   │   ├── middleware/     # Middlewares (auth, upload)
│   │   ├── models/         # Modèles Mongoose (User, Project)
│   │   ├── routes/         # Routes API (auth, projects)
│   │   ├── script/         # Scripts (seedAdmin)
│   │   └── utils/          # Utilitaires
│   ├── uploads/            # Images uploadées
│   ├── dockerfile          # Dockerfile backend
│   └── package.json
│
├── PorfolioPro/            # Frontend React
│   ├── src/
│   │   ├── components/     # Composants React
│   │   ├── pages/          # Pages (à créer)
│   │   └── ...
│   ├── Dockerfile          # Dockerfile frontend
│   └── package.json
│
├── docker-compose.yaml     # Configuration Docker Compose
├── .env                    # Variables d'environnement (à créer)
└── README.md
\`\`\`

## 🚀 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- [Docker](https://www.docker.com/get-started) et Docker Compose
- [Git](https://git-scm.com/)
- Un compte [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (gratuit)

## 📦 Installation et Déploiement Local

### 1. Cloner le projet

\`\`\`bash
git clone <url-du-repo>
cd portfolioSlim
\`\`\`

### 2. Créer le fichier \`.env\`

Créez un fichier \`.env\` à la racine du projet avec le contenu suivant :

\`\`\`env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio

# JWT
JWT_SECRET=votre_clé_jwt_secrète_ici

# Admin
ADMIN_EMAIL=votre_email@example.com
ADMIN_PASSWORD=votre_mot_de_passe_securise

# CORS
CORS_ORIGIN=http://localhost:5173
\`\`\`

**Important :** Remplacez les valeurs par vos propres configurations.

### 3. Créer l'admin dans la base de données

Avant de démarrer les conteneurs, créez l'utilisateur admin :

\`\`\`bash
cd backend
npm install
node src/script/seedAdmin.js
\`\`\`

Cela créera l'utilisateur admin dans votre base de données MongoDB.

### 4. Démarrer les conteneurs Docker

Depuis la racine du projet :

\`\`\`bash
docker compose up -d
\`\`\`

Cette commande va :
- Construire les images Docker pour le backend et le frontend
- Démarrer les deux conteneurs
- Mapper les ports (backend: 3000, frontend: 5173)

### 5. Vérifier que tout fonctionne

- **Backend API** : http://localhost:3000
- **Frontend** : http://localhost:5173

Vous pouvez vérifier les logs des conteneurs :

\`\`\`bash
# Logs du backend
docker compose logs backend

# Logs du frontend
docker compose logs frontend

# Logs de tous les services
docker compose logs -f
\`\`\`

## 🔧 Configuration

### Variables d'environnement

Le fichier \`.env\` à la racine contient toutes les variables nécessaires :

| Variable | Description | Exemple |
|----------|-------------|---------|
| \`MONGODB_URI\` | URI de connexion MongoDB Atlas | \`mongodb+srv://...\` |
| \`JWT_SECRET\` | Clé secrète pour signer les tokens JWT | \`votre_clé_secrète\` |
| \`ADMIN_EMAIL\` | Email de l'administrateur | \`admin@example.com\` |
| \`ADMIN_PASSWORD\` | Mot de passe de l'administrateur | \`mot_de_passe_securise\` |
| \`CORS_ORIGIN\` | Origine autorisée pour CORS | \`http://localhost:5173\` |

### Ports

- **Backend** : \`3000\`
- **Frontend** : \`5173\`

Si ces ports sont déjà utilisés, modifiez-les dans \`docker-compose.yaml\`.

## 🎯 Utilisation

### Accès à l'application

1. **Frontend (Portfolio public)** : http://localhost:5173
2. **Backend API** : http://localhost:3000/api

### Routes API disponibles

#### Authentification
- \`POST /api/auth/login\` - Connexion admin

#### Projets
- \`GET /api/projects\` - Liste tous les projets (admin uniquement)
- \`GET /api/projects/public\` - Liste les projets publics
- \`POST /api/projects\` - Créer un projet (admin uniquement)
- \`PUT /api/projects/:id\` - Modifier un projet (admin uniquement)
- \`DELETE /api/projects/:id\` - Supprimer un projet (admin uniquement)

### Connexion à l'espace admin

1. Accédez à la page de connexion (à créer dans le frontend)
2. Utilisez les identifiants configurés dans \`.env\` :
   - Email : \`ADMIN_EMAIL\`
   - Mot de passe : \`ADMIN_PASSWORD\`

## 🛑 Arrêter les conteneurs

\`\`\`bash
docker compose down
\`\`\`

Pour arrêter et supprimer les conteneurs :

\`\`\`bash
docker compose down -v
\`\`\`

## 📝 Commandes Utiles

### Docker Compose

\`\`\`bash
# Démarrer en arrière-plan
docker compose up -d

# Voir les logs
docker compose logs -f

# Redémarrer un service
docker compose restart backend

# Reconstruire les images
docker compose build

# Arrêter les conteneurs
docker compose down
\`\`\`

### Développement

Si vous préférez développer sans Docker :

**Backend :**
\`\`\`bash
cd backend
npm install
npm run dev
\`\`\`

**Frontend :**
\`\`\`bash
cd PorfolioPro
npm install
npm run dev
\`\`\`

## 🔒 Sécurité

- Les mots de passe sont hashés avec bcrypt
- Authentification JWT pour l'espace admin
- Variables d'environnement sensibles dans \`.env\` (non versionnées)
- Validation des types de fichiers uploadés
- Limitation de la taille des fichiers (5MB max)

## 📚 Prochaines Étapes

- [ ] Créer l'interface frontend pour l'espace admin
- [ ] Implémenter la page publique du portfolio
- [ ] Ajouter la gestion des catégories de projets
- [ ] Optimiser les images uploadées
- [ ] Ajouter des tests unitaires

## 🤝 Contribution

Ce projet est personnel, mais les suggestions et améliorations sont les bienvenues !

## 📄 Licence

Ce projet est privé et personnel.

---

**Développé avec ❤️ par Slim Abida**
