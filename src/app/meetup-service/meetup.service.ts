import { Injectable } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Event } from './meetup-service.model';

@Injectable({
  providedIn: 'root'
})
export class MeetupService {

  private eventsCollection: AngularFirestoreCollection<Event>;
  public events: Observable<Event[]>;

  constructor(private db: AngularFirestore) {
    db.collection('meetup-events').ref.onSnapshot(function (querySnapshot) {
      const events = [];
      querySnapshot.forEach(function (doc) {
        events.push(<Event>doc.data());
      });
      this.events = events;
      // console.log('Events: ' + events);
    });
  }

  getUpcomingEvents() {
    return this.events;
  }
}
