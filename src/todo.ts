import * as vscode from 'vscode';

import * as lib from './lib/lib';
import { parseTodo } from './lib/todo';

export function registerCommands(context: vscode.ExtensionContext) {
    const outputChannel = vscode.window.createOutputChannel("Find TODO");

    context.subscriptions.push(
        vscode.commands.registerCommand('blogging.findTodo', async () => {
            const items = await findAllItems();
            displayItems(items, outputChannel);
        }),
        vscode.commands.registerCommand('blogging.createTodo', create)
    );
}

interface TodoItem {
    path: string,
    description: string,
    date: string | undefined
}

async function findAllItems(): Promise<TodoItem[]> {
    let files = await vscode.workspace.findFiles('**/*.md');

    const results = await Promise.all(files.map(async (file) => {
        const document = await vscode.workspace.openTextDocument(file.path);
        let content = document.getText();
        return parseTodo(content).map((item) => {
            return {
                path: file.path,
                description: item.description,
                date: item.date
            };
        });
    }));

    return results.flat();
}

function displayItems(items: TodoItem[], outputChannel: vscode.OutputChannel) {
    outputChannel.clear();
    outputChannel.show(true);

    const validDates = items.every(item => item.date !== undefined);
    if (validDates) {
        throw new Error(
            "Every todo item contains a valid date. Please remove all code to accomodate when the "
            + "date is not present."
        );
    }

    items.sort((a, b) => {
        if (a.date === undefined && b.date === undefined) {
            return a.description.localeCompare(b.description);
        } else if (a.date === undefined) {
            return 1;
        } else if (b.date === undefined) {
            return -1;
        } else {
            // Sort is descending order because old items should be displayed at the bottom
            return -a.date.localeCompare(b.date);
        }
    });

    items.forEach(item => {
        outputChannel.appendLine(`- ${item.date || ''} ${item.description} (${item.path})`);
    });
}

function create() {
    const date = lib.dateToString(new Date());
    const todoSnippet = new vscode.SnippetString(`<!--TODO (${date}):\n$1\n-->`);
    const window = vscode.window.activeTextEditor!!;
    window.insertSnippet(todoSnippet, window.selection.active);
}