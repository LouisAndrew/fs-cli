#!/usr/bin/env node

import clear from 'clear';
import { program } from 'commander';
import clipboard from 'clipboardy';
import { getFolderSelect, getRootSelect } from './src/select.js';
import { primary, title } from './src/out.js';
import { getPath } from './src/changedir.js';

type CLIOptions = {
 /**
  * Root folder directory.
  */
 root?: string
}

(async () => {
  program
    .version('0.0.1@alpha')
    .description('CLI for filesystem')
    .option('-r, --root <rootDir>', 'root folder directory')
    .parse(process.argv);

  clear();

  const options = program.opts<CLIOptions>();
  const root = options.root || await getRootSelect();
  const folder = await getFolderSelect(root);

  title();
  primary(`${folder ?? root} selected`);

  const path = getPath(root, folder ?? undefined);
  clipboard.writeSync(path);
})();
