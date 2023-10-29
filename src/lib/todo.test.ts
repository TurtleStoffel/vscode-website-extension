import * as assert from 'assert';

import { parseDate, parseTodo } from './todo';

suite('Test todo functionality', () => {
    test('parseTodo should find multiple todo items', () => {
        const content = `
<!--TODO: test-->
Random Other content
<!--TODO:
Multiline test
With a second line of information
-->`.trim();

        const todoItems = parseTodo(content);

        assert.equal(todoItems.length, 2);
        assert.equal(todoItems[0].description, 'test');
        assert.equal(todoItems[1].description, 'Multiline test');
    });

    test('parseTodo should find date in todo item', () => {
        const content = `
<!--TODO (2023-04-01):
Test with date
-->`.trim();

        const todoItems = parseTodo(content);

        assert.equal(todoItems.length, 1);
        assert.equal(todoItems[0].date, '2023-04-01');
    });

    test('parseTodo should only return first line of the description', () => {
        const content = `
<!--TODO (2023-04-01):
first line of information
second line that is ignored
-->`.trim();

        const todoItems = parseTodo(content);

        assert.equal(todoItems.length, 1);
        assert.equal(todoItems[0].description, 'first line of information');
    });

    test('parseDate should parse a valid date', () => {
        const content = '  (2023-09-10)';

        const result = parseDate(content);

        assert.equal(result, '2023-09-10');
    });
});