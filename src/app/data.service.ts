import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

//base url
  private REST_API_SERVER = "http://localhost:1010";
  private REST_API_SERVER_PROD = "http://tictactoe-demo.eba-tzxvukbp.us-east-2.elasticbeanstalk.com/";

  private promiseResult;

  constructor(private httpClient: HttpClient) { }

  // Http Options
   httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
   }


  playGame(boardObj):Observable<any> {
    console.log(boardObj);
     return this.httpClient.post(this.REST_API_SERVER_PROD + '/play/', boardObj);
 }


}
