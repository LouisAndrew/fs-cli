import inquirer from 'inquirer';

export const input = async (message: string) => {
  const value: { data: string } = await inquirer.prompt([
    {
      type: 'input',
      name: 'data',
      message,
    },
  ]);

  return value.data;
};
