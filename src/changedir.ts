import { spawn } from 'child_process';
import { join } from 'path';

// eslint-disable-next-line import/prefer-default-export
export const getPath = (root: string, folder?: string) => join(process.env.HOME || '/', root, folder || '');
export const changedir = (path: string) => {
  const child = spawn('cd', [path], {
    detached: true,
    shell: true,
  });
  child.unref();
};
