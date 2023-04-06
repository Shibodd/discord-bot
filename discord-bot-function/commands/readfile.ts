import {
    SlashCommand,
    CommandOptionType,
    CommandContext,
    SlashCreator,
  } from "slash-create";

import { readFileSync } from "fs";
import { env } from "process";
import { join } from "path";

export class ReadfileCommand extends SlashCommand {
  constructor(creator: SlashCreator) {
    let cDesc = {
      name: "readfile",
      description: "Reads the content of a file.",
      options: [
        {
          type: CommandOptionType.STRING,
          name: "filename",
          description: "The path to the file that you want to read",
        },
      ],
    };
    
    if (env.COMMANDS_GUILD_ID)
      cDesc = Object.assign(cDesc, { guildIDs: [env.COMMANDS_GUILD_ID] });

    super(creator, cDesc);

    // Not required initially, but required for reloading with a fresh file.
    this.filePath = __filename;
  }

  async run(ctx: CommandContext): Promise<string> {
    let path = join(env.HOME, "bot_data", ctx.options.filename);
    // return path;
    try {
      return readFileSync(path, 'utf8');
    } catch (e) {
      return (e as Error).message;
    }
  }
}