const functions = require("firebase-functions");
cors = require("cors")({ origin: true });

const testEndpoint = functions.https.onRequest((req, res) => {
    return cors(req, res, async () => {
        console.log("Called test endpoint");
        res.send("<h1>hello world111</h1>");
    });
});

module.exports = testEndpoint;
