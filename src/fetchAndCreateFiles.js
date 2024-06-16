const vscode = require('vscode');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { setConfig, getConfig } = require('./config');

async function fetchAndCreateFiles(url, bearerToken, ids) {
    try {
        if (!url && !bearerToken && !ids) {
            url = await vscode.window.showInputBox({ prompt: 'Entrez l\'URL de base de votre application (e.g., https://nids-qualif.gopaas.net/formation_miguel)' });
            bearerToken = await vscode.window.showInputBox({ prompt: 'Entrez votre jeton Bearer' });

            if (!url || !bearerToken) {
                vscode.window.showErrorMessage('L\'URL et le jeton Bearer sont obligatoires');
                return;
            }

            ids = [];
            while (true) {
                const id = await vscode.window.showInputBox({ prompt: 'Entrez un ID (ou laissez vide pour terminer)' });
                if (!id) {
                    break;
                }
                ids.push(id.trim());

                const addAnother = await vscode.window.showQuickPick(['Yes', 'No'], { placeHolder: 'Voulez-vous ajouter un autre ID ?' });
                if (addAnother === 'No') {
                    break;
                }
            }

            if (ids.length === 0) {
                vscode.window.showErrorMessage('Au moins un ID est requis');
                return;
            }
        }

        setConfig(url, bearerToken, ids);

        const requests = ids.map(id => axios.get(`${url}/api/item/nids_table/${id}`, {
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            }
        }));

        const responses = await Promise.all(requests);

        // const responseString = JSON.stringify(responses.map(res => res.data), null, 2);
        // console.log(responseString);
        // vscode.window.showInformationMessage(`Réponses : ${responseString}`);


        vscode.window.showInformationMessage(`URL : ${url}`);


        for (const response of responses) {
            const data = response.data;
            const folderPath = path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, data.intitule);

            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath);
            }

            const jsFilePath = path.join(folderPath, 'script.js');
            const phpFilePath = path.join(folderPath, 'script.php');

            fs.writeFileSync(jsFilePath, data.scriptjs || '');
            fs.writeFileSync(phpFilePath, data.scriptphp || '');
        }

        vscode.window.showInformationMessage('Dossiers et fichiers créés avec succès');
    } catch (error) {
        vscode.window.showErrorMessage(`Échec de la récupération et de la création des fichiers : ${error.message}`);
    }
}

module.exports = {
    fetchAndCreateFiles
};