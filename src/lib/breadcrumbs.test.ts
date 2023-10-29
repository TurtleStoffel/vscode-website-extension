import * as assert from 'assert';

import { findBreadcrumbs } from './breadcrumbs';

suite('Breadcrumbs', () => {
    test('should return null when there are only comments between metadata and content', () => {
        const content = `
---
title: Test
---
<!-- This is a comment -->
# Title`.trim();
        

        const result = findBreadcrumbs(content);

        assert.equal(result, null);
    });

    test('should return breadcrumbs when they are defined', () => {
        const content = `
---
title: Test
breadcrumbs:
  - name: breadcrumb 1
    url: breadcrumb 1 url
  - name: breadcrumb 2
    url: breadcrumb 2 url
---

# Title`.trim();
        

        const result = findBreadcrumbs(content);

        assert.notEqual(result, null);
        assert.equal(result!!.length, 2);
        assert.deepEqual(result!![0], { name: 'breadcrumb 1', url: 'breadcrumb 1 url' });
        assert.deepEqual(result!![1], { name: 'breadcrumb 2', url: 'breadcrumb 2 url' });
    });
});
