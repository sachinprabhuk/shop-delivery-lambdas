module.exports.firebaseStringQuery = async (query, collection, db) => {
    try {
        const endQuery =
            query.slice(0, query.length - 1) +
            String.fromCharCode(query[query.length - 1].charCodeAt(0) + 1);
        const data = await db
            .collection(collection)
            .where("name", ">=", query)
            .where("name", "<", endQuery)
            .get();
        let res = [];
        if (data && data.docs.length >= 0) {
            res = data.docs.map((el) => {
                const data = el.data();
                data.id = el.id;
                return data;
            });
        }
        return res;
    } catch (e) {
        console.error("error in firebaseStringQuery", e);
        return [];
    }
};

module.exports.getElementByID = async (id, collection, db) => {
    try {
        const rawData = await db.collection(collection).doc(id).get();
        const data = rawData.data();
        data.id = rawData.id;
        return data;
    } catch (e) {
        console.error("error in getElementByID", e);
        return null;
    }
};
