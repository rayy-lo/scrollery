import Observer from '../observer/observer';
import Scrollery from '../scrollery/scrollery';
import ScrolleryConfig from '../types/config';

class ScrolleryBuilder {
  private static container: Element | null;
  private static config: ScrolleryConfig = {
    path: '',
    threshold: 0,
    rootMargin: '0px 0px 0px 0px',
    root: null,
    checkLastPage: true,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onReady: () => {}
  };

  private static createObserver(): void {
    const { threshold, root, rootMargin } = this.config;
    const observerOptions: IntersectionObserverInit = {
      threshold,
      root,
      rootMargin
    };

    Observer.createObserver(
      this.container?.lastElementChild as Element,
      observerOptions
    );
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
    if (!Object.prototype.hasOwnProperty.call(config, 'path')) {
      throw new Error('Path property required in config');
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

    this.createObserver();
    this.addLoadingElement();

    const scrollery = new Scrollery(this.config.path);

    return scrollery;
  }
}

export default ScrolleryBuilder;
