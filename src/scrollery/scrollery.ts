import ScrolleryConfig from '../types/config';
import { IScrollery, EventMap, ScrolleryEvents } from '../types/scrollery';

class Scrollery implements IScrollery {
  public readonly config: ScrolleryConfig;
  handlers: EventMap = {};

  constructor(config: ScrolleryConfig) {
    this.config = Object.freeze(config);
  }

  public loadNextPage() {
    //TODO: Implement

    this.trigger('load');
  }

  public on?(
    event: ScrolleryEvents,
    eventHandler: () => void
  ): void {
    if (event === 'load') {
      this.handlers['load'] = eventHandler;
    }
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
