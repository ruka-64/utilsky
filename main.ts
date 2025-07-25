import { tty } from "@cliffy/ansi/tty";
import { Select } from "@cliffy/prompt";
import "@std/dotenv/load";
import { logger } from "npm:comodern";
import color from "npm:picocolors";
import { fetchAPI } from "./utils/fetchapi.ts";
import { tokenmanager } from "./utils/tokenman.ts";

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
  fetchAPI.init(env.hostname);
  const alive = await tokenmanager.Init(env.token);
  //prettier-ignore
  logger.info(`Loaded (${env.token.length} tokens (${env.token.length - (alive !== -1 ? alive : 0)} tokens was dead)`);
  logger.info(`Target host: ${env.hostname})`);

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
        name: "Unlock All Achivements",
        value: 3,
      },
    ],
  });

  if (mode === 1) {
    //
  }
  if (mode === 2) {
    //cleanup acc
  }
  if (mode === 3) {
    //achivements
  }
}

main();

Deno.addSignalListener("SIGINT", () => {
  tty.cursorLeft.eraseDown.cursorShow();
  logger.info("Interrupted, exiting...");
  Deno.exit(1);
});
