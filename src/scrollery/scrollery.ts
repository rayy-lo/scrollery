import ScrolleryConfig from '../types/config';

class Scrollery {
  public readonly config: ScrolleryConfig;

  constructor(config: ScrolleryConfig) {
    this.config = config;

    config.onInit();
  }

  onLoad?: () => void;

  public loadNextPage() {
    console.log('load next page');

    if (this.onLoad) {
      this.onLoad();
    }
  }

  public on?(event: string, eventHandler: () => void): void {
    if (event === 'load') this.onLoad = eventHandler;
  }
}

export default Scrollery;
