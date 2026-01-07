# Portfolio Project

Structure organisée pour un projet full-stack avec frontend et backend séparés.

## Structure du projet

```
portfolio/
├── frontend/           # Interface utilisateur
│   ├── assets/        # Ressources (images, vidéos)
│   ├── css/           # Feuilles de style
│   │   ├── terminal.css
│   │   └── portfolio.css
│   ├── js/            # Scripts JavaScript
│   │   ├── data.js
│   │   ├── terminal.js
│   │   └── portfolio.js
│   ├── index.html     # Page portfolio (page d'accueil)
│   └── terminal.html  # Page terminal interactive
│
└── backend/           # API et logique serveur (à venir)

```

## Fichiers

### Frontend

- **index.html** : Portfolio classique inspiré de Revolut (page d'accueil)
- **terminal.html** : Interface terminal interactive
- **data.js** : Source unique des données partagée entre les deux interfaces
- **terminal.js** : Logique du terminal
- **portfolio.js** : Logique du portfolio et effets de scroll

### Contenu partagé

Les deux interfaces (terminal et portfolio) utilisent le même fichier `data.js` qui contient la structure `virtualFolder`. 

**Modifier le contenu** : Éditer `frontend/js/data.js` mettra automatiquement à jour :
- Les fichiers et dossiers du terminal
- Les cartes de projets du portfolio
- Les informations about/contact

## Lancer le projet

```bash
cd frontend
python3 -m http.server 8000
```

Puis ouvrir :
- Terminal : http://localhost:8000/index.html
- Portfolio : http://localhost:8000/portfolio.html

## Navigation

- Terminal → Portfolio : Cliquer sur le bouton rouge (close)
- Portfolio → Terminal : Cliquer sur "Terminal" dans la navigation

## Backend (à venir)

Le dossier `backend/` est prêt pour accueillir :
- API REST
- Base de données
- Authentification
- Gestion des projets dynamique
