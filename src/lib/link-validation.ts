export function getDefinedLinks(content: string) {
    const regex = /^\[(\d*)\]: (.*)$/gm;

    return Array.from(content.matchAll(regex), (match) => {
        return {
            id: match[1],
            url: match[2]
        };
    });
}
