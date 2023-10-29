import * as YAML from 'yaml';

export function loadMetadata(content: string): any {
    const metadataRegex = /---(.*?)---/ms;

    const result = content.match(metadataRegex);

    if (!result) {
        return null;
    }

    return YAML.parse(result[1]);
}