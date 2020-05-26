const admin = require("firebase-admin");

const addAdminRole = require("./src/AddAdminRole");
const testEndpoint = require("./src/TestEndoint");
const doMachineLearning = require("./src/UpdateRecommendationForUser");

if (process.env.NODE_ENV !== "production") {
    const serviceAccount = require("../admin-cred.json");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://shopdeliverymanagement.firebaseio.com",
    });
} else {
    admin.initializeApp();
}

exports.addAdminRole = addAdminRole;
exports.testEndpoint = testEndpoint;
exports.doMachineLearning = doMachineLearning;
