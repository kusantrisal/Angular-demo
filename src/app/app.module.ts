import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from  '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { SampleserviceService } from './services/sampleservice.service';
import { HttpService } from './services/http/http.service';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';
import { NavComponent } from './nav/nav.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    PageNotFoundComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  //HttpClientModule aill add httpservice to provider don't have to be explixit
  providers: [SampleserviceService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
