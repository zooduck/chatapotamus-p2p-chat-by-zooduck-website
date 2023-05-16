import * as fs from 'node:fs/promises';

const copyDistributableModuleToPublicDirectory = async () => {
  const DISTRIBUTABLE_MODULE_SOURCE_DIRECTORY = 'node_modules/@zooduck/chatapotamus-p2p-chat-by-zooduck/modules/@zooduck/chatapotamus-p2p-chat-by-zooduck';
  const DISTRIBUTABLE_MODULE_PUBLIC_DIRECTORY = 'docs/modules/@zooduck/chatapotamus-p2p-chat-by-zooduck';
  await fs.rm(DISTRIBUTABLE_MODULE_PUBLIC_DIRECTORY, {
    recursive: true,
    force: true
  });
  await fs.cp(
    DISTRIBUTABLE_MODULE_SOURCE_DIRECTORY,
    DISTRIBUTABLE_MODULE_PUBLIC_DIRECTORY,
    {
      recursive: true
    }
  );
};

export { copyDistributableModuleToPublicDirectory };
