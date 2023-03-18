import inquirer from 'inquirer';
// @ts-ignore
import AutocompletePrompt from 'inquirer-autocomplete-prompt';

import { getPath } from './changedir.js';
import { clone } from './clone.js';
import { primary } from './out.js';
import { readDir } from './readdir.js';
import { input } from './in.js';
import { CD_HERE, CLONE_SELECT_VALUE, ROOTS } from './utils/const.js';

inquirer.registerPrompt('autocomplete', AutocompletePrompt);

export const getSelectValue = async (values: string[], message: string) => {
  const value: {dir: string} = await inquirer.prompt([{
    type: 'autocomplete',
    name: 'dir',
    message,
    source: (answersSoFar: string, inputString: string) => {
      if (!inputString || inputString === '') {
        return values;
      }

      return values.filter(
        (v) => v.toUpperCase().indexOf(inputString.toUpperCase()) > -1,
      );
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
  const folder = await getSelectValue([...readDir(path), CLONE_SELECT_VALUE, CD_HERE], 'Project folder');

  switch (folder) {
    case CLONE_SELECT_VALUE:
      return clone(path, await input('Please enter the repository URL'));
    case CD_HERE:
      return null;
    default:
      return folder;
  }
};
