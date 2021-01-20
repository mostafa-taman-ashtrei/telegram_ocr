import { Scenes } from 'telegraf';

import doOcr from '../utils/ocr';
import { deletFile, downloadfile } from '../utils/fileManager';

const imageScene = new Scenes.BaseScene<Scenes.SceneContext>('imageScene');

imageScene.enter((ctx) => ctx.reply('Send me the image'));

imageScene.on('photo', async (ctx) => {
    ctx.reply('I have received the image please wait while i extract the text');
    const photos = ctx.update.message.photo;
    const { file_id: fileId } = photos[photos.length - 1];
    const { file_unique_id: fileUniqueId } = photos[photos.length - 1];
    const fileUrl = await ctx.telegram.getFileLink(fileId);
    const imagePath = await downloadfile(fileUrl, fileUniqueId, 'images');
    const text = await doOcr(imagePath, 'eng');

    ctx.replyWithHTML(`Done Send another image or type /out command to exit Here is the recognized text :
    ${text}`);

    deletFile(imagePath);
});

imageScene.command('/out', (ctx) => {
    ctx.telegram.sendMessage(ctx.chat!.id, 'Bye, type /start to get start again');
    ctx.scene.leave();
});

export default imageScene;
