import ScrolleryConfig from './config';

export type ScrolleryEvents = 'load' | 'last' | 'insert';

export interface EventHandlers {
  load?: () => void;
  last?: () => void;
  insert?: () => void;
}

export interface EventSystem {
  on(event: ScrolleryEvents, eventHandler: () => void): void;
  off(event: ScrolleryEvents): void;
  trigger(event: ScrolleryEvents): void;
}

export interface IScrollery {
  config: ScrolleryConfig;
  handlers: EventHandlers;
  loadNextPage(): void;
}
