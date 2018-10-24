const functions = require('firebase-functions');
const admin = require('firebase-admin');
const request = require('request');

admin.initializeApp(functions.config().firebase);

API_URL = 'https://api.meetup.com';
API_KEY = '5c483b7f507144933403e5d4311e48';
GROUP_IDS_TO_EXCLUDE = '27306031,25219234,26307553,25328430';
GROUP_IDS_TO_INCLUDE = '5292112';
LAT = 28.07;
LON = -80.63;


exports.addUpcomingTechEvents = functions.https.onRequest((req, res) => {


    UPCOMING_EVENTS = `/find/upcoming_events?&sign=true&photo-host=secure&excluded_groups=${GROUP_IDS_TO_EXCLUDE}&topic_category=292&order=time&fields=featured_photo,group_category,group_key_photo&self_groups=include`;
    //&callback=JSONP_CALLBACK

    let request_url = `${API_URL}${UPCOMING_EVENTS}&lat=${LAT}&lon=${LON}&key=${API_KEY}`;
    let upcomingTechEvents = request(`${request_url}`, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        // const events = JSON.stringify(body['events']);
        const events = body['events'];
        if (typeof events === "object") {
            Object.keys(events).forEach(event => {
                console.log(events[event].id);
                admin.firestore()
                    .collection('meetup-events')
                    .doc(events[event].id)
                    .set(events[event])
                    .then((res) => {
                        return console.log("Document successfully written!");
                    })
                    .catch((error) => {
                        return console.error("Error writing document: ", error);
                    });
            })
        }
        else {
            return console.log("events not an object");
        }
    });
});