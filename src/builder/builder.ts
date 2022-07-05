import Scrollery from '../scrollery/scrollery';
import ScrolleryConfig from '../types/config';

class ScrolleryBuilder {
  private static scrollery: Scrollery;
  private static observer: IntersectionObserver;
  private static container: Element | null;
  private static config: ScrolleryConfig = {
    path: '',
    content: '',
    threshold: 0,
    rootMargin: '200px',
    root: null,
    checkLastPage: true,
    showSpinner: true,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onReady: () => {}
  };

  private static createObserver(): void {
    const { threshold, root, rootMargin } = this.config;
    const options: IntersectionObserverInit = {
      threshold,
      root,
      rootMargin
    };

    const observerCallback = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        console.log(entry, observer);
        this.scrollery.loadNextPage();
      });
    };

    const observer = new IntersectionObserver(observerCallback, options);

    this.observer = observer;

    observer.observe(this.container?.lastElementChild as Element);
  }

  private static addLoadingElement(): void {
    const loadingElement: Element = document.createElement('div');
    loadingElement.classList.add('scrollery-spinner');

    this.container?.appendChild(loadingElement);
  }

  public static create(container: string, config: ScrolleryConfig): Scrollery;
  public static create(container: Element, config: ScrolleryConfig): Scrollery;
  public static create(
    container: string | Element,
    config: ScrolleryConfig
  ): Scrollery {
    if (
      !Object.prototype.hasOwnProperty.call(config, 'path') ||
      !Object.prototype.hasOwnProperty.call(config, 'content')
    ) {
      throw new Error('Path or content missing in config');
    }

    if (typeof container === 'string') {
      this.container = document.querySelector(container);
      if (this.container === null)
        throw new Error(
          'Creating Scrollery instance failed. Container element does not exist'
        );
    } else {
      this.container = container;
    }

    this.config = {
      ...this.config,
      ...config
    };

    const scrollery: Scrollery = new Scrollery(this.config);
    this.scrollery = scrollery;

    this.createObserver();
    this.addLoadingElement();

    this.config.onReady();
    return scrollery;
  }
}

export default ScrolleryBuilder;
