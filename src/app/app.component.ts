import { Component } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import axios from 'axios';
import * as  moment from 'moment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  searchCity: string='London';
  result:any;
  todayDate:any= new Date();
  countryDetails:any;
  currentTab:string ='Today';
  tabInfo: Array<{id:string,value:string,active: boolean}>=[
    {id:'1',value:'Today',active: true},
    {id:'2',value:'Week',active: false},
    {id:'3',value:'Month',active: false}
  ]
  listing:Array<any>=[
    {id:'dt_txt','label':'Time'},{id:'humidity','label':'Humidity'},{id:'pressure','label':'Pressure'}
  ]
  weatherInfo:Array<{"id": number,"main":string,"description":string,"icon":string}>=[];
  
  constructor(private http: Http){

  }
  ngOnInit(){
      this.getListdetails();
      this.getCountryDetails();
      this.getWeatherDetails();

  }
  getCountryDetails(){
    axios.get('http://api.openweathermap.org/data/2.5/weather?q='+this.searchCity+'&units=metric&appid=048c43a2f7e00f37c3b4044df2ec3128')
      .then((response)=>{
        this.countryDetails = response.data;
      })
    .catch((error)=> {
      console.log(error);
    });
  }

  getListdetails(type:any='Today'){
    this.result = null;
    axios.get('http://api.openweathermap.org/data/2.5/forecast?q='+this.searchCity+'&appid=048c43a2f7e00f37c3b4044df2ec3128')
      .then((response)=>{
        this.result = response
        if(type=='Today'){
            this.result.data.list = response.data.list.filter((row:any)=>moment(row.dt_txt).format('DD/MM/YYYY')==moment(this.todayDate).format('DD/MM/YYYY'));
        }else if(type=='Week'){
          let result=[];
          for(let i=0;i<5;i++){
              var todayDate = new Date();
              todayDate.setDate(todayDate.getDate()+i);
              let index = response.data.list.findIndex((row:any)=>moment(row.dt_txt).format('DD/MM/YYYY')==moment(todayDate).format('DD/MM/YYYY'));
             if(index!=-1){
                result.push(response.data.list[index]);
             }
          }
          this.result.data.list = result;
        }else{
          let result=[];
          for(let i=0;i<12;i++){
             var todayDate = new Date();
             todayDate.setMonth(todayDate.getMonth()+i);
             let index = response.data.list.findIndex((row:any)=>moment(row.dt_txt).format('DD/MM/YYYY')==moment(todayDate).format('DD/MM/YYYY'));
             if(index!=-1){
                result.push(response.data.list[index]);
             }
          }
          this.result.data.list = result;
        }
      })
    .catch((error)=> {
      console.log(error);
    });
  }

  getWeatherDetails(){
    axios.get('http://api.openweathermap.org/data/2.5/forecast/daily?q='+this.searchCity+'&units=metric&cnt=4&appid=048c43a2f7e00f37c3b4044df2ec3128')
      .then((response)=>{
        this.weatherInfo= response.data.list;
        console.log(this.weatherInfo);
      })
     
    .catch((error)=> {
      console.log(error);
    });
  }
  value(data:any){
    return   Math.trunc( data );
  }
  getDay(index){
    var date = new Date();
    date.setDate(date.getDate()+index)
    return date;
  }
  changeTab(row){
      this.tabInfo.forEach((info:any)=>{
        if(info.id!=row.id){
          info.active = false;
        }  
      })
      this.currentTab =row.value;
      this.getListdetails(row.value);
      return row.active = true;
  }
  doSearch(name:any){
      this.getListdetails();
      this.getCountryDetails();
      this.getWeatherDetails();
  }
}
