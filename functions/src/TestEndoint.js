const functions = require("firebase-functions");

const testEndpoint = functions.https.onRequest((req, res) => {
    console.log("Called test endpoint")
    res.send("<h1>hello world111</h1>");
});

module.exports = testEndpoint;