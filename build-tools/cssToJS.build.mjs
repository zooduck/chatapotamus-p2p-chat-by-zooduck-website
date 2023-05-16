import * as fs from 'node:fs/promises';

const filesToBuild = [
  {
    cssFile: 'docs/styles/global.css',
    jsFile: 'docs/styles/global.css.js'
  },
  {
    cssFile: 'docs/styles/variables.css',
    jsFile: 'docs/styles/variables.css.js'
  },
  {
    cssFile: 'docs/components/command-line-prompt/commandLinePrompt.component.css',
    jsFile: 'docs/components/command-line-prompt/commandLinePrompt.component.css.js'
  },
  {
    cssFile: 'docs/components/outline-box/outlineBox.component.css',
    jsFile: 'docs/components/outline-box/outlineBox.component.css.js'
  }
];

const buildImportableCSSFiles = async () => {
  for (const { cssFile, jsFile } of filesToBuild) {
    const cssFileContents = await fs.readFile(cssFile, { encoding: 'utf8' });
    await fs.writeFile(
      jsFile,
      'export default `\n' + cssFileContents + '`;\n'
    );
  }
};

export { buildImportableCSSFiles };
