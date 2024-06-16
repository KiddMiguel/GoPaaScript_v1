const vscode = require('vscode');
const { fetchAndCreateFiles } = require('./src/fetchAndCreateFiles');
const { sendScripts } = require('./src/sendScripts');
const { addConnection, openUI } = require('./src/uiCommands');
const GoPaaScriptTreeDataProvider = require('./src/GoPaaScriptTreeDataProvider');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('Félicitations, votre extension "gopaascript" est maintenant active !');

    // Enregistrement du fournisseur de données pour la vue de l'arborescence
    const treeDataProvider = new GoPaaScriptTreeDataProvider();
    vscode.window.registerTreeDataProvider('gopaascriptView', treeDataProvider);

    // Enregistrement des commandes
    const disposableFetchAndCreateFiles = vscode.commands.registerCommand('gopaascript.run', fetchAndCreateFiles);
    const disposableSendScripts = vscode.commands.registerCommand('gopaascript.sendScripts', sendScripts);
    const disposableSendScriptsRaccourci = vscode.commands.registerCommand('gopaascript.sendScriptsRaccourci', sendScripts);
    const disposableAddConnection = vscode.commands.registerCommand('gopaascript.addConnection', addConnection);
    const disposableOpenUI = vscode.commands.registerCommand('gopaascript.openUI', openUI);

    // Gestionnaire de raccourcis clavier
    vscode.commands.registerCommand('gopaascript.sendScripts', () => {
        console.log('Shortcut CTRL+SHIFT+A triggered');
        sendScripts();
    });

    // Ajout des commandes au contexte des abonnements
    context.subscriptions.push(disposableFetchAndCreateFiles);
    context.subscriptions.push(disposableSendScripts);
    context.subscriptions.push(disposableSendScriptsRaccourci);
    context.subscriptions.push(disposableAddConnection);
    context.subscriptions.push(disposableOpenUI);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};