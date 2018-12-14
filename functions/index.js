const functions = require('firebase-functions');
const admin = require('firebase-admin');
const request = require('request');

admin.initializeApp(functions.config().firebase);

API_URL = 'https://api.meetup.com';
API_KEY = '5c483b7f507144933403e5d4311e48';
CATEGORY_IDS_TO_INCLUDE = '34';
ZIP_CODES_TO_INCLUDE = '32901,32922,32780';
SEARCH_RADIUS = 20;
GROUP_IDS_TO_EXCLUDE = [27306031, 25219234, 26307553, 25328430]; //Unrelated or outside of Brevard County
GROUP_IDS_TO_INCLUDE = [5292112]; //Groundswell to start
LAT = 28.07;
LON = -80.63;
FIND_GROUP_IDS_URL = `${API_URL}/find/groups?photo-host=secure&zip=${ZIP_CODES_TO_INCLUDE}&page=100&radius=${SEARCH_RADIUS}&category=${CATEGORY_IDS_TO_INCLUDE}&key=${API_KEY}`;


exports.addUpcomingMeetupTechEvents = functions.https.onRequest((req, res) => {
  let getGroupIDs = request(FIND_GROUP_IDS_URL, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    GROUP_IDS_TO_INCLUDE = GROUP_IDS_TO_INCLUDE.concat(body.map(group => group.id));
    GROUP_IDS_TO_INCLUDE = GROUP_IDS_TO_INCLUDE.filter(id => {
      return !GROUP_IDS_TO_EXCLUDE.includes(id);
    });
    return console.log(GROUP_IDS_TO_INCLUDE);
  });

  UPCOMING_EVENTS_URL = `${API_URL}/2/events?fields=group_photo,series&offset=0&format=json&limited_events=False&group_id=${GROUP_IDS_TO_INCLUDE}&photo-host=secure&page=500&order=time&desc=false&status=upcoming&key=${API_KEY}`;

  let upcomingMeetupTechEvents = request(`${UPCOMING_EVENTS_URL}`, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    const events = body.results;
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
    return console.log('upcomingMeetupTechEvents Done');

  });
  return console.log("addUpcomingGroundswellMeetupEvents Done");
});

exports.changeMeetupTechEventsToPast = functions.https.onRequest((req, res) => {

  const now = Date.now();
  const oldEvents = [];

  admin.firestore()
    .collection('meetup-events')
    .where("time", "<=", now)
    .get()   
    .then(querySnapshot => {
      querySnapshot.forEach(event => {
        oldEvents.push(event.id)
      })
      return console.log("created oldEvents");
    })
    .catch((error) => {
      return console.error("Probelm creating oldEvents", error);
    });

    oldEvents.forEach(event => {
      admin.firestore()
      .collection('meetup-events')
      .doc(event)
      .update(
        { status: "past" }
      )
      console.log("Chnaged stats of " + event) 
    })
});