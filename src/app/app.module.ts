import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientJsonpModule } from '@angular/common/http';
import { UpcomingEventsComponent } from './upcoming-events/upcoming-events.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CodeofConductComponent } from './code-of-conduct/code-of-conduct.component';
import { AppRoutingModule } from './app-routing.module';
import { SignUpCardsComponent } from './sign-up-cards/sign-up-cards.component';


@NgModule({
  declarations: [
    AppComponent,
    UpcomingEventsComponent,
    NavbarComponent,
    FooterComponent,
    CodeofConductComponent,
    SignUpCardsComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule,
    HttpClientJsonpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
