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

  constructor(container: Element, config: ScrolleryConfig) {
    this.config = Object.freeze(config);
    this.container = container;
  }

  private fetchNextPageContent() {
    /**
     * TODO: Ability to fetch to different origins
     */
    const fetch_url: string =
      window.location.origin +
      window.location.pathname +
      '?' +
      this.config.path +
      '=' +
      this.pagination_number;

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
        .querySelector('.scrollery-loading-wrapper')
        ?.insertAdjacentElement('beforebegin', node);
    });
  }

  public async loadNextPage() {
    try {
      const nextContent = await this.fetchNextPageContent();
      const nodeList = this.parseHtmlText(nextContent, this.config.content);
      this.insertElements(nodeList);
      this.trigger('load');
    } catch (err) {
      console.log(err);
    }
  }

  public on(event: ScrolleryEvents, eventHandler: () => void): void {
    if (!this.events.includes(event))
      throw new Error(`${event} is not a possible Scrollery event`);
    this.handlers['load'] = eventHandler;
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
