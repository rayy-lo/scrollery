import Observer from '../observer/observer';
import Scrollery from '../scrollery/scrollery';
import ScrolleryConfig from '../types/config';

class ScrolleryBuilder {
  private container: Element | null;
  private config: ScrolleryConfig = {
    path: '',
    threshold: 0,
    rootMargin: '0px 0px 0px 0px',
    root: null,
    checkLastPage: true,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onReady: () => {}
  };

  constructor(container: string, config: ScrolleryConfig);
  constructor(container: Element, config: ScrolleryConfig);
  constructor(container: string | Element, config: ScrolleryConfig) {
    this.config = {
      ...this.config,
      ...config
    };

    if (typeof container === 'string') {
      this.container = document.querySelector(container);
      if (this.container === null)
        throw new Error(
          'Creating Scrollery instance failed. Container element does not exist'
        );
    } else {
      this.container = container;
    }

    this.validate();
    this.createObserver();
  }

  private validate(): void {}

  private createObserver(): void {
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

  public create(): Scrollery {
    const scrollery = new Scrollery();
    this.config.onReady();
    return scrollery;
  }
}

export default ScrolleryBuilder;
