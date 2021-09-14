import fs from 'fs-extra';

// eslint-disable-next-line import/prefer-default-export
export const readDir = (path: string) => fs.readdirSync(path);
