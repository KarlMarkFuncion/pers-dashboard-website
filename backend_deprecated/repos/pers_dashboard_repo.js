const {MongoClient} = require('mongodb');

function pers_dashboard_repo(){

    const url = "mongodb://localhost:27017";
    const dbName = "pers_dashboard";

    function loadData(data){
        return new Promise( async (resolve, reject) => {

            const client = new MongoClient(url);
            try {
                await client.connect();
                const db = client.db(dbName);
                
                results = await db.collection("heartrate").insertMany(data);
                resolve(results);
            } catch (error) {
                reject(error)
            }
        })
    }

    function loadDataVariable(data, collectionName){
        return new Promise( async (resolve, reject) => {

            const client = new MongoClient(url);
            try {
                await client.connect();
                const db = client.db(dbName);
                
                results = await db.collection(`${collectionName}`).insertMany(data);
                resolve(results);
            } catch (error) {
                reject(error)
            }
        })
    }

    return {loadData, loadDataVariable}
}

module.exports = pers_dashboard_repo();