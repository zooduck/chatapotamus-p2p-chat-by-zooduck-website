import { SafeDOMParser } from '../../modules/@zooduck/safe-dom-parser/dist/index.module.js';
import { WebComponent } from '../../mixins/WebComponent.mixin.js';
import { loadCSSStyleSheet } from './loadCSSStyleSheet.util.js';

const globalStyleSheet = await loadCSSStyleSheet({
  cssFile: '../../styles/global.css',
  jsFile: '../../styles/global.css.js'
});

const styleSheet = await loadCSSStyleSheet({
  cssFile: './commandLinePrompt.component.css',
  jsFile: './commandLinePrompt.component.css.js'
});

const variablesStyleSheet = await loadCSSStyleSheet({
  cssFile: '../../styles/variables.css',
  jsFile: '../../styles/variables.css.js'
});

class HTMLCommandLinePromptElement extends WebComponent {
  static LOCAL_NAME = 'command-line-prompt';
  #DEFAULT_TYPING_SPEED = 100;
  #hasSlotChangeFired;
  #instanceStyleSheet = new CSSStyleSheet();
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.adoptedStyleSheets = [
      variablesStyleSheet,
      globalStyleSheet,
      styleSheet,
      this.#instanceStyleSheet
    ];
    this.#addEventListeners();
  }
  /**
   * @static
   * @readonly
   * @type {string[]}
   */
  static get observedAttributes() {
    return [
      'initial-delay',
      'no-cursor',
      'retain-cursor',
      'typing-speed'
    ];
  }
  /**
   * @static
   * @readonly
   * @type {Object.<string, string>}
   */
  static get EventDict() {
    return {
      TYPING_COMPLETE: this.#createEventTypeWithNamespace('typingcomplete')
    };
  }
  /**
   * @private
   * @static
   * @method
   * @returns {string}
   */
  static #createEventTypeWithNamespace(eventType) {
    return this.LOCAL_NAME.replace(/-/g, '') + eventType;
  }
  /**
   * @method
   * @param {string} attributeName
   * @param {string|null} oldValue
   * @param {string|null} newValue
   * @returns {void}
   */
  attributeChangedCallback(attributeName, oldValue, newValue) {
    if (newValue === oldValue) {
      return;
    }
    switch (attributeName) {
      case 'initial-delay':
        this.#setInitialDelayCSSVariableValue(newValue);
        break;
      case 'no-cursor':
        this.#setCursorDisplayStyle(newValue);
        break;
      case 'retain-cursor':
        this.ready().then(() => {
          if (newValue === null) {
            this.shadowRoot.getElementById('cursor').remove();
          }
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
    this.isReady = true;
  }
  /**
   * @readonly
   * @type {boolean}
   */
  get retainCursor() {
    return this.hasAttribute('retain-cursor');
  }
  /**
   * @readonly
   * @type {number}
   */
  get typingSpeed() {
    return parseInt(this.getAttribute('typing-speed'), 10) || this.#DEFAULT_TYPING_SPEED;
  }
  /**
   * @method
   * @returns {void}
   */
  clear() {
    if (!this.isReady) {
      return;
    }
    this.shadowRoot.getElementById('root').innerHTML = '';
    this.shadowRoot.getElementById('root').append(this.#createCursor());
  }
  /**
   * @method
   * @returns {void}
   */
  render() {
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.append(this.#createContent());
    this.hasRendered = true;
  }
  /**
   * @method
   * @param {string} htmlString
   * @param {{intialDelay: number, typingSpeed: number}} [options]
   * @returns {void}
   */
  type(htmlString, { initialDelay, typingSpeed = this.typingSpeed } = {}) {
    this.ready().then(() => {
      if (initialDelay !== undefined) {
        this.#setInitialDelayCSSVariableValue(initialDelay);
      }
      const span = document.createElement('span');
      span.innerHTML = htmlString;
      this.#type(span.childNodes, typingSpeed);
    });
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
   * @param {string|HTMLElement} textOrElement
   * @param {string} [animationDelay="0ms"]
   * @returns {HTMLElement}
   */
  #createCharacter(textOrElement, animationDelay = '0ms') {
    const characterElement = new SafeDOMParser().parseFromString`<span class="character">${textOrElement}</span>`;
    characterElement.style.animationDelay = animationDelay;
    return characterElement;
  }
  /**
   * @private
   * @method
   * @returns {HTMLElement}
   */
  #createContent() {
    return new SafeDOMParser().parseFromString`
      <section id="root">
        <slot></slot>
      </section>`;
  }
  /**
   * @private
   * @method
   * @returns {HTMLElement}
   */
  #createCursor() {
    return new SafeDOMParser().parseFromString`<span class="cursor" id="cursor"></span>`;
  }
  /**
   * @private
   * @method
   * @returns {HTMLElement}
   */
  #createWordElement() {
    return new SafeDOMParser().parseFromString`<div class="word"></div>`;
  }
  /**
   * @private
   * @type {EventListener}
   */
  #onSlotChange(event) {
    if (this.#hasSlotChangeFired) {
      return;
    }
    this.#hasSlotChangeFired = true;
    const messageNodes = event.target.assignedNodes().map((node, index, array) => {
      if (index === 0 || index === (array.length - 1)) {
        node.textContent = node.textContent.trim();
      }
      return node;
    });
    this.#type(messageNodes, this.typingSpeed);
  }
  /**
   * @private
   * @method
   * @param {string|null} value
   * @returns {void}
   */
  #setCursorDisplayStyle(value) {
    const rule = value === null
      ? `
        .cursor {
          display: unset;
        }
      `
      : `
        .cursor {
          display: none;
        }
      `;
    this.#instanceStyleSheet.insertRule(rule, this.#instanceStyleSheet.cssRules.length);
  }
  /**
   * @private
   * @method
   * @param {number} milliseconds
   * @returns {void}
   */
  #setInitialDelayCSSVariableValue(milliseconds) {
    this.#instanceStyleSheet.insertRule(`
      :host {
        --_initial-delay: ${milliseconds}ms;
      }
    `, this.#instanceStyleSheet.cssRules.length);
  }
  /**
   * @private
   * @method
   * @param {Node[]} textOrElementNodes
   * @param {number} initialDelay
   * @param {number} typingSpeed
   */
  #type(textOrElementNodes = [], typingSpeed) {
    let characterNodes = [];
    Array.from(textOrElementNodes).forEach((node) => {
      if (node.nodeType === document.TEXT_NODE) {
        characterNodes.push(...node.textContent.split('').map((character) => {
          return character.trim() || '&nbsp;'
        }));
      } else if (node.nodeType === document.ELEMENT_NODE) {
        characterNodes.push(node);
      }
    });
    let characterCount = 0;
    const characterElements = characterNodes.map((characterNode) => {
      if (characterNode.nodeType === document.ELEMENT_NODE) {
        const textNodes = characterNode.textContent.split('').map((character) => {
          characterCount += 1;
          return this.#createCharacter(character.trim() || '&nbsp;', (typingSpeed * characterCount) + 'ms');
        });
        characterNode.innerHTML = '';
        characterNode.append(...textNodes);
        characterNode.style.setProperty('display', 'flex', 'important');
        return characterNode;
      }
      characterCount += 1;
      return this.#createCharacter(characterNode, (typingSpeed * characterCount) + 'ms');
    });
    const wordElements = [];
    let isPartOfWord;
    let wordElement = this.#createWordElement();
    characterElements.forEach((element, index, array) => {
      isPartOfWord = element.textContent.trim() !== '';
      wordElement.append(element.cloneNode(true));

      if (!isPartOfWord) {
        wordElements.push(wordElement);
        wordElement = this.#createWordElement();
      }

      if (index === array.length - 1) {
        wordElements.push(wordElement);
      }
    });
    const timeToComplete = this.typingSpeed * characterCount + parseFloat(getComputedStyle(this).getPropertyValue('--_initial-delay'));
    if (!this.retainCursor) {
      setTimeout(() => {
        this.shadowRoot.getElementById('cursor').remove();
      }, timeToComplete);
    }
    setTimeout(() => {
      this.sendCustomEvent(this.constructor.EventDict.TYPING_COMPLETE);
    }, timeToComplete);
    const cursorElement = this.shadowRoot.getElementById('cursor') || this.#createCursor();
    this.shadowRoot.getElementById('root').append(...wordElements, cursorElement);
  }
}

customElements.define(HTMLCommandLinePromptElement.LOCAL_NAME, HTMLCommandLinePromptElement);
