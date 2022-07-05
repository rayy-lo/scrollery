import ScrolleryConfig from '../types/config';
import { IScrollery, EventMap } from '../types/scrollery';

class Scrollery implements IScrollery {
  public readonly config: ScrolleryConfig;
  handlers: EventMap = {};

  constructor(config: ScrolleryConfig) {
    this.config = config;
    //TODO: Freeze config object
  }

  public loadNextPage() {
    //TODO: Implement

    this.trigger('load');
  }

  public on?(
    event: 'load' | 'last' | 'insert',
    eventHandler: () => void
  ): void {
    if (event === 'load') {
      this.handlers['load'] = eventHandler;
    }
  }

  public off?(event: string): void {
    //TODO: remove event handler for event
  }

  trigger(event: keyof EventMap): void {
    this.handlers[event]?.();
  }
}

export default Scrollery;
