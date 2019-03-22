import { Component, OnInit, OnDestroy } from '@angular/core';
import { Event } from 'src/app/meetup-service/meetup-service.model';
import { MeetupService } from 'src/app/meetup-service/meetup.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-event-detail-page',
  templateUrl: './event-detail-page.component.html',
  styleUrls: ['./event-detail-page.component.css']
})
export class EventDetailPageComponent implements OnInit, OnDestroy {
  event: Event;
  eventId: string;
  routeKeySub: Subscription;
  eventSub: Subscription;

  constructor(
    private meetupService: MeetupService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getRouteKey();
    this.eventSub = this.meetupService
      .getEvent(this.eventId)
      .subscribe(event => {
        this.event = event;
      });
  }

  async getRouteKey(): Promise<void> {
    this.routeKeySub = await this.route.params.subscribe(params => {
      this.eventId = params.key;
    });
  }

  ngOnDestroy() {
    if (this.routeKeySub) {
      this.routeKeySub.unsubscribe();
    }
    if (this.eventSub) {
      this.eventSub.unsubscribe();
    }
  }
}
