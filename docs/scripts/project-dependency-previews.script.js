import '../components/command-line-prompt/index.js';
import '../modules/@zooduck/chatapotamus-p2p-chat-by-zooduck/dependencies/utils/alert-service/components/alert-service-alert/alertServiceAlert.component.js';
import '../modules/@zooduck/chatapotamus-p2p-chat-by-zooduck/dependencies/utils/alert-service/components/alert-service-confirm/alertServiceConfirm.component.js';
import '../modules/@zooduck/chatapotamus-p2p-chat-by-zooduck/dependencies/component-library/emoji-tray/index.js';
import '../modules/@zooduck/chatapotamus-p2p-chat-by-zooduck/dependencies/component-library/file-transfer-progress/index.js';
import '../modules/@zooduck/chatapotamus-p2p-chat-by-zooduck/dependencies/component-library/form-controls/input-text/index.js'
import '../modules/@zooduck/chatapotamus-p2p-chat-by-zooduck/dependencies/component-library/form-controls/x-button/index.js';
import '../modules/@zooduck/chatapotamus-p2p-chat-by-zooduck/dependencies/component-library/link-to-element/index.js';
import '../modules/@zooduck/chatapotamus-p2p-chat-by-zooduck/dependencies/component-library/media-streams/index.js';
import '../modules/@zooduck/chatapotamus-p2p-chat-by-zooduck/dependencies/component-library/x-chat/index.js';
import '../modules/@zooduck/chatapotamus-p2p-chat-by-zooduck/dependencies/component-library/x-details/index.js';
import '../modules/@zooduck/chatapotamus-p2p-chat-by-zooduck/dependencies/component-library/x-loading/index.js';
import '../modules/@zooduck/chatapotamus-p2p-chat-by-zooduck/dependencies/component-library/x-progress/index.js';
import { SafeDOMParser } from '../modules/@zooduck/chatapotamus-p2p-chat-by-zooduck/modules/@zooduck/safe-dom-parser/dist/index.module.js';
import { svgIconService } from '../modules/@zooduck/chatapotamus-p2p-chat-by-zooduck/assets/svgIconService.util.js';
import { wait } from '../modules/@zooduck/chatapotamus-p2p-chat-by-zooduck/dependencies/utils/wait.util.js';

// ==================
// SVG Icons
// ==================
await svgIconService.loadIcons();
const icons = Object.values(svgIconService.Icon);
const svgIconsElement = document.getElementById('svg-icons');
icons.forEach((icon) => {
  svgIconsElement.append(svgIconService.getIcon(icon, { style: 'fill: white; stroke: white;' }));
});

// ==================
// Component Library
// ==================
const componentsLibraryElement = document.getElementById('component-library');
for (const { elementName, localName, instances, path, componentLibraryElementsContainerStyle } of [
  {
    elementName: 'HTMLAlertServiceAlertElement',
    localName: 'alert-service-alert',
    path: 'src-files/dependencies/utils/alert-service/components/alert-service-alert/alertServiceAlert.component.js',
    componentLibraryElementsContainerStyle: 'height: 300px; position: relative; width: 100%;',
    instances: [
      {
        attributes: [
          ['contained', ''],
          ['style', 'visibility: hidden'],
          ['alert-title', 'alert-service-alert']
        ],
        cssVariables: [],
        script: (element) => {
          const intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                element.style.visibility = 'visible';
                intersectionObserver.unobserve(element);
              }
            });
          }, { threshold: 0 });
          intersectionObserver.observe(element);
        }
      }
    ]
  },
  {
    elementName: 'HTMLAlertServiceConfirmElement',
    localName: 'alert-service-confirm',
    path: 'src-files/dependencies/utils/alert-service/components/alert-service-confirm/alertServiceConfirm.component.js',
    componentLibraryElementsContainerStyle: 'height: 300px; position: relative; width: 100%;',
    instances: [
      {
        attributes: [
          ['contained', ''],
          ['style', 'visibility: hidden'],
          ['confirm-title', 'alert-service-confirm']
        ],
        cssVariables: [],
        script: (element) => {
          const intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                element.style.visibility = 'visible';
                intersectionObserver.unobserve(element);
              }
            });
          }, { threshold: 0 });
          intersectionObserver.observe(element);
        }
      }
    ]
  },
  {
    elementName: 'HTMLCommandLinePromptElement',
    localName: 'command-line-prompt',
    path: 'components/command-line-prompt/commandLinePrompt.component.js',
    instances: [
      {
        attributes: [['retain-cursor', '']],
        cssVariables: [],
        script: (element) => {
          const typeSomething = async () => {
            await wait.forSeconds(2);
            element.clear();
            element.type(`Right. Marty. Marty. Marty. I don't like her, Marty. Any girl who calls a boy is just asking for trouble. Ah, where're my pants? You know Marty, you look so familiar, do I know your mother?`);
          };
          element.addEventListener(customElements.get('command-line-prompt').EventDict.TYPING_COMPLETE, typeSomething);
          typeSomething();
        }
      }
    ]
  },
  {
    elementName: 'HTMLEmojiTrayElement',
    localName: 'emoji-tray',
    path: 'src-files/dependencies/component-library/emoji-tray/emojiTray.component.js',
    instances: [
      {
        attributes: [],
        cssVariables: [],
      }
    ]
  },
  {
    elementName: 'HTMLFileTransferProgressElement',
    localName: 'file-transfer-progress',
    path: 'src-files/dependencies/component-library/file-transfer-progress/fileTransferProgress.component.js',
    instances: [
      {
        attributes: [],
        cssVariables: [],
        script: (element) => {
          const fakeLoad = async () => {
            element.totalBytes = 512;
            element.bytesLoaded = 0;
            element.label = 'Sending file: example.jpg';
            for (let i = 0; i <= element.totalBytes; i++) {
              await wait.forMilliseconds(10);
              element.bytesLoaded = i;
            }
            setTimeout(fakeLoad, 2010);
          }
          fakeLoad();
        }
      }
    ]
  },
  {
    elementName: 'HTMLInputTextElement',
    localName: 'input-text',
    path: 'src-files/dependencies/component-library/form-controls/input-text/inputText.component.js',
    componentLibraryElementsContainerStyle: 'flex-direction: column',
    instances: [
      {
        attributes: [],
        cssVariables: [
          ['--input-text-background-color', 'var(--color-gray-800)'],
          ['--input-text-color', 'var(--color-white)'],
          ['--input-text-placeholder-color', 'rgba(255, 255, 255, 70%)']
        ]
      },
      {
        attributes: [['multiline', '']],
        cssVariables: [
          ['--input-text-background-color', 'var(--color-gray-800)'],
          ['--input-text-color', 'var(--color-white)'],
          ['--input-text-placeholder-color', 'rgba(255, 255, 255, 70%)']
        ]
      },
      {
        attributes: [['multiline', ''], ['emoji-tray', ''], ['rows', '3']],
        cssVariables: [
          ['--input-text-background-color', 'var(--color-gray-800)'],
          ['--input-text-color', 'var(--color-white)'],
          ['--input-text-placeholder-color', 'rgba(255, 255, 255, 70%)'],
          ['--x-button-active-brightness', '1.2'],
          ['--x-button-background-color', 'var(--color-gray-800)'],
          ['--x-button-color', 'var(--color-white)']
        ]
      }
    ]
  },
  {
    elementName: 'HTMLXButtonElement',
    localName: 'x-button',
    path: 'src-files/dependencies/component-library/form-controls/x-button/xButton.component.js',
    instances: [
      {
        attributes: [],
        cssVariables: []
      },
      {
        attributes: [['action', 'primary']],
        cssVariables: []
      },
      {
        attributes: [['action', 'secondary']],
        cssVariables: [
          ['--x-button-background-color', 'var(--color-gray-850)'],
          ['--x-button-color', 'var(--color-white)'],
          ['--x-button-active-brightness', '1.2']
        ]
      },
      {
        attributes: [['action', 'warning']],
        cssVariables: []
      },
      {
        attributes: [['action', 'danger']],
        cssVariables: [
          ['--x-button-background-color', 'var(--color-gray-850)'],
          ['--x-button-color', 'var(--color-white)'],
          ['--x-button-active-brightness', '1.2']
        ]
      },
    ]
  },
  {
    elementName: 'HTMLXChatElement',
    localName: 'x-chat',
    path: 'src-files/dependencies/component-library/x-chat/xChat.component.js',
    componentLibraryElementsContainerStyle: 'height: 250px',
    instances: [
      {
        attributes: [
          ['empty-chat-placeholder', 'There are no messages'],
          ['call-to-action', 'Optional CTA']
        ],
        cssVariables: [],
        script: (element) => {
          element.addEventListener('optionalcta', () => {
            alert('I fire an event (in this case an "optionalcta" event) so you can perform some chat related task that falls outside the remit of the x-chat element (like deleting a user\'s chat history for example).');
          });
          const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                element.remoteHandle = 'pomper';
                element.init([
                  { message: 'This is a received message &#x1F42D;', unix: Date.now(), fromID: 'pomper', origin: 'remote', type: 'text' },
                  { message: 'This is a sent message &#x1F601;', unix: Date.now(), fromID: 'domper', origin: 'local', type: 'text' }
                ]);
                observer.unobserve(element);
              }
            })
          }, { threshold: 1 });
          observer.observe(element);
        }
      }
    ]
  },
  {
    elementName: 'HTMLXDetailsElement',
    localName: 'x-details',
    path: 'src-files/dependencies/component-library/x-details/xDetails.component.js',
    instances: [
      {
        attributes: [['summary', 'Do you have for me...']],
        cssVariables: [],
        slottedContent: '<p>...the massage?</p>'
      }
    ]
  },
  {
    elementName: 'HTMLXLoadingElement',
    localName: 'x-loading',
    path: 'src-files/dependencies/component-library/x-loading/xLoading.component.js',
    instances: [
      {
        attributes: [],
        cssVariables: []
      }
    ]
  },
  {
    elementName: 'HTMLXProgressElement',
    localName: 'x-progress',
    path: 'src-files/dependencies/component-library/x-progress/xProgress.component.js',
    instances: [
      {
        attributes: [['max', '3'], ['value', '1']],
        cssVariables: []
      }
    ]
  },
  {
    elementName: 'HTMLXScrollerElement',
    localName: 'x-scroller',
    path: 'src-files/dependencies/utils/use-custom-scrollbars/components/x-scroller/xScroller.component.js',
    instances: [
      {
        attributes: [],
        cssVariables: [],
        script: (element) => {
          element.innerHTML = `
            <section style="height: 150px; width: 100%; overflow: auto;">
              <p>
                Mayor Goldie Wilson, I like the sound of that. When could weathermen predict the weather,
                let alone the future. Why do you keep following me around? Thank god I still got my hair.
                What on Earth is that thing I'm wearing? We never would have fallen in love.
              </p>
              <p>
                Well, because George, nice girls get angry when guys take advantage of them. Something wrong
                with the starter, so I hid it. George. You know what I do in those situations? You have this
                thing hooked up to the car?
              </p>
              <p>
                Right. Marty. Marty. Marty. I don't like her, Marty. Any girl who calls a boy is just asking
                for trouble. Ah, where're my pants? You know Marty, you look so familiar, do I know your mother?
              </p>
              <p>
                Marty, you seem so nervous, is something wrong? After I fell off my toilet, I drew this.
                Here you go, lady. There's a quarter. Roads? Where we're going we don't need roads.
                Hey, George, buddy, you weren't at school, what have you been doing all day?
              </p>
              <p>
                Biff. Last night, Darth Vader came down from planet Vulcan. And he told me that if I didn't
                take Lorraine, that he'd melt my brain. Great good, good, Lorraine, I had a feeling about
                you two. You want it, you know you want it, and you know you want me to give it to you.
                Hello, hello, anybody home? Think, McFly, think. I gotta have time to get them re-typed.
                Do you realize what would happen if I hand in my reports in your handwriting. I'll get fired.
                You wouldn't want that to happen would you? Would you?
              </p>
            </section>
          `;
        }
      }
    ]
  }
]) {
  const response = await fetch(path);
  const fileContents = await response.text();
  const elements = [];
  instances.forEach(({ attributes, cssVariables, slottedContent, script }) => {
    const element = document.createElement(localName);
    attributes.forEach(([name, value]) => {
      element.setAttribute(name, value);
    });
    cssVariables.forEach(([property, value]) => {
      element.style.setProperty(property, value);
    });
    if (slottedContent) {
      element.innerHTML = slottedContent;
    }
    if (script) {
      script(element);
    }
    elements.push(element);
  });

  componentsLibraryElement.append(new SafeDOMParser().parseFromString`
    <section class="dependencies__item">
      <h3 class="dependencies__item-heading">${elementName} | &lt;${localName}&gt;</h3>
      <section class="dependencies__elements" style="${componentLibraryElementsContainerStyle || ''}">${elements}</section>
      <x-details class="dependencies__code-summary" summary="${path.slice(path.lastIndexOf('/') + 1)}">
        <pre class="dependencies__code-details">${fileContents.trim()}</pre>
      </x-details>
    </section>
  `);
}

// ==================
// Mixins
// ==================
const mixinsElement = document.getElementById('mixins');
for (const { name, path } of [
  {
    name: 'sendCustomEventMixin',
    path: 'modules/@zooduck/send-custom-event-mixin/src/sendCustomEventMixin.mixin.js'

  },
  {
    name: 'WebComponent (class)',
    path: 'modules/@zooduck/web-component-mixin/src/WebComponent.mixin.js'
  }
]) {
  const response = await fetch(path);
  const fileContents = await response.text();

  mixinsElement.append(new SafeDOMParser().parseFromString`
    <section class="dependencies__item">
      <h3 class="dependencies_item-heading">${name}</h3>
      <x-details class="dependencies__code-summary" summary="${path.slice(path.lastIndexOf('/') + 1)}">
        <pre class="dependencies__code-details">${fileContents.trim()}</pre>
      </x-details>
    </section>
  `);
}

// ==================
// Utils
// ==================
const utilsElement = document.getElementById('utils');
for (const { name, path } of [
  {
    name: 'alertService',
    path: 'src-files/dependencies/utils/alert-service/alertService.util.js'
  },
  {
    name: 'ConnectionsService (class)',
    path: 'src-files/dependencies/utils/connections-service/ConnectionsService.util.js'
  },
  {
    name: 'emojify',
    path: 'src-files/dependencies/utils/emojify/emojify.util.js'
  },
  {
    name: 'splashScreenService',
    path: 'src-files/dependencies/utils/splash-screen-service/splashScreenService.util.js'
  },
  {
    name: 'useCustomScrollbars',
    path: 'src-files/dependencies/utils/use-custom-scrollbars/useCustomScrollbars.util.js'
  },
  {
    name: 'consoleService (Proxy)',
    path: 'src-files/dependencies/utils/consoleService.util.js'
  },
  {
    name: 'dataChannelFileSender',
    path: 'src-files/dependencies/utils/dataChannelFileSender.util.js'
  },
  {
    name: 'debounce.util.js',
    path: 'src-files/dependencies/utils/debounce.util.js'
  },
  {
    name: 'getBackgroundBrightnessFromElement',
    path: 'src-files/dependencies/utils/getBackgroundBrightnessFromElement.util.js'
  },
  {
    name: 'getBrowserScrollbarWidth',
    path: 'src-files/dependencies/utils/getBrowserScrollbarWidth.util.js'
  },
  {
    name: 'getCSSPropertyValue',
    path: 'src-files/dependencies/utils/getCSSPropertyValue.util.js'
  },
  {
    name: 'getCSSStylesFromElement',
    path: 'src-files/dependencies/utils/getCSSStylesFromElement.util.js'
  },
  {
    name: 'getElementAbsoluteOffset',
    path: 'src-files/dependencies/utils/getElementAbsoluteOffset.util.js'
  },
  {
    name: 'isImportAssertionSupported',
    path: 'src-files/dependencies/utils/isImportAssertionSupported.util.js'
  },
  {
    name: 'localStorageService (Proxy)',
    path: 'src-files/dependencies/utils/localStorageService.util.js'
  },
  {
    name: 'MediaStreamService (class)',
    path: 'src-files/dependencies/utils/MediaStreamService.util.js'
  },
  {
    name: 'networkUtils',
    path: 'src-files/dependencies/utils/networkUtils.util.js'
  },
  {
    name: 'SafeDOMParser (class)',
    path: 'modules/@zooduck/safe-dom-parser/src/SafeDOMParser.module.js'
  },
  {
    name: 'ScreenShareService (class)',
    path: 'src-files/dependencies/utils/ScreenShareService.util.js'
  },
  {
    name: 'sendDataChannelMessage',
    path: 'src-files/dependencies/utils/sendDataChannelMessage.util.js'
  },
  {
    name: 'setStylePropertiesOnElement',
    path: 'src-files/dependencies/utils/setStylePropertiesOnElement.util.js'
  },
  {
    name: 'UserMediaService (class)',
    path: 'src-files/dependencies/utils/UserMediaService.util.js'
  },
  {
    name: 'wait',
    path: 'src-files/dependencies/utils/wait.util.js'
  },
  {
    name: 'WaitTimeCalculator (class)',
    path: 'src-files/dependencies/utils/WaitTimeCalculator.util.js'
  }
]) {
  const response = await fetch(path);
  const fileContents = await response.text();

  utilsElement.append(new SafeDOMParser().parseFromString`
    <section class="dependencies__item">
      <h3 class="dependencies_item-heading">${name}</h3>
      <x-details class="dependencies__code-summary" summary="${path.slice(path.lastIndexOf('/') + 1)}">
        <pre class="dependencies__code-details">${fileContents.trim()}</pre>
      </x-details>
    </section>
  `);
}
