const { RouteTypes } = require("@scullyio/scully");

exports.config = {
  projectRoot: "./src/app",
  routes: {
    "/events/:eventId": {
      type: RouteTypes.json,
      userId: {
        url:
          "https://api.meetup.com/2/events?fields=group_photo,series&offset=0&format=json&limited_events=False&group_id=8209012,5292112,27505347,30015014,26468962,8099832,3381942,31892636,17108342,1570697,20150455,28714554,18448785,30790098,31284731,32240720,30816774,1728277,33095463,33227599&photo-host=secure&page=500&order=time&desc=false&status=upcoming,past",
        property: "results['id']"
      }
    }
  },
  projectName: "community",
  outDir: "./dist/static"
};

//https://api.meetup.com/2/events?&sign=true&photo-host=public&event_id=nqtnqqybcfbnb
