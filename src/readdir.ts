import fs from 'fs-extra';

export const readDir = (path: string) => fs.readdirSync(path);
