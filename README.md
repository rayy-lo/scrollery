# Scrollery

A modern infinite scrolling library

## Features

- Leverages Intersection Observer API for performance
- No dependencies
- Lightweight
- Event handlers for custom Scrollery events
- Supports JSON and text/html response types

## Installation

**CDN:**

```html
<script src="https://unpkg.com/scrollery@1.2.1/dist/scrollery.min.js"></script>
<!-- or -->
<script src="https://unpkg.com/scrollery@1.2.1/dist/scrollery.js"></script>
```

**NPM:**

```js
$ npm install scrollery
```

## Usage

HTML

```html
<!-- Container -->
<ul id="product-grid">
  <li class="product-card">...</li>
  <li class="product-card">...</li>
  <li class="product-card">...</li>
  <!-- Adds next page content here -->
</ul>
```

Initialize Scrollery

```js
const scrollery = Scrollery.create('#product-grid', {
  path: 'page',
  content: '.product-card'
});
```

OR

```js
const productGridElement = document.querySelector('#product-grid');
const scrollery = Scrollery.create(productGridElement, {
  path: 'page',
  content: '.product-card'
});
```

## Config

| Property               | Type               | Default | Description                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ---------------------- | ------------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| path **(required)**    | string \| function | ""      | Determines the URL for the next page of content. The string value should be a the key of a search parameter. This will be used to determine the next URL to fetch content from. A function that returns the URL for the next page content can also be used.<br/> <br/> If "page" was passed as the value for path; scrollery will start fetching from **_.../?page=2_**. The value will automatically increment for the next page. <br> |
| content **(required)** | string             | ""      | Selector to query the content from next page and append to container element.                                                                                                                                                                                                                                                                                                                                                           |
| root                   | Element            | null    | Element used as the viewport for checking visibility of the target. <sup>[1](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)</sup>                                                                                                                                                                                                                                                                          |
| rootMargin             | string             | "200px" | Margin around the root. <sup>[1](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)</sup>                                                                                                                                                                                                                                                                                                                      |
| threshold              | number \| number[] | 0       | Number or an array of numbers which indicate at what percentage of the spinner's visibility to load more content. <sup>[1](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)</sup>                                                                                                                                                                                                                            |
| fetchOptions           | Object             | {}      | Options to apply for fetch request. <sup>[2](https://developer.mozilla.org/en-US/docs/Web/API/fetch)<sup>                                                                                                                                                                                                                                                                                                                               |
| responseType           | "text" \| "json"   | "text"  | The type of response being returned from the server. <br> If set to **json**, provide an event handler for the **load.json** event to populate data on a template. An example is given below.                                                                                                                                                                                                                                           |
| showSpinner            | boolean            | false   | Shows a spinner while waiting to load the content from the next page.                                                                                                                                                                                                                                                                                                                                                                   |

## Events

| Event     | Description                                                                               |
| --------- | ----------------------------------------------------------------------------------------- |
| load      | Triggered when the next content page has successfully fetched, but not inserted into DOM. |
| load.json | Triggered when the data returned from the next page is JSON.                              |
| insert    | Triggered when the desired content is inserted into the DOM.                              |
| last      | Triggered when there is no more content to fetch.                                         |

```js
// Attach an event handler for the load event
scrollery.on('load', () => {
  console.log('Load event occured');
});

// Remove event handler for load event
scrollery.off('load');
```

### Example for JSON response

> Markup needs to be created and appended to the Scrollery container as shape of data will differ depending on the content. A templating library can help with this or the Document object.

```js
/**
 * data is a JavaScript object that is the result of
 * parsing the response body
 **/
scrollery.on('load.json', (data) => {
  // Populate template with data
  const html = template.compile(data);
  // Append HTML to container
  scrollery.insertContentElements(html);
});
```

## Browser support

Scrollery supports Chrome 51+, Edge 15+, Firefox 55+, Safari 12.1+. Internet Explorer is **NOT** supported.
