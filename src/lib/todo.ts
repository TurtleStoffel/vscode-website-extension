/**
 * Parse all todo items in the form of
 * \<!--TODO:-->
 * from a string
 * @returns A list of todo items
 */
export function parseTodo(text: String): {date: string | undefined, description: string}[] {
    let regex = /^<!--TODO(.*?):(.*?)-->/gms;
    return Array.from(text.matchAll(regex), (match) => {
        return {
            date: parseDate(match[1]),
            description: parseTitle(match[2].trim())
        };
    });
}

export function parseDate(text: String): string | undefined {
    const regex = /\d{4}-\d{2}-\d{2}/;
    return text.match(regex)?.[0];
}

export function parseTitle(text: String): string {
    const regex = /[^\n]*/;
    const match = text.match(regex);
    if (match === null) {
        throw new Error('A todo item is found without any content');
    }

    return match[0];
}