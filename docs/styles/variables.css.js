export default `
:host,
:root {
  /* COLORS */
  --color-black: hsl(0, 0%, 0%);
  --color-white: hsl(0, 0%, 100%);

  --color-gray-50: hsl(0, 0%, 95%);
  --color-gray-100: hsl(0, 0%, 90%);
  --color-gray-200: hsl(0, 0%, 80%);
  --color-gray-300: hsl(0, 0%, 70%);
  --color-gray-400: hsl(0, 0%, 60%);
  --color-gray-500: hsl(0, 0%, 50%);
  --color-gray-600: hsl(0, 0%, 40%);
  --color-gray-700: hsl(0, 0%, 30%);
  --color-gray-800: hsl(0, 0%, 20%);
  --color-gray-850: hsl(0, 0%, 15%);
  --color-gray-900: hsl(0, 0%, 10%);

  --color-blue-50: hsl(206, 100%, 95%);
  --color-blue-100: hsl(206, 100%, 90%);
  --color-blue-200: hsl(206, 100%, 80%);
  --color-blue-300: hsl(206, 100%, 70%);
  --color-blue-400: hsl(206, 100%, 60%);
  --color-blue-500: hsl(206, 100%, 50%);
  --color-blue-600: hsl(206, 100%, 40%);
  --color-blue-700: hsl(206, 100%, 30%);
  --color-blue-800: hsl(206, 100%, 20%);
  --color-blue-900: hsl(206, 100%, 10%);

  --color-purple-navy-50: hsl(240, 26%, 95%);
  --color-purple-navy-100: hsl(240, 26%, 90%);
  --color-purple-navy-200: hsl(240, 26%, 80%);
  --color-purple-navy-300: hsl(240, 26%, 70%);
  --color-purple-navy-400: hsl(240, 26%, 60%);
  --color-purple-navy-500: hsl(240, 26%, 50%);
  --color-purple-navy-600: hsl(240, 26%, 40%);
  --color-purple-navy-700: hsl(240, 26%, 30%);
  --color-purple-navy-800: hsl(240, 26%, 20%);
  --color-purple-navy-900: hsl(240, 26%, 10%);

  --color-danger-red: hsl(0, 100%, 64%);
  --color-alice-blue: hsl(208, 100%, 97%); /* aliceblue */
  --color-hookers-green: hsl(161, 17%, 42%);
  --color-brink-pink: hsl(346, 91%, 65%);

  /* FONT */
  --font-family-base: 'Roboto Flex', Verdana, Geneva, Tahoma, sans-serif;
  --font-family-emoji: 'Segoe UI EMOJI', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  --font-weight-normal: 200;
  --font-weight-bold: 400;

  /* BORDER SIZES */
  --border-width: 1.2px;

  /* FONT SIZES */
  --font-size-xx-small: calc(var(--font-size-medium) * 0.5625);
  --font-size-x-small: calc(var(--font-size-medium) * 0.625);
  --font-size-small: calc(var(--font-size-medium) * 0.8125);
  --font-size-medium: 1rem;
  --font-size-large: calc(var(--font-size-medium) * 1.125);
  --font-size-x-large: calc(var(--font-size-medium) * 1.5);
  --font-size-xx-large: calc(var(--font-size-medium) * 2);
  --font-size-xxx-large: calc(var(--font-size-medium) * 3);

  /* GAP SIZES */
  --gap-size-x-small: calc(var(--gap-size-medium) * 0.625);
  --gap-size-small: calc(var(--gap-size-medium) * 0.8125);
  --gap-size-medium: 12px;
  --gap-size-large: calc(var(--gap-size-medium) * 1.125);
  --gap-size-x-large: calc(var(--gap-size-medium) * 1.5);

  /* MARGIN SIZES */
  --margin-size-x-small: calc(var(--margin-size-medium) * 0.625);
  --margin-size-small: calc(var(--margin-size-medium) * 0.8125);
  --margin-size-medium: 12px;
  --margin-size-large: calc(var(--margin-size-medium) * 1.125);
  --margin-size-x-large: calc(var(--margin-size-medium) * 1.5);

  /* PADDING SIZES */
  --padding-size-x-small: calc(var(--padding-size-medium) * 0.625);
  --padding-size-small: calc(var(--padding-size-medium) * 0.8125);
  --padding-size-medium: 12px;
  --padding-size-large: calc(var(--padding-size-medium) * 1.125);
  --padding-size-x-large: calc(var(--padding-size-medium) * 1.5);

  /* Z-INDEX LEVELS */
  --z-index-normal: 1;
  --z-index-important: 100;
  --z-index-very-important: 1000;
  --z-index-critical: 2147483647;

  /* ANIMATION */
  --animation-speed-slow: 1s;
  --animation-speed-normal: 0.5s;
  --animation-speed-fast: 0.25s;
}
`;
