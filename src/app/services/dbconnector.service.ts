import { Injectable } from '@angular/core';
import { AppService, ResponseType } from './app.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';

import { Http, Headers, RequestOptions, Response, Jsonp , URLSearchParams } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DbconnectorService {

  constructor(public appService: AppService,
              private http: Http,
              private jsonp: Jsonp,
              private httpClient: HttpClient) { }

  public test(): Observable<any> {
    const domain = window.location;
    console.log('domain=', domain);
    // return this.appService.reqUrl("http://localhost/busadsBackend/service.php", ResponseType.json).pipe(

    // const urlService = 'http://busads.epizy.com/assets/back-end/service.php';
    let urlService = domain.href + 'assets/back-end/service.php';
    // fix path PHP
    //urlService = 'http://busads.epizy.com/assets/back-end/service.php?callback=BANKTEST';



    return this.appService.requestPHP(urlService).pipe(
      map(response => {
        // response.map(response2 => <string[]> response2.json()[1]);
        console.log('response=', response);
        return response;
      })
    );
  }

}

