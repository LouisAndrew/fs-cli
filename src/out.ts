import chalk from 'chalk';
import figlet from 'figlet';

export const title = () => console.log(
  chalk.white(
    figlet.textSync('fs-cli', { horizontalLayout: 'full' }),
  ),
);

export const primary = (text: string) => console.log(
  chalk.bold.white(
    text,
  ),
);

export const error = (text: string) => console.log(chalk.red(text));
