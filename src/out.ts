import chalk from 'chalk';
import figlet from 'figlet';

export const title = () => console.log(
  chalk.black(
    figlet.textSync('fs-cli', { horizontalLayout: 'full' }),
  ),
);

export const primary = (text: string) => console.log(
  chalk.bold.black(
    text,
  ),
);
