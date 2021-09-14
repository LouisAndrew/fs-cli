import { execSync } from 'child_process';
import { getLast } from './utils/get-last';

export const clone = (root: string, url: string) => {
  execSync(`cd ${root} && git clone ${url}`);
  return getLast(url);
};
