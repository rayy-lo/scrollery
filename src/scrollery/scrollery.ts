import ScrolleryConfig from '../types/config';
import { IScrollery, EventMap, ScrolleryEvents } from '../types/scrollery';

class Scrollery implements IScrollery {
  public readonly config: ScrolleryConfig;
  public container: Element;
  handlers: EventMap = {};
  pagination_number = 2;
  events: Array<ScrolleryEvents> = ['load', 'last', 'insert'];

  constructor(container: Element, config: ScrolleryConfig) {
    this.config = Object.freeze(config);
    this.container = container;
  }

  fetchNextPageContent() {
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

  parseHtmlText(content: string): NodeListOf<Element> {
    const htmlContent = new DOMParser()
      .parseFromString(content, 'text/html')
      .querySelectorAll(this.config.content);
    return htmlContent;
  }

  insertElements(elements: NodeListOf<Element>) {
    if (elements.length === 0) return;

    elements.forEach((node) => {
      this.container.appendChild(node);
    });
  }

  public async loadNextPage() {
    try {
      const nextContent = await this.fetchNextPageContent();
      const nodeList = this.parseHtmlText(nextContent);
      this.insertElements(nodeList);
      this.trigger('load');
    } catch (err) {
      console.log(err);
    }
  }

  public on?(event: ScrolleryEvents, eventHandler: () => void): void {
    if (!this.events.includes(event))
      throw new Error(`${event} is not a possible Scrollery event`);
    this.handlers['load'] = eventHandler;
  }

  public off?(event: ScrolleryEvents): Error | void {
    if (!Object.prototype.hasOwnProperty.call(this.handlers, event))
      throw new Error(`No handler exists for '${event}' event`);

    delete this.handlers[event];
  }

  trigger(event: ScrolleryEvents): void {
    this.handlers[event]?.();
  }
}

export default Scrollery;
