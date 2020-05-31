const jimp = require("jimp");

const generatePlaceholder = async (inputPath, outputPath) => {
    try {
        const jimpImg = await jimp.read(inputPath);
        await jimpImg.quality(30).blur(80).scale(0.2).write(outputPath);
    } catch (e) {
        console.log(e);
    }
};

module.exports.generatePlaceholder = generatePlaceholder;
