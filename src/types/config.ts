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
   * Determines whether to show a spinner while
   */
  showSpinner: boolean;
  /**
   * Fetch options for fetch request
   */
  fetchOptions: RequestInit;
  /**
   * Response type from content fetch
   */
  responseType: 'text' | 'json';
}
