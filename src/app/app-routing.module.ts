import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodeofConductComponent } from './code-of-conduct/code-of-conduct.component';
import { UpcomingEventsComponent } from './upcoming-events/upcoming-events.component';
import { EventDetailPageComponent } from './upcoming-events/event-detail-page/event-detail-page.component';

const routes: Routes = [
  { path: '', component: UpcomingEventsComponent },
  { path: 'events', component: UpcomingEventsComponent },
  {
    path: 'events/:key',
    component: EventDetailPageComponent
  },
  { path: 'coc', component: CodeofConductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
