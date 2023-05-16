import { buildImportableCSSFiles } from './build-tools/cssToJS.build.mjs';
import { copyModules } from './build-tools/copyModules.build.mjs';
import { copyDistributableModuleToPublicDirectory } from './build-tools/copyDistributableModuleToPublicDirectory.build.mjs';
import { copySourceFilesForDependencyPreviews } from './build-tools/copySourceFilesForDependencyPreviews.build.mjs';

await buildImportableCSSFiles();
await copyModules();
await copyDistributableModuleToPublicDirectory();
await copySourceFilesForDependencyPreviews();
