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


exports.addUpcomingMeetupTechEvents = functions.https.onRequest((req, res) => {
    UPCOMING_EVENTS = `/find/upcoming_events?&sign=true&photo-host=secure&excluded_groups=${GROUP_IDS_TO_EXCLUDE}&topic_category=292&order=time&fields=featured_photo,group_category,group_key_photo&self_groups=include`;

    let request_url = `${API_URL}${UPCOMING_EVENTS}&lat=${LAT}&lon=${LON}&key=${API_KEY}`;
    let upcomingMeetupTechEvents = request(`${request_url}`, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
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
        return console.log("addUpcomingMeetupTechEvents Done");
    });
});

exports.addUpcomingGroundswellMeetupEvents = functions.https.onRequest((req, res) => {
    UPCOMING_GROUNDSWELL_EVENTS = `/2/events?offset=0&format=json&limited_events=False&group_urlname=StartupSpaceCoast&photo-host=secure&page=500&fields=&order=time&desc=false&status=upcoming`;

    let request_url = `${API_URL}${UPCOMING_GROUNDSWELL_EVENTS}&key=${API_KEY}`;
    let upcomingGroundswellMeetupEvents = request(`${request_url}`, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        const events = body.results;
        if (typeof events === "object") {
            Object.keys(events).forEach(event => {
                console.log(events[event].id);
                admin.firestore()
                    .collection('groundswelll-meetup-events')
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
        return console.log("addUpcomingGroundswellMeetupEvents Done");
    });
});