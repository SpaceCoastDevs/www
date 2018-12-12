import { Injectable } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Event } from './meetup-service.model';

@Injectable({
  providedIn: 'root'
})
export class MeetupService {

  private eventsCollection: AngularFirestoreCollection<Event>;
  public events: Event[];

  constructor(private db: AngularFirestore) {
    db.collection('meetup-events').ref.onSnapshot(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        this.events.push(<Event>doc);
      });
      console.log('Events: ' + this.events);
    });
  }

  getUpcomingEvents() {
    return this.events;
  }
}
