import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientJsonpModule } from '@angular/common/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class MeetupService {

  constructor(private httpClient: HttpClient) { }

  API_URL  =  'https://api.meetup.com';
  API_KEY =   '5c483b7f507144933403e5d4311e48';
  GROUP_IDS_TO_EXCLUDE = '27306031,25219234,26307553,25328430';
  GROUP_IDS_TO_INCLUDE = '5292112';


  UPCOMING_EVENTS = '/find/upcoming_events?&sign=true&photo-host=secure&excluded_groups=' +
    this.GROUP_IDS_TO_EXCLUDE + '&topic_category=292&order=time' +
    '&fields=featured_photo,group_category&self_groups=include&callback=JSONP_CALLBACK';

  getUpcomingEvents( lat: number , lon: number , radius: number ) {



    const request_url = this.API_URL + this.UPCOMING_EVENTS + '&lat=' + lat + '&lon=' + lon + '&key=' +  this.API_KEY;
    return this.httpClient.jsonp (request_url, 'callback');
  }

}
