import { sendCustomEventMixinForElements } from './sendCustomEvent.mixin.js';

/**
 * Not intended to be used directly. Mixes functionality
 * useful for ALL custom elements.
 *
 * Automatically fixes an issue with Custom Elements that occurs when
 * an IDL Attribute (DOM Property) is set before the element is defined
 * in the custom registry.
 *
 * @example
 * // Using the ready() Promise to safely reference elements that might not exist yet:
 * class PageElement extends WebComponent {
 *   constructor() {
 *     super();
 *   }
 *   static get observedAttributes() {
 *     return ['page-title'];
 *   }
 *   // This can fire before the connectedCallback() lifecycle callback!
 *   attributeChangedCallback(attributeName, oldValue, newValue) {
 *     this.ready().then(() => {
 *       this.shadowRoot.getElementById(attributeName).textContent = newValue;
 *     });
 *   }
 *   connectedCallback() {
 *     this.render();
 *     this.isReady = true;
 *   }
 *   render() {
 *     this.shadowRoot.innerHTML = `
 *       <header id="page-title"></header>
 *       <main></main>
 *       <footer></footer>
 *     `;
 *   }
 * }
 *
 * @example
 * // Using the hasRendered property to prevent re-rendering in the connectedCallback() lifecycle callback:
 * class PageELement extends WebComponent {
 *   // ...
 *   connectedCallback() {
 *      if (this.hasRendered) {
 *        return;
 *      }
 *      this.render();
 *   }
 *   render() {
 *     // ...
 *     this.hasRendered = true;
 *   }
 * }
 *
 * @mixin
 * @mixes SendCustomEventForElements
 * @mixes HTMLElement
 */
class WebComponent extends sendCustomEventMixinForElements(HTMLElement) {
  #hasRendered = false;
  #isReady = false;
  #isReadyPromise;
  #isReadyResolvers = new Set();
  constructor() {
    super();
    this.#initIsReadyPromise();
    this.#fixIDLAttributesSetBeforeCustomElementIsDefined();
  }
  get hasRendered() {
    return this.#hasRendered;
  }
  set hasRendered(value) {
    this.#hasRendered = value;
  }
  get isReady() {
    return this.#isReady;
  }
  set isReady(value) {
    this.#isReady = value;
    if (value) {
      this.#isReadyResolvers.forEach((isReadyResolver) => {
        isReadyResolver.resolve();
      });
      this.sendCustomEvent('ready');
    } else {
      this.#initIsReadyPromise();
    }
  }
  #fixIDLAttributesSetBeforeCustomElementIsDefined() {
    Object.keys(this).forEach((property) => {
      const propertyValue = this[property];
      delete this[property];
      this[property] = propertyValue;
    });
  }
  #initIsReadyPromise() {
    this.#isReadyPromise = new Promise((resolve) => {
      this.#isReadyResolvers.add({ resolve: resolve });
    });
  }
  ready() {
    return this.#isReadyPromise;
  }
}

export { WebComponent };
