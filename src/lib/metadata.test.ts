import * as assert from 'assert';

import { loadMetadata } from './metadata';

suite('Metadata', () => {
    test('should parse metadata successfully', () => {
        const content = `
---
title: test-title
breadcrumbs:
  - name: test-name
    url: test-url
---`.trim();

        const result = loadMetadata(content);

        assert.deepEqual(result, {
            title: 'test-title',
            breadcrumbs: [
                {
                    name: 'test-name',
                    url: 'test-url'
                }
            ]
        });
    });

    test('should return null when there is no metadata', () => {
        const content = 'Random test content';

        const result = loadMetadata(content);

        assert.equal(result, null);
    });
});
