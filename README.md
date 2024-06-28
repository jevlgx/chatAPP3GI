# Application Web de chat automatisable

Cette application web est composée d'un front-end développé avec React et d'un back-end développé avec Node.js et Express.

## Table des matières
1. [Description](#description)
2. [Installation](#installation)
   1. [Prérequis](#prérequis)
   2. [Back-end](#back-end)
   3. [Front-end](#front-end)
3. [Utilisation](#utilisation)
4. [Technologies utilisées](#technologies-utilisées)
5. [Contributeurs](#contributeurs)
6. [Licence](#licence)

## Description
Cette application web permet de créer un réseau local de chat. Les utilisateurs peuvent échanger des messages entre eux, et faire des recherches grâce à l'IA générative Gemini de Google. Les utilisateurs peuvent activer l'option de chat automatique pour passer la main à Gemini, qui se chargera de poursuivre la conversation en se basant sur les données qui lui sont fournies, ainsi que le contexte de la conversation en cours.

Cette application est composée d'un front-end interactif et d'un back-end qui fournit l'API nécessaire au fonctionnement de l'application.

## Installation

### Prérequis
Vous devez avoir installé les éléments suivants sur votre système :
- Node.js V20.12.2
- Git version 2.38.1.windows.1
- npm (Node Package Manager) V10.5.0
- MongoDb V7.0.11
- Recuperer une cle d'API Gemini

### Back-end
1. Clonez le dépôt Git :
```
git clone https://github.com/jevlgx/chatAPP3GI.git
```
2. Accédez au dossier du back-end :
```
cd chatAPP3GI/server
```
3. Installez les dépendances :
```
npm install
```

### Front-end

1. Accédez au dossier du front-end :
```
cd chatAPP3GI/front
```
- Créer un fichier .env dans chatAPP3GI/front
- Ajouter les lignes suivantes dans ce fichier:
```
REACT_APP_LOCALHOST_KEY="chat-app-current-user"
REACT_APP_API_KEY="PLACER_VOTRE_CLE_D_API_GEMINI_ICI"
```

2. Installez les dépendances :
```
npm install
```

## Utilisation

1. Lancez le serveur MongoDb :

Il suffit de faire un double click sur l'icone de MongoDBCompass ou de le lancer en ligne de commande

2. Démarrez le serveur back-end sur le port 5000:
```
cd chatAPP3GI/server
npm start
```
2. Démarrez le serveur de développement front-end sur le port 3000:
```
cd chatAPP3GI/front
npm start
```
3. Ouvrez votre navigateur et accédez à `http://localhost:3000` pour voir l'application en fonctionnement.

## Technologies utilisées
Front-end :
- ReactJS

Back-end :
- Node.js
- Express

Base-de-donnée :
- MongoDB

## Contributeurs
- William Kamgang (https://github.com/jevlgx)
- Franck Kenfack (https://github.com/Kenfack-franck)
- Willy Watcho (https://github.com/willyWatcho)

## Licence
Ce projet est sous licence MIT.