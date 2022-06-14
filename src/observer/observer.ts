import observer from '../var/observer';

class Observer {
  public static createObserver(
    target: Element,
    options: IntersectionObserverInit
  ) {
    const observer = new IntersectionObserver(this.checkToLoadNext, options);

    observer.observe(target);

    return observer;
  }

  private static checkToLoadNext(
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) {
    entries.forEach((entry) => {
      console.log(entry);
    });
  }
}

export default Observer;
