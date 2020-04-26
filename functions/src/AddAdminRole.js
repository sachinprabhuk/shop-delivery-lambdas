const functions = require("firebase-functions");
const admin = require("firebase-admin");

const addAdminRole = functions.https.onCall(async (data, context) => {
    const response = {
        success: false,
    };
    try {
        const user = await admin.auth().getUserByEmail(data.email);
        await admin.auth().setCustomUserClaims(user.uid, {
            admin: true,
        });
        response.success = true;
    } catch (e) {
        console.log(e);
    }
    return success;
});

module.exports = addAdminRole;
