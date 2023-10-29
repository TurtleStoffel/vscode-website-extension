import * as vscode from 'vscode';

import {getDefinedLinks} from './lib/link-validation';

export function validate(content: string, outputChannel: vscode.OutputChannel) {
    outputChannel.appendLine('Analyzing the links in the markdown file');
    validateBacklinks(content, outputChannel);
    outputChannel.appendLine('');
}

async function validateBacklinks(content: string, outputChannel: vscode.OutputChannel) {
    const relativeUrls = getDefinedLinks(content)
        .filter(link => {
            // Ignore non-relative URLs and Source Code index files
            return link.url.startsWith('/') && !link.url.endsWith('index.html');
        })
        .map(relativeLink => relativeLink.url);

    
    const results = await Promise.all(relativeUrls.map(async (relativeUrl) => {
        const originalUrl = 'test';
        const root = vscode.workspace.workspaceFolders!![0].uri;
        
        const repositoryPath = relativeUrl.replace('/pages/', '').replace('.html', '.md');
        const fullFilePath = vscode.Uri.joinPath(root, repositoryPath);

        let found = false;

        try {
            const document = await vscode.workspace.openTextDocument(fullFilePath);
            found = document.getText().includes(originalUrl);
        } catch(e) {
            console.log(`linking to a non-existing file: ${e}`);
        }

        return {
            url: repositoryPath,
            found: found
        };

    }));

    results.forEach((element) => {
        if(element.found) {
            outputChannel.show(true);
            outputChannel.appendLine(`No backlink found for ${element.url}`);
        }
    });
}
