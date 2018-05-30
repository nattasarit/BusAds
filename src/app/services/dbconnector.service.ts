import { Injectable } from '@angular/core';
import * as mysql from "mysql";
import { AppService, ResponseType } from './app.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';

@Injectable()
export class DbconnectorService {

  constructor(public appService: AppService) { }

  public test(): Observable<any> {
    let domain = window.location.host;
    console.log("domain=",domain);
    //return this.appService.reqUrl("http://localhost/busadsBackend/service.php", ResponseType.json).pipe(
    return this.appService.reqUrl("http://localhost:8080/busads/service.php", ResponseType.json).pipe(
      map(response => {
        console.log("response=",response);
        if (response.success) {
          
        }

        return response;
      })
    );
  }
}
