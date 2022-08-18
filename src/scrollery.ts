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
  private events: Array<ScrolleryEvents> = [
    'load',
    'load.json',
    'last',
    'insert'
  ];
  private status: 'loading' | 'idle' = 'idle';
  private is_last_page = false;

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

    return fetch(fetch_url, this.config.fetchOptions).then((response) => {
      if (response.status === 404) {
        this.is_last_page = true;
        this.status = 'idle';
        this.toggleSpinner();
        this.trigger('last');
      }

      this.pagination_number++;
      this.trigger('load');

      if (response.headers.get('Content-Type')?.includes('application/json')) {
        return response.json();
      }

      return response.text();
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

  public insertContentElement(content: NodeListOf<Element> | string) {
    const spinner = this.container.querySelector('.scrollery-spinner-wrapper');

    if (typeof content === 'string') {
      spinner?.insertAdjacentHTML('beforebegin', content);
    } else if (typeof content === 'object' && content !== null) {
      content.forEach((node) => {
        spinner?.insertAdjacentElement('beforebegin', node);
      });
    } else {
      throw new Error(
        'Error inserting content. Content should be text or list of elements'
      );
    }

    this.trigger('insert');
  }

  public async loadNextPage() {
    if (this.is_last_page) return;

    this.status = 'loading';
    this.toggleSpinner();

    const nextContent = await this.fetchNextPageContent();

    if (typeof nextContent === 'string') {
      const nodeList = this.parseHtmlText(nextContent, this.config.content);
      this.insertContentElement(nodeList);
    } else {
      this.trigger('load.json', nextContent);
    }

    this.status = 'idle';
    this.toggleSpinner();
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

  public trigger(event: ScrolleryEvents, data?: unknown): void {
    if (event === 'load.json') {
      this.handlers['load.json']?.(data);
    } else {
      this.handlers[event]?.();
    }
  }
}

export default Scrollery;
