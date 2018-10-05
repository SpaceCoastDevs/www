import { Component, OnInit } from '@angular/core';
import { MeetupService } from '../meetup/meetup.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.css']
})
export class UpcomingEventsComponent implements OnInit {

  public events: Array<object> = [];
  public isCollapsed = false;
  private city: Array<object> = [];
  public routerURL;
  constructor(private meetupService: MeetupService, private router: Router) { }

  ngOnInit() {
    this.getUpcomingEvents ( 28.07, -80.63, 15 );
    this.routerURL = this.router.url;
  }
  public getUpcomingEvents(lat: number, lon: number, radius: number) {
    this.meetupService.getUpcomingEvents(lat, lon, radius).subscribe((data: Array<object>) => {
      this.city = data['data']['city'];
      this.events = data['data']['events'].filter(function(obj) {
        return obj.group.localized_location !== 'Orlando, FL';
      });
    });
  }
}
