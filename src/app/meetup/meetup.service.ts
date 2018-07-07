import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientJsonpModule } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MeetupService {

  constructor(private httpClient: HttpClient) { }

  API_URL  =  'https://api.meetup.com';
  API_KEY =   '5c483b7f507144933403e5d4311e48';
  UPCOMING_EVENTS = '/find/upcoming_events?&sign=true&photo-host=secure&topic_category=34&fields=featured_photo&callback=JSONP_CALLBACK';

  getUpcomingEvents( lat: number , lon: number , radius: number ) {
    const request_url = this.API_URL + this.UPCOMING_EVENTS + '&lat=' + lat + '&lon=' + lon + '&key=' +  this.API_KEY;
    console.log(request_url);
    return this.httpClient.jsonp (request_url, 'callback');
  }

}
