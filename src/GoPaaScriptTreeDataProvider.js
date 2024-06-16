const vscode = require('vscode');

class GoPaaScriptTreeDataProvider {
    constructor() {
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    }

    refresh() {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element) {
        return element;
    }

    getChildren(element) {
        if (!element) {
            return Promise.resolve(this.getRootItems());
        }
        return Promise.resolve([]);
    }

    getRootItems() {
        const addButton = new vscode.TreeItem('Nouvelle connexion', vscode.TreeItemCollapsibleState.None);
        addButton.command = {
            command: 'gopaascript.addConnection',
            title: 'Nouvelle connexion',
        };
        addButton.iconPath = new vscode.ThemeIcon('add');

        return [
            addButton
        ];
    }
}

module.exports = GoPaaScriptTreeDataProvider;