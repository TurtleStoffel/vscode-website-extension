import * as vscode from 'vscode';

import * as repositoryValidation from './repository-validation';
import * as todo from './todo';
import * as validateMarkdown from './validate-markdown';

export function activate(context: vscode.ExtensionContext) {
    validateMarkdown.register();

    repositoryValidation.registerCommands(context);
    todo.registerCommands(context);
}

export function deactivate() {}