const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const { fetchAndCreateFiles } = require('./fetchAndCreateFiles');
const { storedConfig } = require('./config');

async function addConnection() {
    vscode.commands.executeCommand('gopaascript.openUI');
}

async function openUI() {
    const panel = vscode.window.createWebviewPanel(
        'gopaascriptUI', // Identifiant du webview
        'GoPaaScript UI', // Titre de la fenêtre
        vscode.ViewColumn.One, // Colonne où ouvrir le webview
        { enableScripts: true } // Activer les scripts
    );

    panel.webview.html = getWebviewContent(vscode.Uri.file(path.join(__dirname, '..')));

    panel.webview.onDidReceiveMessage(async message => {
        if (message.command === 'connect') {
            await fetchAndCreateFiles(message.url, message.bearer, message.ids);
        }
    });
}

function getWebviewContent(extensionUri) {
    const htmlPath = path.join(extensionUri.fsPath, 'webview.html');
    const html = fs.readFileSync(htmlPath, 'utf-8');
    return html;
}

module.exports = {
    addConnection,
    openUI
};