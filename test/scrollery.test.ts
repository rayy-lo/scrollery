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
});

beforeEach(() => {
  scrollery = new Scrollery(container, globalThis.config);
});

afterEach(() => {
  scrollery = null;
});

describe('Scrollery Interface', () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const mockEventHandler = jest.fn();

  describe('.on method', () => {
    it('should exist and be a function', () => {
      expect(typeof scrollery.on).toBe('function');
    });

    it('should attach a callback fn for the load event', () => {
      scrollery.on('load', mockEventHandler);
      scrollery.trigger('load');

      expect(scrollery.handlers).toHaveProperty('load', mockEventHandler);
      expect(mockEventHandler).toHaveBeenCalledTimes(1);
    });

    it('should throw an error for non-event strings', () => {
      expect(() => {
        scrollery
          .on('fake event', mockEventHandler)
          .toThrow(/not a possible Scrollery event/);
      });
    });
  });

  describe('.off method', () => {
    it('should exist and be a function', () => {
      expect(typeof scrollery.off).toBe('function');
    });

    it('should remove event handler for specific event', () => {
      scrollery.on('load', mockEventHandler);
      expect(scrollery.handlers).toHaveProperty('load', mockEventHandler);

      scrollery.off('load');
      expect(scrollery.handlers).not.toHaveProperty('load');
    });
  });

  describe('.loadNextPage', () => {
    it('should exist and be a function', () => {
      expect(typeof scrollery.loadNextPage).toBe('function');
    });

    it('should parse string into HTML and return list of desired Elements ', () => {
      const htmlString =
        '<main><div class="grid__item">First</div><div class="grid__item">Second</div></main>';

      const selectedDOMNodes = scrollery.parseHtmlText(
        htmlString,
        scrollery.config.content
      );

      expect(selectedDOMNodes).toHaveLength(2);
      expect(selectedDOMNodes[0].classList.contains('grid__item')).toBe(true);
    });
  });

  describe('.insertContentElement', () => {
    it('should exist and be a function', () => {
      expect(typeof scrollery.insertContentElement).toBe('function');
    });
  });
});
