#!/usr/bin/env node

import clear from 'clear';
import { program } from 'commander';
import { spawn } from 'child_process';
import { getFolderSelect, getRootSelect } from './src/select';
import { error, primary, title } from './src/out';
import { getPath } from './src/changedir';
import { getConfig } from './getconfig';

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

  const config = getConfig();
  if (!config) {
    return;
  }

  if (!config.paths) {
    error('`paths` attribute is empty');
    return;
  }

  const options = program.opts<CLIOptions>();
  const root = options.root || await getRootSelect(config.paths);
  const folder = await getFolderSelect(root);

  title();
  primary(`${folder} selected`);
  const path = getPath(root, folder);
  // process.stdout.write(path);
  const proc = spawn('pbcopy');
  proc.stdin.write(path);
  proc.stdin.end();
})();
