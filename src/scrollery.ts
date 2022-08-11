import ScrolleryConfig from './types/config';
import {
  IScrollery,
  EventHandlers,
  ScrolleryEvents,
  EventSystem
} from './types/scrollery';

class Scrollery implements EventSystem, IScrollery {
  private config: ScrolleryConfig;
  private container: Element;
  private handlers: EventHandlers = {};
  private pagination_number = 2;
  private events: Array<ScrolleryEvents> = ['load', 'last', 'insert'];
  private status: 'loading' | 'idle' = 'idle';

  constructor(container: Element, config: ScrolleryConfig) {
    this.config = config;
    this.container = container;
  }

  private toggleSpinner() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const spinnerWrapper = window.document.querySelector<HTMLElement>(
      '.scrollery-spinner-wrapper'
    )!;

    spinnerWrapper.style.opacity = this.status === 'loading' ? '1' : '0';
  }

  private fetchNextPageContent() {
    let fetch_url;

    if (typeof this.config.path === 'string') {
      const searchParams = new URLSearchParams(window.location.search);

      searchParams.set(this.config.path, this.pagination_number.toString());

      fetch_url =
        window.location.origin +
        window.location.pathname +
        searchParams.toString();
    } else {
      fetch_url = this.config.path(this.pagination_number);
    }

    return fetch(fetch_url, this.config.fetchOptions)
      .then((response) => response.text())
      .then((data) => {
        this.pagination_number++;
        return data;
      });
  }

  private parseHtmlText(
    content: string,
    selector: string
  ): NodeListOf<Element> {
    const htmlContent = new window.DOMParser()
      .parseFromString(content, 'text/html')
      .querySelectorAll(selector);
    return htmlContent;
  }

  private insertElements(elements: NodeListOf<Element>) {
    if (elements.length === 0) return;

    elements.forEach((node) => {
      this.container
        .querySelector('.scrollery-spinner-wrapper')
        ?.insertAdjacentElement('beforebegin', node);
    });
    this.trigger('insert');
  }

  public async loadNextPage() {
    this.status = 'loading';
    this.toggleSpinner();

    try {
      const nextContent = await this.fetchNextPageContent();
      const nodeList = this.parseHtmlText(nextContent, this.config.content);
      this.insertElements(nodeList);
      this.trigger('load');
    } catch (err) {
      console.log(err);
    } finally {
      this.status = 'idle';
      this.toggleSpinner();
    }
  }

  public on(event: ScrolleryEvents, eventHandler: () => void): void {
    if (!this.events.includes(event))
      throw new Error(`${event} is not a possible Scrollery event`);
    this.handlers[event] = eventHandler;
  }

  public off(event: ScrolleryEvents): Error | void {
    if (!Object.prototype.hasOwnProperty.call(this.handlers, event))
      throw new Error(`No handler exists for '${event}' event`);

    delete this.handlers[event];
  }

  public trigger(event: ScrolleryEvents): void {
    this.handlers[event]?.();
  }
}

export default Scrollery;
