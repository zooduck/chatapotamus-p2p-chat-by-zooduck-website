import { buildTools } from '@zooduck/build-tools';

const copyModules = async () => {
  await buildTools.copyModules('node_modules', 'docs/modules', [
    '@zooduck/safe-dom-parser',
    '@zooduck/send-custom-event-mixin',
    '@zooduck/web-component-mixin'
  ]);
};

export { copyModules };
