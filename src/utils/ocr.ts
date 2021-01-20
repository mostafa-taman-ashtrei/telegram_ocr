import { createWorker } from 'tesseract.js';

const doOcr = async (image: string, lang: string): Promise<string> => {
    const worker = await createWorker({ logger: (m) => console.log(m) });
    await worker.load();
    await worker.loadLanguage(lang);
    await worker.initialize(lang);

    try {
        const res = await worker.recognize(image);
        return res.data.text;
    } catch (e) {
        console.log(e);
        throw new Error('Ocr failed ):');
    }
};

export default doOcr;
