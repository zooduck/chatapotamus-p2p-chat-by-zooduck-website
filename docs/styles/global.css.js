export default `
:not(:defined),
:host(:not(:defined)) {
 visibility: hidden;
}

*,
:host {
  box-sizing: border-box;
}

code {
  background-color: rgba(0, 0, 0, 5%);
  font-family: monospace;
  font-size: smaller;
  line-height: 1.8;
  padding: 2px 4px;
}

figure {
  margin: 0;
}

form {
  width: 100%;
}

h1,
h2,
h3 {
  font: inherit;
  margin: 0;
  padding: 1ex 0;
}

h1 {
  font-size: var(--font-size-xx-large);
}

h2 {
  font-size: var(--font-size-x-large);
}

h3 {
  font-size: var(--font-size-large);
}

img,
video {
  max-width: 100%;
}

.icon {
  display: inline-block;
  fill: var(--color-black);
  flex-grow: 0;
  flex-shrink: 0;
  height: var(--font-size-medium);
  stroke: var(--color-black);
  width: var(--font-size-medium);
  vertical-align: -0.125rem;
}

.icon-xx-small {
  height: var(--font-size-xx-small);
  width: var(--font-size-xx-small);
}

.icon--small {
  height: var(--font-size-small);
  width: var(--font-size-small);
}

.icon--medium {
  height: var(--font-size-medium);
  width: var(--font-size-medium);
}

.icon--large {
  height: var(--font-size-large);
  width: var(--font-size-large);
}

.icon--x-large {
  height: var(--font-size-x-large);
  width: var(--font-size-x-large);
}

.icon--xx-large {
  height: var(--font-size-xx-large);
  width: var(--font-size-xx-large);
}
`;
