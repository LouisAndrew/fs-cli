import cliSelect from 'cli-select';
import { getPath } from './changedir';
import { primary } from './out';
import { readDir } from './readdir';

export const getSelectValue = async (values: string[]) => {
  const resolved = await cliSelect({
    values,
    unselected: '[ ]',
    selected: '[✓]',
  });
  return resolved.value;
};

const ROOTS = ['dev/ui', 'peepee', 'dev/backend', 'dev/util'];
export const getRootSelect = () => {
  primary('Please select a root directory');
  return getSelectValue(ROOTS.sort((a, b) => a.localeCompare(b)));
};

export const getFolderSelect = (root: string) => {
  primary('Please select your project folder');
  return getSelectValue(readDir(getPath(root)));
};
