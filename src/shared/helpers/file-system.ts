import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

export function getCurrentModuleDirectoryPath() {
  const path = fileURLToPath(import.meta.url);
  return dirname(path);
}
