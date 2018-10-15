import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppComponent } from './app.component';
import * as axios from 'axios';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [{provide: Http, useValue: axios}],
  bootstrap: [AppComponent]
})
export class AppModule { }
