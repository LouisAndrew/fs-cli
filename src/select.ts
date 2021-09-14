import inquirer from 'inquirer';
import { getPath } from './changedir';
import { primary } from './out';
import { readDir } from './readdir';

inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

export const getSelectValue = async (values: string[], message: string) => {
  const value: {dir: string} = await inquirer.prompt([{
    type: 'autocomplete',
    name: 'dir',
    message,
    source: (answersSoFar: string, input: string) => {
      if (!input || input === '') {
        return values;
      }

      return values.filter((v) => v.indexOf(input) > -1);
    },
  }]);

  return value.dir;
};

const ROOTS = ['dev/ui', 'peepee', 'dev/backend', 'dev/util'];
export const getRootSelect = () => {
  primary('Please select a root directory');
  return getSelectValue(ROOTS.sort((a, b) => a.localeCompare(b)), 'Root directory');
};

export const getFolderSelect = (root: string) => {
  primary('Please select your project folder');
  return getSelectValue(readDir(getPath(root)), 'Project folder');
};
