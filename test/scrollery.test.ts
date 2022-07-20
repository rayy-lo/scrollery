/**
 * @jest-environment ./test/env/test-env.ts
 */

// import Scrollery from '../src/scrollery';

describe('Scrollery', () => {
  const window = globalThis.page;

  test('h2 exists', () => {
    expect(window.document.querySelector('h2')?.textContent).toBe(
      'Hello there'
    );
  });
});
``;
