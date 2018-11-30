import { Injectable } from '@angular/core';
import { AppService, ResponseType } from './app.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';

@Injectable()
export class DbconnectorService {

  constructor(public appService: AppService) { }

  public test(): Observable<any> {
    const domain = window.location;
    console.log('domain=', domain);
    // return this.appService.reqUrl("http://localhost/busadsBackend/service.php", ResponseType.json).pipe(

    //  const urlService = 'http://busads.epizy.com/assets/back-end/service.php';
    const urlService = '/busads/assets/back-end/service.php';

    /*
    return this.appService.requestPHP(urlService).pipe(
      map(response => {
        console.log('response=', response);
        if (response.success) {

        }

        return response;
      })
    );
    */


    return this.appService.reqUrl(urlService).pipe(
      map(response => {
        console.log('response=', response);
        if (response.success) {

        }

        return response;
      })
    );

  }
}
