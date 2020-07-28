const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const {
    SEARCH_TYPE_SHOP,
    SEARCH_TYPE_PRODUCT,
    ITEMS_COLLECTION,
    SHOPS_COLLECTION,
} = require("./constants/constants");
const { getElementByID, firebaseStringQuery } = require("./utils/FirebaseQuery");

module.exports.searchDB = (db) => {
    return functions.https.onRequest((req, res) => {
        return cors(req, res, async () => {
            let { query, type, id } = req.query;
            if (
                (type !== SEARCH_TYPE_SHOP && type !== SEARCH_TYPE_PRODUCT) ||
                query === null ||
                query.length === 0
            ) {
                res.status(400).json([]);
                return;
            }

            const collection = type === SEARCH_TYPE_PRODUCT ? ITEMS_COLLECTION : SHOPS_COLLECTION;

            if (id !== null) {
                const data = await Promise.all([
                    getElementByID(id, collection, db),
                    firebaseStringQuery(query.substr(0, 3), collection, db),
                ]);

                const idData = data[0];
                if (idData === null) {
                    res.json(data[1]);
                } else {
                    const queryData = data[1].filter((el) => el.id !== idData.id);
                    res.json([idData].concat(queryData));
                }
            } else {
                const data = await firebaseStringQuery(query, collection, db);
                res.json(data);
            }
        });
    });
};
