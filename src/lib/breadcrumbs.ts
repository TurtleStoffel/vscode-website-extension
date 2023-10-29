import { loadMetadata } from './metadata';

export function findBreadcrumbs(content: string): any[] | null {
    return loadMetadata(content)?.breadcrumbs;
}