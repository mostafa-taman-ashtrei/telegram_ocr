import { config } from 'dotenv';
import { Telegraf, Context } from 'telegraf';

config();

const bot = new Telegraf<Context>(process.env.TELEGRAM_BOT_TOKEN!);

bot.start((ctx: Context) => {
    const message = `Welcome ${ctx.from!.first_name} to NeoBot`;

    ctx.reply(message);
});

bot.launch();
console.log('Bot is ready (:');
