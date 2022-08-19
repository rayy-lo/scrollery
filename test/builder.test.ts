/**
 * @jest-environment ./test/env/test-env.ts
 */

import ScrolleryBuilder from '../src/builder';
import Scrollery from '../src/scrollery';
import { setupIntersectionObserverMock } from './mocks/IntersectionObserver';

jest.mock('../src/scrollery');

let window;

beforeAll(() => {
  window = globalThis.window;
  setupIntersectionObserverMock();
});

describe('ScrolleryBuilder', () => {
  it('should create a scrollery instance', () => {
    const scrollery = ScrolleryBuilder.create(
      '#product-grid',
      globalThis.config
    );

    expect(scrollery).toBeInstanceOf(Scrollery);
  });

  it('should throw an error that the container element does not exist', () => {
    expect(() => {
      ScrolleryBuilder.create('#grid', globalThis.config);
    }).toThrow(/Container element does not exist/);
  });
});
