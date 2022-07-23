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

describe('Scrollery Event System', () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const eventCallback = () => {};
  it('should attach a callback fn for the load event', () => {
    scrollery.on('load', eventCallback);

    expect(scrollery.handlers).toHaveProperty('load', eventCallback);
  });

  it('should throw an error for non-event strings', () => {
    expect(() => {
      scrollery
        .on('fake event', eventCallback)
        .toThrow(/not a possible Scrollery event/);
    });
  });

  it('should invoke the corresponding event handler', () => {
    scrollery.handlers['load'] = jest.fn();
    scrollery.trigger('load');
    expect(scrollery.handlers['load']).toHaveBeenCalled();
  });

  it('should remove event handler for specific event', () => {
    scrollery.on('load', eventCallback);
    expect(scrollery.handlers).toHaveProperty('load', eventCallback);

    scrollery.off('load');
    expect(scrollery.handlers).not.toHaveProperty('load');
  });
});

describe('Scrollery Load Content', () => {
  it('should parse string into HTML and return list of desired Elements ', () => {
    const htmlString =
      '<main><div class="grid__item">First</div><div class="grid__item">Second</div></main>';

    const selectedDOMNodes = scrollery.parseHtmlText(
      htmlString,
      scrollery.config.content
    );

    expect(selectedDOMNodes).toHaveLength(2);
  });
});
