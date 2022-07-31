import Scrollery from './scrollery';
import ScrolleryConfig, { spinnerConfig } from './types/config';
import spinner from './assets/three-dots.svg';
class ScrolleryBuilder {
  private static scrollery: Scrollery;
  private static container: Element | null;
  private static config: ScrolleryConfig = {
    path: '',
    content: '.grid__item',
    threshold: 0,
    rootMargin: '200px',
    root: null,
    checkLastPage: true,
    fetchOptions: {
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'text/html'
      }
    },
    spinner: {
      showSpinner: true,
      color: '#000000'
    },
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      observer: IntersectionObserver
    ) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        this.scrollery.loadNextPage();
      });
    };

    const observer = new IntersectionObserver(observerCallback, options);

    observer.observe(this.container?.lastElementChild as Element);
  }

  private static addLoadingElement(): void {
    const loadingElement: Element = window.document.createElement('div');

    function applySpinnerConfig(
      spinner: string,
      spinnerConfig: spinnerConfig
    ): Element {
      const parser = new window.DOMParser();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const spinnerElement = parser
        .parseFromString(spinner, 'text/html')
        .querySelector('svg')!;

      spinnerElement.setAttribute('fill', spinnerConfig.color);

      if (!spinnerConfig.showSpinner) {
        spinnerElement.setAttribute('style', 'display: none;');
      }

      return spinnerElement;
    }

    loadingElement.classList.add('scrollery-spinner-wrapper');

    loadingElement.insertAdjacentElement(
      'beforeend',
      applySpinnerConfig(spinner, this.config.spinner)
    );

    this.container?.classList.add('scrollery-container');
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
      this.container = window.document.querySelector(container);
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

    const scrollery: Scrollery = new Scrollery(this.container, this.config);
    this.scrollery = scrollery;

    this.addLoadingElement();
    this.createObserver();

    this.config.onReady();
    return scrollery;
  }
}

export default ScrolleryBuilder;
