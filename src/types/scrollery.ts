export type ScrolleryEvents = 'load' | 'load.json' | 'last' | 'insert';

export type EventHandlers = Partial<
  Record<ScrolleryEvents, (data?: unknown) => void>
>;

export interface EventSystem {
  on(event: ScrolleryEvents, eventHandler: () => void): void;
  off(event: ScrolleryEvents): void;
  trigger(event: ScrolleryEvents, data?: unknown): void;
}

export interface IScrollery {
  loadNextPage(): void;
}
