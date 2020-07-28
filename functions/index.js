const admin = require("firebase-admin");
const addAdminRole = require("./src/AddAdminRole");
const testEndpoint = require("./src/TestEndoint");

if (process.env.NODE_ENV !== "production") {
    const serviceAccount = require("../admin-cred.json");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://shopdeliverymanagement.firebaseio.com",
    });
} else {
    admin.initializeApp();
}
const { updateRecommendationsForUser } = require("./src/UpdateRecommendationForUser");
const { generatePlaceholder } = require("./src/PlaceHolderImageGen");
const { searchDB } = require("./src/SearchDB");

const db = admin.firestore();

exports.addAdminRole = addAdminRole;
exports.testEndpoint = testEndpoint;
exports.doMachineLearning = updateRecommendationsForUser(db);
exports.generatePlaceholder = generatePlaceholder(admin.storage());
exports.searchDB = searchDB(db);
