export type ScrolleryEvents = 'load' | 'last' | 'insert';

export type EventHandlers = Partial<Record<ScrolleryEvents, () => void>>;

export interface EventSystem {
  on(event: ScrolleryEvents, eventHandler: () => void): void;
  off(event: ScrolleryEvents): void;
  trigger(event: ScrolleryEvents): void;
}

export interface IScrollery {
  loadNextPage(): void;
}
