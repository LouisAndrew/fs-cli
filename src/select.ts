import inquirer from 'inquirer';
import { getPath } from './changedir';
import { clone } from './clone';
import { primary } from './out';
import { readDir } from './readdir';
import { input } from './in';
import { CLONE_SELECT_VALUE, GO_BACK } from './utils/const';

inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

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

export const getRootSelect = (paths: string[]) => {
  primary('Please select a root directory');
  return getSelectValue(paths.sort((a, b) => a.localeCompare(b)), 'Root directory');
};

export const getFolderSelect = async (root: string): Promise<string | null> => {
  primary('Please select your project folder');
  const path = getPath(root);
  const folder = await getSelectValue([...readDir(path), CLONE_SELECT_VALUE, GO_BACK], 'Project folder');
  switch (folder) {
    case CLONE_SELECT_VALUE:
      return clone(path, await input('Please enter the repository URL'));
    case GO_BACK:
      return null;
    default:
      return folder;
  }
};
