const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

const addAdminRole = functions.https.onRequest(async (req, res) => {
    return cors(req, res, async () => {
        const { email } = JSON.parse(req.body);
        console.log("Req with email: " + email)
        try {
            const user = await admin.auth().getUserByEmail(email);
            console.log(user);
            await admin.auth().setCustomUserClaims(user.uid, {
                admin: true,
            });

            console.log(`admin permission given to ${email}`);
            res.status(200).send({ success: true });
        } catch (e) {
            console.log("error ##" + e.message);
            res.status(400).send({ success: false });
        }
    });
});

module.exports = addAdminRole;
