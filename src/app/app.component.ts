import { Component } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import axios from 'axios';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-forecast';
  constructor(private http: Http){

  }
  ngOnInit(){
    axios.get('http://api.openweathermap.org/data/2.5/forecast?q=London&appid=048c43a2f7e00f37c3b4044df2ec3128')
    .then(function (response) {
      console.log(response);
    })
  .catch(function (error) {
    console.log(error);
  });
  }
}
