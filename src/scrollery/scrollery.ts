import Observer from '../observer/observer';
import { Config, InitConfig } from '../types/config';
import document from '../var/document';

class Scrollery {
  private loading: boolean;
  private observer: IntersectionObserver;
  private container: Element | null;

  constructor(container: string, config: InitConfig);
  constructor(container: Element, config: InitConfig);
  constructor(container: string | Element, config: InitConfig) {
    this.loading = false;

    if (typeof container === 'string') {
      this.container = document.querySelector(container);
    } else {
      this.container = container;
    }

    const { threshold } = config;
    const observerOptions: IntersectionObserverInit = {
      threshold
    };

    this.observer = Observer.createObserver(
      this.container?.lastElementChild as Element,
      observerOptions
    );
  }
}

export default Scrollery;
