import { SafeDOMParser } from '../../modules/@zooduck/safe-dom-parser/dist/index.module.js';
import { WebComponent } from '../../mixins/WebComponent.mixin.js';
import { loadCSSStyleSheet } from './loadCSSStyleSheet.util.js';

const styleSheet = await loadCSSStyleSheet({
  cssFile: './outlineBox.component.css',
  jsFile: './outlineBox.component.css.js'
});

const variablesStyleSheet = await loadCSSStyleSheet({
  cssFile: '../../styles/variables.css',
  jsFile: '../../styles/variables.css.js'
});

class HTMLOutlineBoxElement extends WebComponent {
  static LOCAL_NAME = 'outline-box';
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.adoptedStyleSheets = [variablesStyleSheet, styleSheet];
    this.#addEventListeners();
  }
  /**
   * @static
   * @readonly
   * @type {string[]}
   */
  static get observedAttributes() {
    return ['outline-style', 'outline-width'];
  }
  /**
   * @method
   * @returns {void}
   */
  attributeChangedCallback(attributeName, oldValue, newValue) {
    if (newValue === oldValue) {
      return;
    }
    switch (attributeName) {
      case 'outline-style':
        this.ready().then(() => {
          this.shadowRoot.getElementById('outline-box').style.borderStyle = newValue;
        });
        break;
      case 'outline-width':
        this.ready().then(() => {
          this.shadowRoot.getElementById('outline-box').style.borderWidth = newValue;
        });
        break;
      default:
        break;
    }
  }
  /**
   * @method
   * @returns {void}
   */
  connectedCallback() {
    if (this.hasRendered) {
      return;
    }
    this.render();
  }
  /**
   * @method
   * @returns {void}
   */
  render() {
    this.shadowRoot.append(this.#createContent());
    this.hasRendered = true;
  }
  /**
   * @private
   * @method
   * @returns {void}
   */
  #addEventListeners() {
    this.shadowRoot.addEventListener('slotchange', this.#onSlotChange.bind(this));
  }
  /**
   * @private
   * @method
   * @returns {HTMLElement}
   */
  #createContent() {
    return new SafeDOMParser().parseFromString`
      <section class="outline-box" id="outline-box">
        <slot></slot>
      </section>
    `;
  }
  /**
   * @private
   * @type {EventListener}
   */
  #onSlotChange() {
    const { padding } = getComputedStyle(this);
    this.shadowRoot.getElementById('outline-box').style.padding = padding;
    this.isReady = true;
  }
}

customElements.define(HTMLOutlineBoxElement.LOCAL_NAME, HTMLOutlineBoxElement);
