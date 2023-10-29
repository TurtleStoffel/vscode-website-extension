import * as vscode from 'vscode';

export function getWorkspaceRootUri(): vscode.Uri {
    return vscode.workspace.workspaceFolders?.[0].uri!!;
}
