const functions = require("firebase-functions");
const { generatePlaceholder } = require("./utils/PreviewGenerator");
const { join } = require("path");
const { tmpdir } = require("os");
const fs = require("fs");

module.exports.generatePlaceholder = (storage) =>
    functions
        .runWith({
            timeoutSeconds: 120,
            memory: "2GB",
        })
        .storage.object()
        .onFinalize(async (e) => {
            const bucket = storage.bucket(e.bucket);
            const filePath = e.name;
            const fileName = e.name.split("/").pop();

            if (fileName.startsWith("placeholder$$$")) {
                console.log("image is a placeholder. Exiting...");
                return;
            }
            if (!e.contentType.includes("image")) {
                console.log("file is not an image");
                return;
            }

            const processedFileName = `placeholder$$$${fileName}`;

            // download image
            const downloadPath = join(tmpdir(), fileName);
            await bucket.file(filePath).download({ destination: downloadPath });
            console.log("download done");

            // process image
            const processedFilePath = join(tmpdir(), processedFileName);
            await generatePlaceholder(downloadPath, processedFilePath);
            console.log("processing done");

            // upload processed file
            const pathArr = filePath.split("/");
            pathArr.pop();
            pathArr.push(processedFileName);
            const bucketPath = pathArr.join("/");
            await bucket.upload(processedFilePath, {
                destination: bucketPath,
            });
            console.log("uploading done");

            // clearing out
            fs.unlinkSync(downloadPath);
            fs.unlinkSync(processedFilePath);
            console.log("clearing done");
        });
