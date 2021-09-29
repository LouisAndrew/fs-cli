import inquirer from 'inquirer';
import { getPath } from './changedir';
import { clone } from './clone';
import { primary } from './out';
import { readDir } from './readdir';
import { input } from './in';
import { CLONE_SELECT_VALUE } from './utils/const';

inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

const ROOTS = ['dev/ui', 'peepee', 'dev/backend', 'dev/util', 'dev/ui/libs'];

export const getSelectValue = async (values: string[], message: string) => {
  const value: {dir: string} = await inquirer.prompt([{
    type: 'autocomplete',
    name: 'dir',
    message,
    source: (answersSoFar: string, i: string) => {
      if (!i || i === '') {
        return values;
      }

      return values.filter((v) => v.indexOf(i) > -1);
    },
  }]);

  return value.dir;
};

export const getRootSelect = () => {
  primary('Please select a root directory');
  return getSelectValue(ROOTS.sort((a, b) => a.localeCompare(b)), 'Root directory');
};

export const getFolderSelect = async (root: string) => {
  primary('Please select your project folder');
  const path = getPath(root);
  const folder = await getSelectValue([...readDir(path), CLONE_SELECT_VALUE], 'Project folder');
  return folder === CLONE_SELECT_VALUE ? clone(path, await input('Please enter the repository URL')) : folder;
};
