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
   * Intersection observer option properties
   */
  threshold: number | number[];
  rootMargin: string;
  /**
   * Display spinner when loading next page content
   */
  showSpinner: boolean;
}
