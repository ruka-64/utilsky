import { logger } from 'npm:comodern';
import { Select } from '@cliffy/prompt';
import color from 'npm:picocolors';

const version = '0.1.0';

async function main() {
  logger.info(color.bgCyanBright(color.black(` UtilSky v${version} `)));
  const mode = await Select.prompt({
    message: 'What do you want to do?',
    options: [
      {
        name: 'Send spam',
        value: 1,
      },
      {
        name: 'Clean up my account',
        value: 2,
      },
      {
        name: 'Account Info',
        value: 3,
      },
    ],
  });
}

main();
