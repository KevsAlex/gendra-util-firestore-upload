const admin = require('./node_modules/firebase-admin');

const serviceAccount = require("./serviceAccountKey.json");
const data = require("./csvjson.json");
const collectionKey = "zipcodes"; 


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const firestore = admin.firestore();
const settings = {timestampsInSnapshots: true};

firestore.settings(settings);

if (data && (typeof data === "object")) {

 Object.keys(data).forEach(index => {
    var uuid = require('uuid');
 
    firestore
    .collection(collectionKey)
    .add(data[index])
    .then((res) => {
    console.log("Document successfully written!");
    }).catch((error) => {
        console.error("Error writing document: ", error);
    });
    console.log("Document " + index + " successfully written!");
});
}