import { Select } from "@cliffy/prompt";
import "@std/dotenv/load";
import { logger } from "npm:comodern";
import color from "npm:picocolors";

const version = "0.1.0";

async function main() {
  logger.info(color.bgCyanBright(color.black(` UtilSky v${version} `)));
  /**
   * 1: Spam
   *
   * 2: Clean up acc
   *
   * 3: Acc info
   *
   * 4: Achivements unlocker
   */
  const mode = await Select.prompt({
    message: "What do you want to do?",
    options: [
      {
        name: "Send spam",
        value: 1,
      },
      {
        name: "Clean up my account",
        value: 2,
      },
      {
        name: "Account Info",
        value: 3,
      },
      {
        name: "Unlock All Achivements",
        value: 4,
      },
    ],
  });
  if (mode === 1) {
    //spam
  }
  if (mode === 2) {
    //cleanup acc
  }
  if (mode === 3) {
    //accinfo
  }
  if (mode === 4) {
    //achivements
  }
}

main();
