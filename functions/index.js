const admin = require("firebase-admin");
admin.initializeApp();

const addAdminRole = require("./src/AddAdminRole");

exports = {
    addAdminRole,
};
