export interface spinnerConfig {
  showSpinner: boolean;
  color: string;
}

export default interface ScrolleryConfig extends IntersectionObserverInit {
  /**
   * Query string to get next page
   */
  path: string;
  /**
   * Selector to retrieve content to append to container
   * e.g. ".post"
   */
  content: string;
  /**
   * Whether to check for the last page
   */
  checkLastPage: boolean;
  /**
   * Display spinner when loading next page content
   */
  spinner: spinnerConfig;
  /**
   * Fetch options for fetch request
   */
  fetchOptions: RequestInit;
  /**
   * Callback function when Scrollery is initialized
   */
  onReady(): void;
}
