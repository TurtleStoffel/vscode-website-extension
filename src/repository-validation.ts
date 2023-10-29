import * as vscode from 'vscode';

export function registerCommands(context: vscode.ExtensionContext) {
    const outputChannel = vscode.window.createOutputChannel("Validate Repo");
    context.subscriptions.push(
        vscode.commands.registerCommand('blogging.validateRepo', () => {
            validateRepo(outputChannel);
        })
    );
}

async function validateRepo(outputChannel: vscode.OutputChannel) {
    outputChannel.clear();
    outputChannel.show();

    validateDeprecatedFolders(outputChannel);
}

async function validateDeprecatedFolders(outputChannel: vscode.OutputChannel) {
    const baseUri = vscode.workspace.workspaceFolders!![0].uri;
    // Example usage
    //const folders = ['archive', 'pages'];
    let success = true;
    const folders: string[] = [];
    await Promise.all(folders.map(async (folder) => {
        const folderUri = vscode.Uri.joinPath(baseUri, folder);
        try {
            await vscode.workspace.fs.readDirectory(folderUri);
            outputChannel.appendLine(`There are still articles in the '${folder}' folder. Please migrate them to GAE.`);
            success = false;
        } catch(e) {
            outputChannel.appendLine(`There are no more articles in the '${folder}' folder. Please remove this rule.`);
        }
    }));

    if (success) {
        outputChannel.appendLine('The repository is following all guidelines!');
    }
}