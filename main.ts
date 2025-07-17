import { tty } from "@cliffy/ansi/tty";
import { Select } from "@cliffy/prompt";
import "@std/dotenv/load";
import { logger } from "npm:comodern";
import color from "npm:picocolors";

const version = "0.1.0";

function envLoader() {
  //token
  const tr = Deno.env.get("TOKEN");
  if (!tr) {
    logger.error("[envLoader] cannot find token from .env");
    Deno.exit(1);
  }
  const token = tr?.includes(",") ? tr.split(",") : [tr];

  //hostname
  const hostname = Deno.env.get("HOSTNAME");
  if (!hostname) {
    logger.error("[envLoader] cannot find token from .env");
    Deno.exit(1);
  }

  logger.log("[envLoader] Loaded all env");
  return { token, hostname };
}

async function main() {
  logger.info(color.bgCyanBright(color.black(` UtilSky v${version} `)));
  logger.info(color.gray("Initializing..."));
  const env = envLoader();
  logger.success(`Loaded (${env.token.length} tokens, host: ${env.hostname})`);

  /**
   * 1: Spam
   *
   * 2: Clean up acc
   *
   * 3: Acc checker
   *
   * 4: Achivements unlocker
   */
  const mode = await Select.prompt({
    cbreak: true,
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
        name: "Account Checker",
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
    //acccheck
  }
  if (mode === 4) {
    //achivements
  }
}

main();

Deno.addSignalListener("SIGINT", () => {
  tty.cursorLeft.eraseDown.cursorShow();
  logger.info("Interrupted, exiting...");
  Deno.exit(1);
});
