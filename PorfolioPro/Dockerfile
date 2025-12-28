# Dockerfile pour le développement local
FROM node:20-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package.json package-lock.json ./

# Installer toutes les dépendances (dev + prod)
RUN npm install

# Copier le reste du code source
COPY . .

# Exposition du port 5173 (port par défaut de Vite)
EXPOSE 5173

# Commande pour démarrer le serveur de développement Vite
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

