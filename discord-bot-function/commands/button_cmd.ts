import { SlashCommand, ComponentType, ButtonStyle, SlashCreator, CommandContext } from "slash-create";
import { env } from "process";

const delay = (time: number) => new Promise(res => setTimeout(res, time));

export class ButtonCommand extends SlashCommand {
  constructor(creator: SlashCreator) {
    let cDesc = {
      name: "showmeyourbutton",
      description: "Shows you my button."
    };
    
    if (env.COMMANDS_GUILD_ID)
      cDesc = Object.assign(cDesc, { guildIDs: [env.COMMANDS_GUILD_ID] });

    super(creator, cDesc);

    this.filePath = __filename;
  }

  async run(ctx: CommandContext): Promise<void> {
    ctx.defer(false);

    await ctx.send('Sos', {
      components: [{
        type: ComponentType.ACTION_ROW,
        components: [{
          type: ComponentType.STRING_SELECT,
          custom_id: 'el_listo',
          min_values: 1,
          max_values: 1,
          placeholder: 'Scegli chi scopare',
          options: [{
            label: 'Tua mamma',
            value: 'Tua mamma',
          }, {
            label: 'Benna',
            value: 'Benna',
          }, {
            label: 'Filippo',
            value: 'Filippo',
          }]
        }]
      }]
    });

    /**
     * This function handles component contexts within a command, so you
     * can use the previous context aswell.
     */
    ctx.registerComponent('el_listo', async (ctx) => {
      let nome = ctx.values[0];

      await ctx.editOriginal({
        content: "Sei sicuro di voler scopare " + nome + "?",

        components: [{
          type: ComponentType.ACTION_ROW,
          components: [{
            type: ComponentType.BUTTON,
            label: 'nyes',
            custom_id: 'btnyes',
            style: ButtonStyle.PRIMARY
          },
          {
            type: ComponentType.BUTTON,
            label: 'no lol',
            custom_id: 'btnno',
            style: ButtonStyle.PRIMARY
          }]
        }]
      });

      ctx.registerComponent('btnyes', async (ctx) => {
        ctx.editOriginal({
          content: 'Scopaggio di ' + nome + ' in... 3', 
          components: [] 
        });
        await(delay(1000));
        ctx.editOriginal('Scopaggio di ' + nome + ' in... 2');
        await(delay(1000));
        ctx.editOriginal('Scopaggio di ' + nome + ' in... 1');
        await(delay(1000));
        ctx.editOriginal(nome + ' dice oh oh oh');
      });

      ctx.registerComponent('btnno', async (ctx) => {
        ctx.editOriginal({
          content: 'E allora fottiti', 
          components: [] 
        });
      });
    });
  }
}