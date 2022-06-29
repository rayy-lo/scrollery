import ScrolleryConfig from './config';
export default interface IScrollery {
  config: ScrolleryConfig;
  onLoad?: () => void;
  loadNextPage: () => void;
  on?: (event: string, eventHandler: () => void) => void;
}
