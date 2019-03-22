import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Event } from "./meetup-service.model";

@Injectable({
  providedIn: "root"
})
export class MeetupService {
  constructor(private db: AngularFirestore) {}

  getUpcomingEvents(): Observable<Event[]> {
    const now = Date.now();
    const eventRef = this.getData();
    return eventRef.snapshotChanges().pipe(
      map(item => {
        const events: Event[] = [];
        item.map(a => {
          const data = a.payload.doc.data() as Event;
          if (data.time >= now) {
            events.push(data as Event);
          }
        });

        return events;
      })
    );
  }

  public getEvent(id: string): Observable<Event> {
    const event = this.db
      .collection("meetup-events")
      .doc<Event>(id)
      .valueChanges();
    return event;
  }

  private getData() {
    return this.db.collection<Event>("meetup-events", ref =>
      ref.orderBy("time", "asc")
    );
  }
}
