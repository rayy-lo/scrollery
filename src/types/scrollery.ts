import ScrolleryConfig from './config';

type ScrolleryEvents = 'load' | 'last' | 'insert';

export interface EventMap {
  load?: () => void;
  last?: () => void;
  insert?: () => void;
}

export interface IScrollery {
  config: ScrolleryConfig;
  handlers: EventMap;
  loadNextPage: () => void;
  on?: (event: ScrolleryEvents, eventHandler: () => void) => void;
  off?: (event: ScrolleryEvents) => void;
  trigger: (event: ScrolleryEvents) => void;
}
