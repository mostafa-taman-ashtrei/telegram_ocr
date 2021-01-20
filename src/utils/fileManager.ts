import fs from 'fs';
import axios from 'axios';

const makeDir = (dir: string) => {
    if (!fs.existsSync('./src/tmp')) fs.mkdir('./src/tmp', () => console.log('tmp file created'));
    const dirpath = `./src/tmp/${dir}`;

    if (fs.existsSync(dirpath)) console.log('Dir Exists...');
    else {
        fs.mkdir(dirpath, (err) => {
            if (err) console.log(err);
            console.log(`${dirpath} created...`);
        });
    }
};

const downloadfile = async (
    fileUrl: string,
    fileUniqueId: string,
    dir: string,
): Promise<string> => {
    makeDir(dir);

    const splitFileUrl = fileUrl.split('.');
    const fileFormat = splitFileUrl[splitFileUrl.length - 1];
    const fileName = `${fileUniqueId}.${fileFormat}`;
    const filePath = `./src/tmp/${dir}/${fileName}`;
    const writer = fs.createWriteStream(filePath);

    const data = await axios.get(fileUrl, { responseType: 'stream' });
    const imagePath = await data.data.pipe(writer);
    writer.on('error', () => writer.close());
    writer.on('finish', () => writer.close());
    return imagePath.path;
};

const deletFile = (filePath: string) => {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.log(err);
            throw new Error('File Deleteion Failed!');
        }
        console.log('File deleted ...');
    });
};

export { downloadfile, deletFile };
