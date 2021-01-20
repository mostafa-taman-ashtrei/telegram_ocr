import { config } from 'dotenv';
import {
    Telegraf, Markup, Scenes, session,
} from 'telegraf';

import { MyContext } from './interfaces/MyContext';
import imageScene from './scenes/imageScene';

config();

const bot = new Telegraf<MyContext>(process.env.TELEGRAM_BOT_TOKEN!);
const stage = new Scenes.Stage<MyContext>([imageScene]);

bot.use(session());
bot.use(stage.middleware());

bot.start((ctx: MyContext) => {
    const message = `Welcome ${ctx.from!.first_name} to NeoBot`;

    const options = Markup.inlineKeyboard([
        Markup.button.callback('Extract text from images', 'imageOcr'),
    ]);

    ctx.reply(message, options);
});

bot.action('imageOcr', (ctx) => ctx.scene.enter('imageScene'));

bot.launch();
console.log('Bot is ready (:');
