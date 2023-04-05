import { join } from "path";
import { env } from "process";
import { AzureFunctionServer, SlashCreator } from "slash-create";

(async () => {
  const creator = new SlashCreator({
    applicationID: env.BOT_APP_ID,
    publicKey: env.BOT_APP_PUBLIC_KEY,
    token: env.BOT_APP_TOKEN,
  });

  await creator
    // The first argument is required, but the second argument is the "target" or the name of the export.
    // By default, the target is "interactions".
    .withServer(new AzureFunctionServer(module.exports))
    .registerCommandsIn(join(__dirname, "commands"))
    .syncCommandsIn(env.COMMANDS_GUILD_ID);
})();