export default `
:host {
  display: block;
  position: relative;
  width: 100%;
  z-index: var(--z-index-important);
}
.clipping-container {
  height: 0;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 100%;
}
.clipping-container--with-box-shadow {
  box-shadow: 2px 8px 12px rgba(0, 0, 0, 45%);
  transition: box-shadow var(--animation-speed-fast);
}
:host([open]) main {
  height: auto;
}
.slotted-content-container {
  transform: translateY(-100%);
  transition: transform var(--animation-speed-fast);
}
.slotted-content-container--open {
  transform: translateY(0);
}
`;