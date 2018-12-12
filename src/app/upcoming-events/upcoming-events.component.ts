import { Component, OnInit } from '@angular/core';
import { MeetupService } from '../meetup-service/meetup.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Event } from '../meetup-service/meetup-service.model';

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.css']
})

export class UpcomingEventsComponent implements OnInit {

  public events: Event[];
  public isCollapsed = false;
  public routerURL;
  constructor(private meetupService: MeetupService, private router: Router) { }

  ngOnInit() {
    this.events = this.meetupService.getUpcomingEvents();
    console.log(this.meetupService.getUpcomingEvents());
    this.routerURL = this.router.url;
  }
}
