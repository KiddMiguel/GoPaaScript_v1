const vscode = require('vscode');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { getConfig } = require('./config');

async function sendScripts() {
    try {
        const { url, bearerToken } = getConfig();
        vscode.window.showInformationMessage(`URL : ${url}`);

        if (!url || !bearerToken) {
            vscode.window.showErrorMessage('Veuillez d\'abord exécuter la commande de récupération initiale');
            return;
        }

        const workspaceFolder = vscode.workspace.workspaceFolders[0].uri.fsPath;

        const folders = fs.readdirSync(workspaceFolder, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);

        const data = folders.map(folder => {
            const folderPath = path.join(workspaceFolder, folder);
            const jsFilePath = path.join(folderPath, 'script.js');
            const phpFilePath = path.join(folderPath, 'script.php');

            const scriptjs = fs.existsSync(jsFilePath) ? fs.readFileSync(jsFilePath, 'utf-8') : '';
            const scriptphp = fs.existsSync(phpFilePath) ? fs.readFileSync(phpFilePath, 'utf-8') : '';

            return {
                cle: folder,
                scriptjs: scriptjs,
                scriptphp: scriptphp
            };
        });

        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Envoi des scripts à l'API",
            cancellable: false
        }, async(progress) => {
            await axios.post(`${url}/api/items/nids_table/`, data, {
                headers: {
                    'Authorization': `Bearer ${bearerToken}`,
                    'Content-Type': 'application/json'
                }
            });
            vscode.window.showInformationMessage('Scripts envoyés avec succès');
        });
    } catch (error) {
        vscode.window.showErrorMessage(`Échec de l'envoi des scripts : ${error.message}`);
    }
}

module.exports = {
    sendScripts
};