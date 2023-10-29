import * as vscode from 'vscode';

import * as linkValidation from './link-validation';
import * as breadcrumbs from './breadcrumbs';

export function register() {
    const outputChannel = vscode.window.createOutputChannel("Markdown Validation");

    vscode.workspace.onDidSaveTextDocument(async (document) => {
        if (document.languageId === 'markdown') {
            outputChannel.clear();

            outputChannel.appendLine('Analyzing markdown file');

            linkValidation.validate(document.getText(), outputChannel);
            await breadcrumbs.validate(document, outputChannel);
        }
    });
}