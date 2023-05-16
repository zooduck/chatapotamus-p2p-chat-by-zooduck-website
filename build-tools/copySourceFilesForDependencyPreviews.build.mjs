import * as fs from 'node:fs/promises';

const copySourceFilesForDependencyPreviews = async () => {
  await fs.rm('docs/src-files', { recursive: true, force: true });
  await fs.cp('node_modules/@zooduck/chatapotamus-p2p-chat-by-zooduck/src/dependencies', 'docs/src-files/dependencies', { recursive: true });
};

export { copySourceFilesForDependencyPreviews };
