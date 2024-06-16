
# GoPaaScript

GoPaaScript est une extension pour Visual Studio Code qui facilite l'interaction avec l'API GoPaaS. Cette extension permet de récupérer des données, de créer des fichiers et des dossiers en fonction de ces données, et d'envoyer des scripts modifiés à l'API.

## Fonctionnalités

- Récupérer des données depuis l'API GoPaaS et créer des dossiers et fichiers correspondants.
- Envoyer des scripts modifiés à l'API GoPaaS.
- Interface utilisateur pour entrer les détails de la connexion à l'API.

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés :

- [Node.js](https://nodejs.org/) version 14 ou supérieure
- [Visual Studio Code](https://code.visualstudio.com/)
- [Yeoman](http://yeoman.io) et le générateur d'extensions VS Code

```sh
npm install -g yo generator-code
```

## Installation

1. Clonez le dépôt sur votre machine locale :

```sh
git clone https://github.com/KiddMiguel/GoPaaScript_v1.git
```

2. Accédez au répertoire du projet :

```sh
cd GoPaaScript_v1
```

3. Installez les dépendances du projet :

```sh
npm install
```

## Développement

Pour commencer le développement de l'extension :

1. Ouvrez le projet dans Visual Studio Code :

```sh
code .
```

2. Appuyez sur `F5` pour lancer une nouvelle fenêtre VS Code avec l'extension activée.

## Utilisation

### Récupérer des données et créer des fichiers

1. Ouvrez la palette de commandes (Ctrl+Shift+P) et exécutez la commande `Run GoPaaScript`.
2. Suivez les invites pour entrer l'URL de l'application, le jeton Bearer, et les IDs.
3. Les dossiers et fichiers correspondants seront créés dans votre espace de travail.

### Envoyer des scripts modifiés

1. Modifiez les fichiers `script.js` et `script.php` dans les dossiers créés.
2. Ouvrez la palette de commandes (Ctrl+Shift+P) et exécutez la commande `Send Modified Scripts` (ou utilisez le raccourci `Ctrl+Shift+A`).

### Interface utilisateur

1. Cliquez sur l'icône GoPaaScript dans la barre latérale de gauche pour ouvrir l'interface utilisateur.
2. Entrez les détails de la connexion et cliquez sur `Connecter` pour récupérer les données et créer les fichiers.

## Structure du projet

- `extension.js` : Point d'entrée principal de l'extension.
- `src/` : Contient les modules pour les différentes fonctionnalités de l'extension.
  - `fetchAndCreateFiles.js` : Module pour récupérer les données et créer les fichiers.
  - `sendScripts.js` : Module pour envoyer les scripts modifiés à l'API.
  - `uiCommands.js` : Module pour gérer l'interface utilisateur et les commandes associées.
  - `config.js` : Module pour gérer la configuration de l'extension.
  - `GoPaaScriptTreeDataProvider.js` : Module pour fournir les données de l'arborescence dans l'interface utilisateur.


Ajoutez ce fichier README.md à la racine de votre projet. Il fournira aux utilisateurs et contributeurs les informations nécessaires pour installer, utiliser, et contribuer à votre extension VS Code.
