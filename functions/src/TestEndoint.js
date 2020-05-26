const functions = require("firebase-functions");
cors = require("cors")({ origin: true });

const testEndpoint = functions.https.onRequest((req, res) => {
    return cors(req, res, async () => {
        console.log("Called test endpoint");
        res.send("----" + req.body.id);
    });
});

module.exports = testEndpoint;
