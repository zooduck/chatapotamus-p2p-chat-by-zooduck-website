/**
 * For use with elements ONLY.
 *
 * Not intended to be used directly. Adds a sendCustomEvent() method to
 * the superclass (which includes support for event handler properties)
 * to be used in place of dispatchEvent().
 *
 * @example
 * // Add an event listener using an event handler property:
 * class MyCustomElement extends sendCustomEventMixin(HTMLElement) {
 *   constructor() {
 *     super();
 *   }
 * }
 * customElements.define('my-custom-element', MyCustomElement);
 * const customElement = document.querySelector('custom-element');
 * customElement.onmycustomevent = (event) => console.log(event.type)
 * customElement.sendCustomEvent('mycustomevent')
 * // "mycustomevent"
 *
 * @example
 * // Add an event listener using addEventListener():
 * customElement.addEventListener('mycustomevent', (event) => { console.log(event.type) })
 * customElement.sendCustomEvent('mycustomevent')
 * // "mycustomevent"
 *
 * @mixin
 * @param {HTMLElement} Base
 */
function sendCustomEventMixinForElements(Base) {
  return class SendCustomEventForElements extends Base {
    constructor() {
      super();
    }
    /**
     * @method
     * @param {string} type
     * @param {*} [detail=null]
     * @param {{bubbles: boolean, cancelable: boolean, composed: boolean}}
     * @returns {boolean} wasNotCancelled
     */
    sendCustomEvent(type, detail = null, { bubbles = true, cancelable = false, composed = false } = {}) {
      const event = new CustomEvent(type, {
        bubbles: bubbles,
        cancelable: cancelable,
        composed: composed,
        detail: detail
      });

      let isCancelled = !this.dispatchEvent(event);

      const onEventListener = this['on' + type];

      if (onEventListener && typeof onEventListener === 'function') {
        onEventListener(event);

        if (event.defaultPrevented) {
          isCancelled = true;
        }
      }

      return isCancelled ? false : true;
    };
  }
}

/**
 * WARNING! Not to be used with elements! Use sendCustomEventMixinForElements() instead =)
 *
 * Not intended to be used directly.
 * Decorates the superclass with eventing capability including event handler properties.
 *
 * @example
 * // Add an event listener using an event handler property:
 * class Eventful extends sendCustomEventMixin(OptionalBaseClass) {
 *   constructor() {
 *     super()
 *   }
 * }
 * const eventful = new Eventful();
 * eventful.onmycustomevent = (event) => console.log(event.type)
 * eventful.sendCustomEvent('mycustomevent')
 * // "mycustomevent"
 *
 * @example
 * // Add an event listener using addEventListener():
 * eventful.addEventListener('mycustomevent', (event) => { console.log(event.type) })
 * eventful.sendCustomEvent('mycustomevent')
 * // "mycustomevent"
 *
 * @mixin
 * @param {ClassDecorator} [Base]
 */
function sendCustomEventMixin(Base) {
  class SendCustomEvent {
    #eventTarget;
    constructor() {
      this.#eventTarget = new EventTarget();
    }
    /**
     * @method
     * @param {string} type
     * @param {EventListener} listener
     * @returns {void}
     */
    addEventListener(type, listener) {
      return this.#eventTarget.addEventListener(type, listener);
    }
    /**
     * @method
     * @param {string} type
     * @param {*} [detail=null]
     * @param {{bubbles: boolean, cancelable: boolean, composed: boolean, dispatchEventOnWindow: boolean}} options
     * @returns {boolean} wasNotCancelled
     */
    sendCustomEvent(type, detail = null, {
      bubbles = true,
      cancelable = false,
      composed = false,
      dispatchEventOnWindow = false
    } = {}) {
      const event = new CustomEvent(type, {
        bubbles: bubbles,
        cancelable: cancelable,
        composed: composed,
        detail: detail
      });

      let isCancelled = dispatchEventOnWindow
        ? !this.#dispatchEvent(event) || !window.dispatchEvent(event)
        : !this.#dispatchEvent(event);

      const onEventListener = this['on' + type];

      if (onEventListener && typeof onEventListener === 'function') {
        onEventListener(event);

        if (event.defaultPrevented) {
          isCancelled = true;
        }
      }

      return isCancelled ? false : true;
    };
    /**
     * @private
     * @method
     * @param {Event} event
     * @returns {boolean} wasNotCancelled
     */
    #dispatchEvent(event) {
      return this.#eventTarget.dispatchEvent(event);
    }
  }

  if (Base) {
    Object.setPrototypeOf(SendCustomEvent.prototype, Base.prototype); // Equivalent to "class SendCustomEvent extends Base"
  }

  return SendCustomEvent;
}


export { sendCustomEventMixin, sendCustomEventMixinForElements };
