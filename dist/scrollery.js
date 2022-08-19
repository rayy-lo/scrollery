var Scrollery = (function () {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    class Scrollery {
        constructor(container, config) {
            this.handlers = {};
            this.pagination_number = 2;
            this.events = [
                'load',
                'load.json',
                'last',
                'insert'
            ];
            this.status = 'idle';
            this.is_last_page = false;
            this.config = config;
            this.container = container;
        }
        toggleSpinner() {
            if (this.config.showSpinner === false)
                return;
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const spinnerWrapper = window.document.querySelector('.scrollery-spinner-wrapper');
            spinnerWrapper.style.opacity = this.status === 'loading' ? '1' : '0';
        }
        fetchNextPageContent() {
            let fetch_url;
            if (typeof this.config.path === 'string') {
                const searchParams = new URLSearchParams(window.location.search);
                searchParams.set(this.config.path, this.pagination_number.toString());
                fetch_url =
                    window.location.origin +
                        window.location.pathname +
                        searchParams.toString();
            }
            else {
                fetch_url = this.config.path(this.pagination_number);
            }
            return fetch(fetch_url, this.config.fetchOptions).then((response) => {
                if (response.status !== 200) {
                    this.is_last_page = true;
                    this.trigger('last');
                    throw new Error('Error fetching content');
                }
                return this.config.responseType === 'json'
                    ? response.json()
                    : response.text();
            });
        }
        parseHtmlText(content, selector) {
            const htmlContent = new window.DOMParser()
                .parseFromString(content, 'text/html')
                .querySelectorAll(selector);
            return htmlContent;
        }
        insertContentElement(content) {
            const spinner = this.container.querySelector('.scrollery-spinner-wrapper');
            if (typeof content === 'string') {
                spinner === null || spinner === void 0 ? void 0 : spinner.insertAdjacentHTML('beforebegin', content);
            }
            else if (typeof content === 'object' && content !== null) {
                content.forEach((node) => {
                    spinner === null || spinner === void 0 ? void 0 : spinner.insertAdjacentElement('beforebegin', node);
                });
            }
            this.trigger('insert');
        }
        loadNextPage() {
            return __awaiter(this, void 0, void 0, function* () {
                if (this.is_last_page)
                    return;
                this.status = 'loading';
                this.toggleSpinner();
                try {
                    const nextContent = yield this.fetchNextPageContent();
                    this.pagination_number++;
                    this.trigger('load');
                    if (typeof nextContent === 'string') {
                        const nodeList = this.parseHtmlText(nextContent, this.config.content);
                        this.insertContentElement(nodeList);
                    }
                    else {
                        this.trigger('load.json', nextContent);
                    }
                }
                catch (err) {
                    console.error(err);
                }
                finally {
                    this.status = 'idle';
                    this.toggleSpinner();
                }
            });
        }
        on(event, eventHandler) {
            if (!this.events.includes(event))
                throw new Error(`${event} is not a possible Scrollery event`);
            this.handlers[event] = eventHandler;
        }
        off(event) {
            if (!Object.prototype.hasOwnProperty.call(this.handlers, event))
                throw new Error(`No handler exists for '${event}' event`);
            delete this.handlers[event];
        }
        trigger(event, data) {
            var _a, _b, _c, _d;
            if (event === 'load.json') {
                (_b = (_a = this.handlers)['load.json']) === null || _b === void 0 ? void 0 : _b.call(_a, data);
            }
            else {
                (_d = (_c = this.handlers)[event]) === null || _d === void 0 ? void 0 : _d.call(_c);
            }
        }
    }

    var spinner = '<svg width="120" height="30" viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg" fill="#000">    <circle cx="15" cy="15" r="15">        <animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"/> <animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite"/> </circle> <circle cx="60" cy="15" r="9" fill-opacity="0.3">        <animate attributeName="r" from="9" to="9" begin="0s" dur="0.8s" values="9;15;9" calcMode="linear" repeatCount="indefinite"/> <animate attributeName="fill-opacity" from="0.5" to="0.5" begin="0s" dur="0.8s" values=".5;1;.5" calcMode="linear" repeatCount="indefinite"/> </circle> <circle cx="105" cy="15" r="15">        <animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"/> <animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite"/> </circle> </svg>';

    class ScrolleryBuilder {
        static createObserver() {
            var _a;
            const { threshold, root, rootMargin } = this.config;
            const options = {
                threshold,
                root,
                rootMargin
            };
            const observerCallback = (entries, 
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting)
                        return;
                    this.scrollery.loadNextPage();
                });
            };
            const observer = new IntersectionObserver(observerCallback, options);
            observer.observe((_a = this.container) === null || _a === void 0 ? void 0 : _a.lastElementChild);
        }
        static addLoadingElement() {
            var _a;
            const spinnerWrapper = window.document.createElement('div');
            spinnerWrapper.classList.add('scrollery-spinner-wrapper');
            spinnerWrapper.innerHTML = spinner;
            spinnerWrapper.style.opacity = '0';
            (_a = this.container) === null || _a === void 0 ? void 0 : _a.insertAdjacentElement('beforeend', spinnerWrapper);
        }
        static create(container, config) {
            if (!Object.prototype.hasOwnProperty.call(config, 'path') ||
                !Object.prototype.hasOwnProperty.call(config, 'content')) {
                throw new Error('Path or content missing in config');
            }
            if (typeof container === 'string') {
                this.container = window.document.querySelector(container);
                if (this.container === null)
                    throw new Error('Creating Scrollery instance failed. Container element does not exist');
            }
            else {
                this.container = container;
            }
            this.config = Object.assign(Object.assign({}, this.config), config);
            const scrollery = new Scrollery(this.container, this.config);
            this.scrollery = scrollery;
            this.addLoadingElement();
            this.createObserver();
            return scrollery;
        }
    }
    ScrolleryBuilder.config = {
        path: '',
        content: '',
        threshold: 0,
        rootMargin: '200px',
        root: null,
        fetchOptions: {},
        responseType: 'text',
        showSpinner: false
    };

    return ScrolleryBuilder;

})();
