/**
 * @jest-environment ./test/env/test-env.ts
 */

import Scrollery from '../src/scrollery';

let window;
let scrollery;
let container;

beforeAll(() => {
  window = globalThis.window;
  container = window.document.querySelector(globalThis.containerSelector);
  scrollery = new Scrollery(container, globalThis.config);
});

describe('Scrollery', () => {
  describe('Events', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const eventCallback = () => {};
    it('should attach a callback fn for the load event', () => {
      scrollery.on?.('load', eventCallback);

      expect(scrollery.handlers).toHaveProperty('load', eventCallback);
    });

    it('should throw an error for non-event strings', () => {
      expect(() => {
        scrollery
          .on('fake event', eventCallback)
          .toThrow(/not a possible Scrollery event/);
      });
    });
  });
});
``;
