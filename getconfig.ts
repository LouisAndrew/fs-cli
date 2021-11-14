import untildify from 'untildify';
import { readFileSync } from 'fs';
import { error } from './src/out';

type Config = {
 paths?: string[]
}

export const getConfig = (): Config | null => {
  /**
  * Absolute path of the config file
  */
  const filepath = untildify(process.env.FS_CLI_CONFIG || '~/.fs-cli.config.json');

  if (!filepath.endsWith('.json')) {
    error('Invalid configuration: Configuration path is not a JSON file');
    return null;
  }

  try {
    const data = readFileSync(filepath, 'utf8');
    const config: Config = JSON.parse(data);

    return config;
  } catch (e) {
    console.error(e);
    error('Invalid configuration: Something went wrong while accessing the config file');
    return null;
  }
};
