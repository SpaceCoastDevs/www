const functions = require('firebase-functions');
const admin = require('firebase-admin');
const request = require('request');

admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.testEvents = functions.https.onRequest((req, res) => {

    API_URL  =  'https://api.meetup.com';
    API_KEY =   '5c483b7f507144933403e5d4311e48';
    GROUP_IDS_TO_EXCLUDE = '27306031,25219234,26307553,25328430';
    GROUP_IDS_TO_INCLUDE = '5292112';
    UPCOMING_EVENTS = `/find/upcoming_events?&sign=true&photo-host=secure&excluded_groups=${GROUP_IDS_TO_EXCLUDE}&topic_category=292&order=time&fields=featured_photo,group_category,group_key_photo&self_groups=include`;
//&callback=JSONP_CALLBACK

    const request_url = `${API_URL}${UPCOMING_EVENTS}&lat=28.07&lon=-80.63&key=${API_KEY}`;
    const upcomingEvents = request(`${request_url}`, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        const events = JSON.stringify(body['events']);
        //console.log(events);
        //events.forEach(event => {
        for (event in events) {
            console.log(event);
            // if (typeof nestedContent === "object") {
            //     Object.keys(nestedContent).forEach(docTitle => {
            //         admin.firestore()
            //             .collection('meetup-events')
            //             .doc(nestedContent.id)
            //             .set(nestedContent)
            //             .then((res) => {
            //                 return console.log("Document successfully written!");
            //             })
            //             .catch((error) => {
            //                 return console.error("Error writing document: ", error);
            //             });
            // //     });
            // }
            // else {
            //     return console.log("Not an object");
            // }
        }
        return console.log("");
    });
});