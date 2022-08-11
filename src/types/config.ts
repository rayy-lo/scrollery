export default interface ScrolleryConfig extends IntersectionObserverInit {
  /**
   * Query string to get next page
   */
  path: string | ((pagination_number: number) => string);
  /**
   * Selector to retrieve content to append to container
   * e.g. ".post"
   */
  content: string;
  /**
   * Different svg spinners to choose from based on number
   * TODO: Add more types
   */
  spinner: number;
  /**
   * Fetch options for fetch request
   */
  fetchOptions: RequestInit;
}
